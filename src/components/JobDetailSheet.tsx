import { X, MapPin, Briefcase, Clock, CheckCircle2, ArrowRight, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Job } from "@/data/jobs";

import jobDriver from "@/assets/job-driver.jpg";
import jobOffice from "@/assets/job-office.jpg";
import jobField from "@/assets/job-field.jpg";
import jobAccounts from "@/assets/job-accounts.jpg";
import jobData from "@/assets/job-data.jpg";
import jobWarehouse from "@/assets/job-warehouse.jpg";
import jobCommunity from "@/assets/job-community.jpg";

const imageMap: Record<string, string> = {
  driver: jobDriver, office: jobOffice, field: jobField,
  accounts: jobAccounts, data: jobData, warehouse: jobWarehouse, community: jobCommunity,
};

interface Props {
  job: Job | null;
  onClose: () => void;
  onApply: (job: Job) => void;
}

export default function JobDetailSheet({ job, onClose, onApply }: Props) {
  if (!job) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 220 }}
        className="fixed inset-x-0 bottom-0 top-12 md:top-auto md:inset-x-auto md:right-0 md:left-auto md:bottom-0 md:top-0 z-50 w-full md:max-w-lg bg-card shadow-2xl flex flex-col rounded-t-2xl md:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-4 p-5 border-b border-border">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-lg text-foreground truncate">{job.title}</h2>
            <p className="text-sm text-primary font-medium">{job.organizationName}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Job image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={imageMap[job.imageKey] || jobOffice}
              alt={job.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
          </div>

          <div className="p-5 space-y-5">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold font-display">
                {job.salary}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm">
                <MapPin className="w-3.5 h-3.5" /> {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm">
                <Briefcase className="w-3.5 h-3.5" /> {job.type}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm">
                Entry Level
              </span>
            </div>

            {/* About */}
            <div>
              <h3 className="font-display font-bold text-foreground text-base mb-2">About This Role</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="font-display font-bold text-foreground text-base mb-3">Requirements</h3>
              <ul className="space-y-2.5">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground font-body">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Posted */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-4 h-4" /> Posted {job.postedDays} day{job.postedDays !== 1 ? "s" : ""} ago
            </div>
          </div>
        </div>

        {/* Apply button */}
        <div className="p-5 border-t border-border">
          <button
            onClick={() => {
              onApply(job);
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent text-accent-foreground font-display font-bold text-base shadow-accent hover:brightness-110 transition-all"
          >
            Apply Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
