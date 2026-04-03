import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { organizations } from "@/data/organizations";
import { jobs } from "@/data/jobs";

// Get unique job titles
const jobTitles = [...new Set(jobs.map(j => j.title))].slice(0, 5);

export default function OrganizationCards() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Trusted Partners</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-2">
            Top Organizations Hiring
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto font-body">
            Leading NGOs and corporates in Kenya actively seeking talented individuals like you.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-5 max-w-3xl mx-auto">
            {jobTitles.map((title, i) => (
              <motion.span
                key={title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ scale: 1.08 }}
                className="px-3 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all cursor-default"
              >
                {title}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {organizations.map((org, i) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/organizations/${org.id}`}
                className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/30 hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={org.image}
                    alt={org.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-primary-foreground font-display font-bold text-sm shadow-lg"
                      style={{ backgroundColor: org.color }}
                    >
                      {org.shortName.charAt(0)}
                    </div>
                    <h3 className="font-display font-semibold text-white text-sm truncate drop-shadow-md">
                      {org.shortName}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs text-muted-foreground">{org.category}</span>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 font-body">{org.mission}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-xs font-semibold text-primary">{org.liveRoles} live roles</span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold hover:brightness-110 transition-all">
                      Apply <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
