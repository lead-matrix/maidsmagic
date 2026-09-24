import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InstantQuoteEngine } from "@/components/booking/InstantQuoteEngine";
import { RiversideGuarantee } from "@/components/home/RiversideGuarantee";
import { FAQSection } from "@/components/home/FAQSection";
import { LiveChatWidget } from "@/components/chat/LiveChatWidget";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export const metadata = {
  title: "Instant Cleaning Quote & Booking | MaidsMagic Riverside CA",
  description:
    "Calculate your house cleaning quote in 60 seconds. Transparent pricing for Canyon Crest, Orangecrest, Hawarden Hills, and Riverside homes. Zero upfront payment.",
};

export default function QuotePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-900 selection:text-amber-200">
      <LocalBusinessJsonLd />
      <Navbar />
      <main className="flex-1 py-6">
        <InstantQuoteEngine />
        <RiversideGuarantee />
        <FAQSection />
      </main>
      <LiveChatWidget />
      <Footer />
    </div>
  );
}
