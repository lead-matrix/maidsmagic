"use client";

import { useState } from "react";
import { CLEANING_CHECKLIST_DATA } from "@/lib/constants/checklist-data";
import { Check, X, Sparkles, Utensils, Bath, Bed, ArrowRight, ShieldCheck } from "lucide-react";

const roomIcons: Record<string, React.ReactNode> = {
  Utensils: <Utensils className="w-5 h-5 text-blue-600" />,
  Bath: <Bath className="w-5 h-5 text-blue-600" />,
  Bed: <Bed className="w-5 h-5 text-blue-600" />,
};

export function CleaningChecklist() {
  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);
  const currentSection = CLEANING_CHECKLIST_DATA[activeRoomIndex];

  return (
    <section id="checklist" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Scope Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Detailed Clean Checklist Scope
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Never wonder what is covered. See exactly how our Standard, Deep, and Move-Out cleans contrast across every room.
          </p>
        </div>

        {/* Room Category Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
          {CLEANING_CHECKLIST_DATA.map((section, idx) => (
            <button
              key={section.room}
              type="button"
              onClick={() => setActiveRoomIndex(idx)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 ${
                activeRoomIndex === idx
                  ? "bg-blue-700 text-white shadow-md shadow-blue-950/20 ring-2 ring-blue-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {roomIcons[section.icon] || <Sparkles className="w-4 h-4 text-blue-600" />}
              <span>{section.room}</span>
            </button>
          ))}
        </div>

        {/* Comparison Scope Table */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          {/* Table Header with Service Tiers */}
          <div className="grid grid-cols-12 bg-slate-900 text-white p-4 sm:p-5 text-xs sm:text-sm font-bold border-b border-slate-800 items-center">
            <div className="col-span-6 sm:col-span-6">
              <span className="text-slate-300 uppercase tracking-wider text-[11px]">Cleaning Scope Task</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-slate-300 block text-[11px] uppercase">Standard</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-amber-300 block text-[11px] uppercase font-bold">Deep Clean</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-blue-400 block text-[11px] uppercase">Move-Out</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {currentSection.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-slate-50/70 transition-colors text-xs sm:text-sm"
              >
                <div className="col-span-6 font-medium text-slate-800 pr-2">
                  {item.task}
                </div>

                {/* Standard */}
                <div className="col-span-2 flex justify-center">
                  {item.standard ? (
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center">
                      <X className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Deep Clean */}
                <div className="col-span-2 flex justify-center">
                  {item.deep ? (
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
                      <Check className="w-4 h-4 stroke-[3] text-amber-700" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center">
                      <X className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Move-Out */}
                <div className="col-span-2 flex justify-center">
                  {item.moveInOut ? (
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center">
                      <X className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Pro Tip Box */}
          <div className="p-5 bg-blue-50/80 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-700 shrink-0" />
              <p className="text-xs text-blue-950">
                <strong>First Time With Us?</strong> We recommend starting with a <strong>Luxury Deep Clean</strong> to establish your home&apos;s baseline sparkle, then switching to bi-weekly maintenance.
              </p>
            </div>

            <a
              href="#book-now"
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <span>Book Deep Clean</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
