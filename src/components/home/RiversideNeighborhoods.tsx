"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Search, Sparkles, ArrowRight } from "lucide-react";
import { RIVERSIDE_NEIGHBORHOODS } from "@/lib/constants/riverside-data";

export function RiversideNeighborhoods() {
  const [zipInput, setZipInput] = useState("");
  const [zipResult, setZipResult] = useState<{ checked: boolean; covered: boolean; area?: string }>({
    checked: false,
    covered: false,
  });

  const validRiversideZips: Record<string, string> = {
    "92501": "Downtown & The Wood Streets",
    "92503": "Arlington & La Sierra East",
    "92504": "Arlington Heights & Casa Blanca",
    "92505": "La Sierra West & Galleria Area",
    "92506": "Canyon Crest, Victoria & Hawarden Hills",
    "92507": "UCR Campus, Box Springs & Eastside",
    "92508": "Orangecrest & Mission Grove",
    "92518": "March AFB / Riverside South",
    "92521": "UCR Main Campus Residences",
  };

  const checkZip = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (validRiversideZips[cleanZip]) {
      setZipResult({
        checked: true,
        covered: true,
        area: validRiversideZips[cleanZip],
      });
    } else if (cleanZip.length === 5) {
      setZipResult({
        checked: true,
        covered: false,
      });
    }
  };

  return (
    <section id="neighborhoods" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-blue-700" />
            <span>Local Riverside Service Zones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Riverside&apos;s Trusted Neighborhood Cleaners
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We proudly deploy vetted local crews across every prestigious corner of Riverside, California.
          </p>
        </div>

        {/* Interactive Zip Checker Bar */}
        <div className="max-w-xl mx-auto mb-14">
          <form
            onSubmit={checkZip}
            className="p-2 rounded-2xl bg-white shadow-lg border border-slate-200 flex flex-col sm:flex-row gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                maxLength={5}
                placeholder="Enter your 5-digit Riverside zip code (e.g. 92506)"
                value={zipInput}
                onChange={(e) => {
                  setZipInput(e.target.value);
                  setZipResult({ checked: false, covered: false });
                }}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
            >
              Verify Coverage
            </button>
          </form>

          {zipResult.checked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 p-3.5 rounded-xl text-xs flex items-center gap-2.5 ${
                zipResult.covered
                  ? "bg-blue-50 text-blue-950 border border-blue-200"
                  : "bg-amber-50 text-amber-900 border border-amber-200"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              {zipResult.covered ? (
                <div>
                  <strong>Great news!</strong> Zip code <span className="font-mono font-bold">{zipInput}</span> ({zipResult.area}) has daily active dispatch teams available.
                </div>
              ) : (
                <div>
                  Zip code <span className="font-mono font-bold">{zipInput}</span> is outside our primary Riverside core, but custom dispatch can be arranged by calling (951) 697-9000.
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Neighborhood Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RIVERSIDE_NEIGHBORHOODS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-blue-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md">
                    {item.zip}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    {item.badgeText}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Popular Clean:</span>
                <span className="font-semibold text-slate-700">{item.popularService}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
