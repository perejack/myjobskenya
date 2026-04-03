import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import JobDetailSheet from "@/components/JobDetailSheet";
import ApplicationDrawer from "@/components/ApplicationDrawer";
import { organizations } from "@/data/organizations";
import { jobs } from "@/data/jobs";
import type { Job } from "@/data/jobs";

export default function OrganizationDetail() {
  const { id } = useParams();
  const org = organizations.find((o) => o.id === id);
  const [detailJob, setDetailJob] = useState<Job | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  const orgJobs = useMemo(() => jobs.filter((j) => j.organizationId === id), [id]);

  if (!org) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 container mx-auto px-4 text-center py-20">
          <p className="text-muted-foreground">Organization not found.</p>
          <Link to="/organizations" className="text-primary mt-4 inline-block">← Back to organizations</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={org.image} alt={org.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-20 left-0 right-0 container mx-auto px-4">
          <Link to="/organizations" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition backdrop-blur-sm bg-black/20 rounded-full px-3 py-1.5">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-8 shadow-card border border-border mb-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-primary-foreground font-display font-bold text-2xl shadow-lg" style={{ backgroundColor: org.color }}>
              {org.shortName.charAt(0)}
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">{org.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-1">
                <span className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Nairobi, Kenya</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {org.category}</span>
                <span className="text-sm text-primary font-semibold flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {orgJobs.length} Open Positions</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mt-4 font-body">{org.mission}</p>
        </motion.div>

        <h2 className="font-display font-bold text-xl text-foreground mb-6">Available Positions</h2>

        {orgJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orgJobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} onApply={setDetailJob} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground font-body py-10 text-center">No open positions at this time. Check back soon!</p>
        )}
      </div>
      <Footer />
      <JobDetailSheet job={detailJob} onClose={() => setDetailJob(null)} onApply={(job) => { setDetailJob(null); setApplyJob(job); }} />
      <ApplicationDrawer job={applyJob} onClose={() => setApplyJob(null)} />
    </div>
  );
}
