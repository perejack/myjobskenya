export type SwiftpayPaymentStatus = "PENDING" | "SUCCESS" | "FAILED";

export async function initiateSwiftpayPayment(params: {
  phoneNumber: string;
  amount: number;
  description?: string;
  reference?: string;
  purpose?: string;
  userId?: string | null;
}): Promise<{ success: true; requestId: string } | { success: false; message: string }> {
  try {
    const res = await fetch("/api/initiate-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
      return { success: false, message: json?.message || "Payment initiation failed" };
    }

    const requestId =
      json.data?.checkoutRequestId || json.data?.requestId || json.data?.transactionRequestId || json.data?.reference;

    if (!requestId) return { success: false, message: "Payment service did not return a request id" };

    return { success: true, requestId };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : "Network error" };
  }
}

export function pollSwiftpayPaymentStatus(
  reference: string,
  opts?: { intervalMs?: number; timeoutMs?: number }
): {
  promise: Promise<SwiftpayPaymentStatus>;
  cancel: () => void;
} {
  const intervalMs = opts?.intervalMs ?? 3000;
  const timeoutMs = opts?.timeoutMs ?? 120000;

  let interval: ReturnType<typeof setInterval> | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
    if (interval) clearInterval(interval);
    if (timeout) clearTimeout(timeout);
  };

  const promise = new Promise<SwiftpayPaymentStatus>((resolve) => {
    interval = setInterval(async () => {
      if (cancelled) return;
      try {
        const res = await fetch(`/api/payment-status?reference=${encodeURIComponent(reference)}`);
        const json = await res.json().catch(() => null);

        const status = json?.payment?.status as SwiftpayPaymentStatus | undefined;
        if (!json?.success || !status) return;

        if (status === "SUCCESS" || status === "FAILED") {
          cancel();
          resolve(status);
        }
      } catch {
        // ignore polling errors
      }
    }, intervalMs);

    timeout = setTimeout(() => {
      cancel();
      resolve("FAILED");
    }, timeoutMs);
  });

  return { promise, cancel };
}

