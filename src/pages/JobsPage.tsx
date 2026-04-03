import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import JobCard from "@/components/JobCard";
import JobDetailSheet from "@/components/JobDetailSheet";
import ApplicationDrawer from "@/components/ApplicationDrawer";
import { jobs, categories } from "@/data/jobs";
import type { Job } from "@/data/jobs";

export default function JobsPage() {
  const [searchParams] = useSearchParams();
  const [detailJob, setDetailJob] = useState<Job | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.organizationName.toLowerCase().includes(search.toLowerCase()) ||
        j.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || j.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Job Vacancies in Kenya 2026 | Latest NGO & Corporate Jobs | My Job Kenya"
        description="Browse 300+ latest job vacancies in Kenya. Find driver jobs, cleaner jobs, accountant jobs, security guard jobs, field officer positions at top NGOs. Apply today!"
        canonical="https://myjobkenya.co.ke/jobs"
      />
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">Browse All Jobs</h1>
            <p className="text-muted-foreground mt-2 font-body">Find your next opportunity across Kenya's top organizations</p>
          </motion.div>

          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 bg-card rounded-xl px-4 py-3 border border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none font-body"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  category === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-4 text-sm text-muted-foreground font-body">{filtered.length} jobs found</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filtered.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} onApply={setDetailJob} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body">No jobs match your search. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <JobDetailSheet job={detailJob} onClose={() => setDetailJob(null)} onApply={(job) => { setDetailJob(null); setApplyJob(job); }} />
      <ApplicationDrawer job={applyJob} onClose={() => setApplyJob(null)} />
    </div>
  );
}
