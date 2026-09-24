import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { InstantQuoteEngine } from "@/components/booking/InstantQuoteEngine";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { RiversideNeighborhoods } from "@/components/home/RiversideNeighborhoods";
import { CleaningChecklist } from "@/components/home/CleaningChecklist";
import { VerifiedGoogleReviews } from "@/components/home/VerifiedGoogleReviews";
import { RiversideGuarantee } from "@/components/home/RiversideGuarantee";
import { FAQSection } from "@/components/home/FAQSection";
import { LiveChatWidget } from "@/components/chat/LiveChatWidget";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-900 selection:text-amber-200">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <ServicesGrid />
        <InstantQuoteEngine />
        <BeforeAfterSlider />
        <RiversideNeighborhoods />
        <CleaningChecklist />
        <VerifiedGoogleReviews />
        <RiversideGuarantee />
        <FAQSection />
      </main>

      {/* Floating Live Chat Widget */}
      <LiveChatWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
}
