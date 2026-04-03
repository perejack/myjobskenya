import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Search, CalendarCheck, Sparkles } from "lucide-react";

interface Props {
  jobTitle: string;
  orgName: string;
  onComplete: () => void;
}

const stages = [
  { icon: Loader2, text: "Reviewing your application…", spin: true },
  { icon: Search, text: "Processing application details…", spin: true },
  { icon: CalendarCheck, text: "Looking for open slots…", spin: true },
  { icon: Sparkles, text: "Match found!", spin: false },
];

export default function ApplicationProcessing({ jobTitle, orgName, onComplete }: Props) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage < stages.length - 1) {
      const timer = setTimeout(() => setStage((s) => s + 1), 1800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 1200);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  const current = stages[stage];
  const progress = ((stage + 1) / stages.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-full text-center px-6"
    >
      {/* Animated rings */}
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-primary/30"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.div
          className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center"
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <current.icon
                className={`w-12 h-12 text-primary ${current.spin ? "animate-spin" : ""}`}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Stage text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="font-display font-semibold text-lg text-foreground mb-2"
        >
          {current.text}
        </motion.p>
      </AnimatePresence>

      <p className="text-sm text-muted-foreground mb-6">
        {jobTitle} · {orgName}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-xs h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        Step {stage + 1} of {stages.length}
      </p>
    </motion.div>
  );
}
