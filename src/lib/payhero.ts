// PayHero Service for Kenya Career Connect
import { toast } from "sonner";

interface STKPushResponse {
  success: boolean;
  checkoutId?: string;
  message?: string;
  raw?: unknown;
}

interface PaymentStatusResponse {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  mpesaReceipt?: string;
}

export class PayHeroService {
  static formatPhone(phone: string): string {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) cleaned = '254' + cleaned.substring(1);
    if (cleaned.startsWith('+')) cleaned = cleaned.substring(1);
    if (!cleaned.startsWith('254')) cleaned = '254' + cleaned;
    return cleaned;
  }

  static async initiateSTKPush(
    phoneNumber: string,
    amount: number,
    reference: string,
    customerName: string = ""
  ): Promise<STKPushResponse> {
    try {
      const formattedPhone = this.formatPhone(phoneNumber);
      
      const res = await fetch(`/api/payhero/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formattedPhone,
          amount,
          reference,
          customer_name: customerName,
        }),
      });

      const data = await res.json().catch(() => null);
      
      if (!res.ok || !data) {
        toast.error("Payment initiation failed");
        return { 
          success: false, 
          message: data?.message ?? "Failed to initiate payment" 
        };
      }

      if (data.success) {
        toast.success("M-Pesa prompt sent! Check your phone and enter PIN.");
        return {
          success: true,
          checkoutId: data.checkoutId || reference,
          message: data.message,
          raw: data.raw,
        };
      } else {
        toast.error(data.message || "Payment initiation failed");
        return { 
          success: false, 
          message: data.message 
        };
      }
    } catch (error) {
      console.error("PayHero STK Push Error:", error);
      toast.error("Failed to send M-Pesa prompt. Please try again.");
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Network error" 
      };
    }
  }

  static async checkPaymentStatus(checkoutId: string): Promise<PaymentStatusResponse> {
    try {
      // Check status via callback endpoint (which has GET handler)
      const res = await fetch(`/api/payhero/callback?checkoutId=${checkoutId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return { status: 'pending' };
      }

      const data = await res.json().catch(() => null);
      return {
        status: data?.status || 'pending',
        mpesaReceipt: data?.mpesaReceipt,
      };
    } catch (error) {
      console.error("Check payment status error:", error);
      return { status: 'pending' };
    }
  }

  static async pollPaymentStatus(
    checkoutId: string,
    maxAttempts: number = 60,
    onSuccess?: () => void,
    onFailure?: () => void
  ): Promise<boolean> {
    let attempts = 0;
    
    const checkStatus = async (): Promise<boolean> => {
      attempts++;
      
      // Check actual payment status
      const statusResult = await this.checkPaymentStatus(checkoutId);
      
      if (statusResult.status === 'completed') {
        if (onSuccess) onSuccess();
        return true;
      }
      
      if (statusResult.status === 'failed') {
        if (onFailure) onFailure();
        return false;
      }
      
      if (attempts >= maxAttempts) {
        if (onFailure) onFailure();
        return false;
      }
      
      // Continue polling every 5 seconds
      setTimeout(checkStatus, 5000);
      return false;
    };

    return checkStatus();
  }
}

export default PayHeroService;
