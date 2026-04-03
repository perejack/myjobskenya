import HeroSection from "@/components/HeroSection";
import OrganizationCards from "@/components/OrganizationCards";
import FeaturedJobs from "@/components/FeaturedJobs";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Jobs in Kenya 2026 | NGO Jobs, Driver, Cleaner, Accountant Jobs | My Job Kenya"
        description="Find 300+ jobs in Kenya at UN, World Vision, Amref, Red Cross & more. Apply for driver, cleaner, accountant, security guard, field officer jobs in Nairobi, Mombasa, Kisumu. Entry-level & experienced roles available."
        canonical="https://myjobkenya.co.ke/"
      />
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <OrganizationCards />
        <FeaturedJobs />
      </main>
      <Footer />
    </div>
  );
}