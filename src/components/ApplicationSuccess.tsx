import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, ShieldCheck, CalendarPlus } from "lucide-react";

interface Props {
  jobTitle: string;
  orgName: string;
  onSecure: () => void;
  onBookInterview: () => void;
}

export default function ApplicationSuccess({ jobTitle, orgName, onSecure, onBookInterview }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 20 }}
      className="flex flex-col items-center justify-center h-full text-center px-6"
    >
      {/* Success badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2, damping: 12 }}
        className="relative mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <CheckCircle2 className="w-14 h-14 text-primary" />
          </motion.div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="absolute -top-1 -right-1 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-display font-bold text-xl text-foreground mb-1">
          You Qualify! 🎉
        </h3>
        <p className="text-primary font-display font-semibold text-base mb-1">
          {jobTitle}
        </p>
        <p className="text-sm text-muted-foreground mb-4">{orgName}</p>
      </motion.div>

      {/* Slots remaining */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-8"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
        </span>
        <span className="text-sm font-semibold text-foreground">
          2 open slots remaining
        </span>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full space-y-3 max-w-xs"
      >
        <button
          onClick={onSecure}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm shadow-lg hover:brightness-110 transition-all active:scale-[0.98]"
        >
          <ShieldCheck className="w-5 h-5" />
          Secure Position
        </button>
        <button
          onClick={onBookInterview}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-accent-foreground font-display font-bold text-sm shadow-lg hover:brightness-110 transition-all active:scale-[0.98]"
        >
          <CalendarPlus className="w-5 h-5" />
          Book Interview
        </button>
      </motion.div>
    </motion.div>
  );
}
