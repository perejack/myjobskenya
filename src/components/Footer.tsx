import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg mb-4">
              <img src={logo} alt="My Job Kenya" className="h-10 w-auto" />
              My Job Kenya
            </div>
            <p className="text-sm text-secondary-foreground/60 font-body">
              Connecting Kenya's talent with impactful opportunities in NGOs and leading organizations.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[["Jobs", "/jobs"], ["Organizations", "/organizations"], ["About", "/about"]].map(([label, path]) => (
                <Link key={path} to={path} className="block text-sm text-secondary-foreground/60 hover:text-primary transition font-body">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Categories</h4>
            <div className="space-y-2">
              {["Transport", "Administration", "Field Operations", "Finance", "Logistics"].map((c) => (
                <Link key={c} to={`/jobs?category=${c}`} className="block text-sm text-secondary-foreground/60 hover:text-primary transition font-body">{c}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-secondary-foreground/60 font-body">
                <Mail className="w-4 h-4 text-primary" /> careers@jobopportunities.co.ke
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-foreground/60 font-body">
                <Phone className="w-4 h-4 text-primary" /> +254 700 123 456
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-foreground/60 font-body">
                <MapPin className="w-4 h-4 text-primary" /> Westlands, Nairobi, Kenya
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/10 pt-6 text-center text-xs text-secondary-foreground/40 font-body">
          © 2026 My Job Kenya. All rights reserved. Connecting Talent with Opportunities.
        </div>
      </div>
    </footer>
  );
}
