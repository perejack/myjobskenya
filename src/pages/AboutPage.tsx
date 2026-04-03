import { motion } from "framer-motion";
import { Heart, Shield, Users, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import heroBg from "@/assets/hero-bg.jpg";

const values = [
  { icon: Heart, title: "Impact First", desc: "Every role we list creates meaningful change in communities across Kenya." },
  { icon: Shield, title: "Trust & Transparency", desc: "Verified organizations with real salaries. No hidden surprises." },
  { icon: Users, title: "Inclusive Access", desc: "Entry-level to leadership roles—accessible to all skill levels and backgrounds." },
  { icon: Target, title: "Kenya Focused", desc: "Purpose-built for the Kenyan job market, from Nairobi to Turkana." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About My Job Kenya | Kenya's Leading Job Portal for NGO Jobs"
        description="My Job Kenya connects talented Kenyans with opportunities at top NGOs and organizations. Learn about our mission to make employment accessible across Kenya."
        canonical="https://myjobkenya.co.ke/about"
      />
      <Navbar />
      <div className="pt-16">
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img src={heroBg} alt="About Job Opportunities" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h1 className="font-display font-extrabold text-4xl md:text-5xl text-primary-foreground">About Job Opportunities</h1>
              <p className="text-primary-foreground/80 mt-3 max-w-xl mx-auto font-body">Bridging Kenya's talent with purpose-driven organizations since 2024.</p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">Our Mission</h2>
            <p className="text-muted-foreground mt-4 text-lg font-body leading-relaxed">
              Job Opportunities exists to democratize access to meaningful employment in Kenya. We partner with the nation's most impactful NGOs and organizations to connect talented Kenyans—from first-time job seekers to experienced professionals—with roles that build better communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card border border-border"
              >
                <v.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-bold text-foreground text-lg">{v.title}</h3>
                <p className="text-muted-foreground mt-2 font-body text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
