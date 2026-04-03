import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Loader2, Check, X } from "lucide-react";
import { PayHeroService } from "@/lib/payhero";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  jobTitle: string;
  orgName: string;
  processingFee: number;
}

type PaymentStage = "form" | "processing" | "waiting" | "success";

export default function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  jobTitle,
  orgName,
  processingFee,
}: PaymentModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stage, setStage] = useState<PaymentStage>("form");
  const [isPaying, setIsPaying] = useState(false);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  const isPhoneValid = useMemo(() => {
    const cleaned = phoneNumber.replace(/\s+/g, "");
    return cleaned.length >= 10;
  }, [phoneNumber]);

  const handleRequestPayment = async () => {
    if (!isPhoneValid) {
      toast.error("Enter a valid phone number", {
        description: "Use your M-Pesa phone number (e.g. 07XXXXXXXX)",
      });
      return;
    }

    setIsPaying(true);

    try {
      const reference = `KCC-${Date.now()}`;
      const init = await PayHeroService.initiateSTKPush(
        phoneNumber,
        processingFee,
        reference,
        ""
      );

      if (!init?.success || !init.checkoutId) {
        setIsPaying(false);
        toast.error("Could not initiate payment", {
          description: init?.message ?? "Please try again.",
        });
        return;
      }

      setCheckoutId(init.checkoutId);
      setStage("processing");

      // Show processing loader for 20 seconds, then switch to waiting
      setTimeout(() => {
        setStage("waiting");
      }, 20000);
    } finally {
      setIsPaying(false);
    }
  };

  const handleConfirmPayment = () => {
    setStage("success");
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">
                {stage === "form" && "Complete Application"}
                {stage === "processing" && "Check your phone"}
                {stage === "waiting" && "Complete Payment"}
                {stage === "success" && "Payment Confirmed"}
              </h3>
              <p className="text-sm text-primary">{jobTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground"
              disabled={isPaying || stage === "processing"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {stage === "form" && (
              <div className="space-y-4">
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Processing Fee
                  </p>
                  <p className="text-2xl font-display font-bold text-foreground">
                    KES {processingFee.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="mpesaPhone"
                  >
                    M-Pesa Phone Number
                  </label>
                  <input
                    id="mpesaPhone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-body"
                    placeholder="07XXXXXXXX"
                  />
                  <p className="text-xs text-muted-foreground">
                    You&apos;ll receive an M-Pesa prompt on your phone to complete
                    the payment.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 rounded-lg border border-input text-muted-foreground font-medium hover:bg-muted transition"
                    disabled={isPaying}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRequestPayment}
                    disabled={isPaying || !isPhoneValid}
                    className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm shadow-lg hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isPaying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Phone className="w-4 h-4" />
                        Send Prompt
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {stage === "processing" && (
              <div className="space-y-6 py-8">
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <Phone className="w-8 h-8 text-primary absolute inset-0 m-auto" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    M-Pesa prompt sent to {phoneNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Please enter your M-Pesa PIN on your phone
                  </p>
                </div>
              </div>
            )}

            {stage === "waiting" && (
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  After entering your M-Pesa PIN, click the button below to
                  continue.
                </p>
                <button
                  onClick={handleConfirmPayment}
                  className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm shadow-lg hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  I&apos;ve Completed Payment
                </button>
              </div>
            )}

            {stage === "success" && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">
                    Payment Successful!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your application has been secured.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
