"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Home, BedDouble, Zap, Check, ArrowRight } from "lucide-react";
import { SERVICES_CATALOG } from "@/lib/constants/riverside-data";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6 text-emerald-600" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
  Home: <Home className="w-6 h-6 text-emerald-600" />,
  BedDouble: <BedDouble className="w-6 h-6 text-emerald-600" />,
  Zap: <Zap className="w-6 h-6 text-amber-500" />,
};

export function ServicesGrid() {
  return (
    <section id="services" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide">
            <span>Tailored For Riverside Properties</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            White-Glove Cleaning Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Whether you require effortless bi-weekly maintenance, an exhaustive deep restoration, or a fast-track rental turnover, our verified Riverside crew delivers perfection.
          </p>
        </div>

        {/* 5-Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_CATALOG.map((service, index) => {
            const isDeep = service.slug === "luxury-deep-clean";

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  isDeep
                    ? "bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white shadow-xl ring-2 ring-amber-400/80 scale-[1.02]"
                    : "bg-white text-slate-900 shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-emerald-300"
                }`}
              >
                {isDeep && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[11px] font-bold tracking-wider uppercase shadow-md">
                    Most Popular in Riverside
                  </div>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isDeep
                          ? "bg-emerald-800/80 text-amber-300 border border-emerald-600/40"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      }`}
                    >
                      {iconMap[service.iconName] || <Sparkles className="w-6 h-6 text-emerald-600" />}
                    </div>

                    <div className="text-right">
                      <span className={`text-xs ${isDeep ? "text-emerald-300" : "text-slate-500"}`}>
                        Starting at
                      </span>
                      <p
                        className={`text-2xl font-bold font-mono ${
                          isDeep ? "text-amber-300" : "text-emerald-800"
                        }`}
                      >
                        ${service.basePrice}
                      </p>
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold mb-2 font-serif ${isDeep ? "text-white" : "text-slate-900"}`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs font-semibold mb-3 ${isDeep ? "text-emerald-200" : "text-emerald-700"}`}>
                    {service.tagline}
                  </p>
                  <p className={`text-sm leading-relaxed mb-6 ${isDeep ? "text-slate-300" : "text-slate-600"}`}>
                    {service.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6 text-xs">
                    <div className="flex items-center gap-2">
                      <Check className={`w-4 h-4 shrink-0 ${isDeep ? "text-amber-400" : "text-emerald-600"}`} />
                      <span className={isDeep ? "text-slate-200" : "text-slate-700"}>
                        Estimated ~{service.estimatedHoursBase} hrs dedicated crew work
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className={`w-4 h-4 shrink-0 ${isDeep ? "text-amber-400" : "text-emerald-600"}`} />
                      <span className={isDeep ? "text-slate-200" : "text-slate-700"}>
                        HEPA filtration & hospital-grade eco disinfectants
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className={`w-4 h-4 shrink-0 ${isDeep ? "text-amber-400" : "text-emerald-600"}`} />
                      <span className={isDeep ? "text-slate-200" : "text-slate-700"}>
                        100% Sparkle Satisfaction Guarantee
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <a
                  href={`#quote-engine`}
                  className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                    isDeep
                      ? "bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md"
                      : "bg-emerald-50 hover:bg-emerald-800 text-emerald-800 hover:text-white border border-emerald-200 hover:border-transparent"
                  }`}
                >
                  <span>Select in Instant Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
