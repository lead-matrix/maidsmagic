"use client";

import { Shield, Sparkles, CheckCircle2, Award, Clock, HeartHandshake } from "lucide-react";
import { RIVERSIDE_COMPANY_INFO } from "@/lib/constants/riverside-data";

export function RiversideGuarantee() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-emerald-800/40">
          {/* Background Decorative Rings */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 text-amber-300 text-xs font-bold border border-emerald-700/60">
                <Award className="w-4 h-4" />
                <span>The MaidsMagic 100% Sparkle Guarantee</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-snug">
                Your Home Is Pristine, Or We Re-Clean For Free. No Questions Asked.
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We believe trust is earned room by room. If any corner of your Riverside home fails to meet your highest standards, simply notify us within 24 hours. A supervisor crew will return and re-clean the area free of charge.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-900/60 text-emerald-400 border border-emerald-800">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">$2M Liability Insurance</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Full comprehensive bonding and worker protection</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-900/60 text-emerald-400 border border-emerald-800">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Vetted Local Specialists</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Background-checked & trained in white-glove protocols</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Badge Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-8 rounded-3xl bg-slate-900/90 border border-emerald-700/50 text-center max-w-sm w-full space-y-4 shadow-xl">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center mx-auto shadow-lg">
                  <Sparkles className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                    Riverside Standard
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">
                    White-Glove Promise
                  </h3>
                  <p className="text-xs text-slate-400 mt-2">
                    Serving Canyon Crest, Orangecrest, Wood Streets, Hawarden Hills & Riverside Metro.
                  </p>
                </div>

                <a
                  href="#quote-engine"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Book With Total Confidence</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
