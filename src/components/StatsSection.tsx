import { motion } from "framer-motion";
import { Users, Building2, Briefcase, Globe } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Live Jobs", value: "150+", color: "text-primary" },
  { icon: Building2, label: "Partner Organizations", value: "12", color: "text-accent" },
  { icon: Users, label: "Applications Monthly", value: "3,200+", color: "text-primary" },
  { icon: Globe, label: "Counties Covered", value: "32", color: "text-accent" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <s.icon className={`w-8 h-8 mx-auto mb-3 ${s.color}`} />
              <div className="font-display font-extrabold text-3xl text-secondary-foreground">{s.value}</div>
              <div className="text-sm text-secondary-foreground/60 mt-1 font-body">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
