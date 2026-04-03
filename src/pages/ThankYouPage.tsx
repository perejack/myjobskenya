import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Calendar, MapPin, Briefcase, ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function ThankYouPage() {
  const [searchParams] = useSearchParams();
  
  const jobTitle = searchParams.get("job") || "the position";
  const orgName = searchParams.get("org") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";

  // Google Ads conversion tracking
  useEffect(() => {
    // Track conversion - you can add your Google Ads conversion code here
    // Example: gtag_report_conversion()
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'YOUR_CONVERSION_ID/YOUR_CONVERSION_LABEL',
        'value': 5,
        'currency': 'KES',
        'transaction_id': `KCC-${Date.now()}`
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden">
          {/* Header gradient */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2, damping: 12 }}
              className="relative inline-block"
            >
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <CheckCircle2 className="w-14 h-14 text-white" />
                </motion.div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute -top-1 -right-1 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display font-bold text-2xl text-white mt-4"
            >
              Congratulations! 🎉
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 text-sm mt-1"
            >
              Your interview has been booked successfully
            </motion.p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Job details */}
            <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Position</p>
                  <p className="font-semibold text-foreground">{jobTitle}</p>
                </div>
              </div>
              
              {orgName && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Organization</p>
                    <p className="font-semibold text-foreground">{orgName}</p>
                  </div>
                </div>
              )}
              
              {date && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Interview Date</p>
                    <p className="font-semibold text-foreground">{date} {time && `at ${time}`}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center"
            >
              <p className="text-sm text-foreground font-medium">
                📞 You will be contacted by our representative
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Please keep your phone available
              </p>
            </motion.div>

            {/* What's next */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-2"
            >
              <h3 className="font-semibold text-foreground text-sm">What's next?</h3>
              <ul className="space-y-2">
                {[
                  "Prepare for your interview",
                  "Check your email for confirmation",
                  "Our team will contact you shortly"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Back to jobs button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                to="/jobs"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm shadow-lg hover:brightness-110 transition-all active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                Browse More Jobs
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-muted-foreground mt-4"
        >
          Kenya Career Connect © {new Date().getFullYear()}
        </motion.p>
      </motion.div>
    </div>
  );
}
