"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Star, CheckCircle2, Phone, ArrowRight, Clock, Award, MapPin, Calendar } from "lucide-react";
import { RIVERSIDE_COMPANY_INFO } from "@/lib/constants/riverside-data";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-emerald-950 via-slate-950 to-slate-900 text-white">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Top Local Verified Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 backdrop-blur-md shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-semibold text-emerald-200 tracking-wide">
                Premier Riverside, CA Cleaning Concierge
              </span>
              <span className="text-amber-400 text-xs font-bold">★ 4.96/5.0</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.12]">
              The Ultimate Clean for{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-100 to-amber-200 bg-clip-text text-transparent italic">
                Riverside Homes.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              Experience immaculate white-glove house cleaning tailored for Riverside residences. From Canyon Crest estates to historic Wood Streets bungalows—enjoy verified specialists, hospital-grade eco solutions, and instant transparent pricing.
            </p>

            {/* Trust Badges Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
                <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">$2M Insured & Bonded</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">100% Background Checked</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm col-span-2 sm:col-span-1">
                <Award className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">100% Sparkle Guarantee</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href="#quote-engine"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold text-base shadow-xl shadow-emerald-950/40 hover:shadow-emerald-900/60 active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Calculate Your Clean Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${RIVERSIDE_COMPANY_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-base transition-colors"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>{RIVERSIDE_COMPANY_INFO.phoneFormatted}</span>
              </a>
            </div>

            {/* Micro Social Proof Text */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Client"
                  className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Client"
                  className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Client"
                  className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Client"
                  className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover"
                />
              </div>
              <p>
                <strong className="text-white font-semibold">3,400+ homes cleaned</strong> across Riverside, CA
              </p>
            </div>
          </motion.div>

          {/* Right Interactive Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-emerald-500/30 via-slate-800 to-amber-500/20 shadow-2xl">
              <div className="bg-slate-950/90 backdrop-blur-xl rounded-[22px] p-6 space-y-6 border border-slate-800/80">
                {/* Header of Quick Card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-amber-300">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">Instant Riverside Quote</h2>
                      <p className="text-xs text-slate-400">Live pricing without hidden fees</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
                    60 Sec Booking
                  </span>
                </div>

                {/* Service Highlights */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-slate-200 font-medium">Luxury Deep Clean</span>
                    </div>
                    <span className="text-amber-300 font-semibold font-mono">From $189</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-slate-200 font-medium">Standard Recurring (Bi-Weekly)</span>
                    </div>
                    <span className="text-emerald-400 font-semibold font-mono">15% OFF Auto</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-slate-200 font-medium">Move-In / Move-Out Standard</span>
                    </div>
                    <span className="text-amber-300 font-semibold font-mono">Deposit Ready</span>
                  </div>
                </div>

                {/* Location Verification Pill */}
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Riverside Coverage Active</span>
                  </div>
                  <p className="text-slate-300 pl-6">
                    Dispatching crews to 92501, 92503, 92504, 92505, 92506, 92507, 92508
                  </p>
                </div>

                {/* Direct Action */}
                <a
                  href="#quote-engine"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Customize Your Quote & Date</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
