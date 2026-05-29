import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, Zap } from "lucide-react";
import type { Job } from "@/data/jobs";

import jobDriver from "@/assets/job-driver.jpg";
import jobOffice from "@/assets/job-office.jpg";
import jobField from "@/assets/job-field.jpg";
import jobAccounts from "@/assets/job-accounts.jpg";
import jobData from "@/assets/job-data.jpg";
import jobWarehouse from "@/assets/job-warehouse.jpg";
import jobCommunity from "@/assets/job-community.jpg";

const imageMap: Record<string, string> = {
  driver: jobDriver,
  office: jobOffice,
  field: jobField,
  accounts: jobAccounts,
  data: jobData,
  warehouse: jobWarehouse,
  community: jobCommunity,
};

interface Props {
  job: Job;
  index: number;
  onApply: (job: Job) => void;
}

export default function JobCard({ job, index, onApply }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="group bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/30 overflow-hidden hover:-translate-y-1 cursor-pointer"
      onClick={() => onApply(job)}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={imageMap[job.imageKey] || jobOffice}
          alt={job.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-accent text-accent-foreground text-xs font-bold font-display shadow-accent">
          {job.salary}
        </div>
        {job.urgent && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-destructive text-destructive-foreground text-xs font-semibold flex items-center gap-1">
            <Zap className="w-3 h-3" /> Urgent
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-foreground text-base group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-primary font-medium mt-0.5">{job.organizationName}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
            <MapPin className="w-3 h-3" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
            <Briefcase className="w-3 h-3" /> {job.type}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
            <Clock className="w-3 h-3" /> {job.postedDays}d ago
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {job.requirements.slice(0, 3).map((req) => (
            <span key={req} className="text-[11px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
              {req}
            </span>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply(job);
          }}
          className="w-full mt-4 py-2.5 rounded-lg bg-accent text-accent-foreground font-display font-bold text-sm shadow-accent hover:brightness-110 transition-all"
        >
          View & Apply
        </button>
      </div>
    </motion.div>
  );
}
