import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { organizations } from "@/data/organizations";

export default function OrganizationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Top NGOs & Organizations Hiring in Kenya 2026 | My Job Kenya"
        description="Explore job opportunities at Kenya's top NGOs: UN Kenya, World Vision, Amref Health Africa, Save the Children, Red Cross, Oxfam, Aga Khan & more. 300+ open positions."
        canonical="https://myjobkenya.co.ke/organizations"
      />
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">Our Partner Organizations</h1>
            <p className="text-muted-foreground mt-2 font-body">Leading NGOs and corporates making an impact across Kenya</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {organizations.map((org, i) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/organizations/${org.id}`}
                  className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all border border-border hover:border-primary/30 hover:-translate-y-1"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={org.image}
                      alt={org.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-md" style={{ backgroundColor: org.color }}>
                        {org.shortName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">{org.name}</h3>
                        <span className="text-xs text-muted-foreground">{org.category}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-body line-clamp-2">{org.mission}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-sm font-bold text-primary">{org.liveRoles} open roles</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
