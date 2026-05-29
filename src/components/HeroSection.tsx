import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Kenyan professionals with Nairobi skyline" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">300+ live opportunities across Kenya</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight mb-6">
            Your Career in
            <span className="block text-accent">Impact Starts Here</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto font-body">
            Connect with top NGOs and corporates across Kenya. From entry-level to leadership—find roles that make a difference.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 p-3 rounded-2xl bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20">
              <div className="flex-1 flex items-center gap-3 bg-card rounded-xl px-4 py-3">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search roles: Driver, Accountant, Field Assistant..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none font-body"
                />
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-card rounded-xl px-4 py-3 min-w-[160px]">
                <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground font-body">All Kenya</span>
              </div>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-accent text-accent-foreground font-display font-bold text-sm shadow-accent hover:brightness-110 transition-all"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["Driver", "Office Assistant", "Data Entry", "Field Assistant", "WASH"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/jobs?q=${encodeURIComponent(tag)}`)}
                className="px-4 py-1.5 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground/80 text-xs font-medium hover:bg-primary-foreground/20 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
