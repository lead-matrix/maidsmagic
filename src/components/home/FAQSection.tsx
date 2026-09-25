"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Phone, MessageSquare } from "lucide-react";
import { RIVERSIDE_COMPANY_INFO } from "@/lib/constants/riverside-data";

const FAQS = [
  {
    q: "Do I need to be home while your team cleans?",
    a: "No! Most of our Riverside clients are at work, running errands, or enjoying the day. You can provide entry instructions (e.g. front door keypad code, smart lock, or lockbox) during booking. Our team will secure your home and send photo confirmation once finished.",
  },
  {
    q: "What cleaning equipment and supplies do you bring?",
    a: "We arrive fully equipped with commercial-grade HEPA filtration vacuums, color-coded microfiber cloths, non-abrasive scrub pads, extension dusters, and hospital-grade eco-friendly cleaning solutions. You only need to provide running water and electricity.",
  },
  {
    q: "How do you handle homes with pets in Riverside?",
    a: "We love pets! All our cleaning solutions are pet-safe and non-toxic. We just ask that you let us know where your pets will be (in a designated room, backyard, or crate) so our specialists can keep them safe and comfortable.",
  },
  {
    q: "When do I pay for my cleaning service?",
    a: "We do not charge you upfront! You only pay after your cleaning specialist finishes the job to your 100% satisfaction. We accept major credit cards, Apple Pay, and digital invoicing.",
  },
  {
    q: "What if I need to reschedule or cancel?",
    a: "We offer completely free rescheduling or cancellation up to 24 hours before your scheduled arrival window. We understand busy Riverside schedules and prioritize flexibility.",
  },
  {
    q: "Are all MaidsMagic cleaning specialists background checked?",
    a: "Yes, 100%. Every specialist on our team undergoes comprehensive nationwide criminal background checks, motor vehicle history screening, reference verification, and our proprietary white-glove hospitality training.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Everything You Need To Know
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Clear, upfront answers about our white-glove Riverside cleaning services.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 animate-in fade-in-50 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need more help banner */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center sm:flex sm:items-center sm:justify-between sm:text-left gap-4">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Have a unique Riverside estate or custom schedule?</h4>
            <p className="text-xs text-slate-500 mt-0.5">Our Riverside concierge is ready to tailor your plan.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-3 justify-center">
            <a
              href={`tel:${RIVERSIDE_COMPANY_INFO.phone}`}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Call (951) 697-9000</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
