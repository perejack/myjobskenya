import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { jobs } from "@/data/jobs";
import JobCard from "./JobCard";
import JobDetailSheet from "./JobDetailSheet";
import ApplicationDrawer from "./ApplicationDrawer";
import type { Job } from "@/data/jobs";

export default function FeaturedJobs() {
  const [detailJob, setDetailJob] = useState<Job | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const featured = jobs.filter((j) => j.urgent).slice(0, 4);

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Urgent Openings</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-2">Featured Opportunities</h2>
          </div>
          <Link
            to="/jobs"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition"
          >
            View all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} onApply={setDetailJob} />
          ))}
        </div>
      </div>

      <JobDetailSheet job={detailJob} onClose={() => setDetailJob(null)} onApply={(job) => { setDetailJob(null); setApplyJob(job); }} />
      <ApplicationDrawer job={applyJob} onClose={() => setApplyJob(null)} />
    </section>
  );
}
