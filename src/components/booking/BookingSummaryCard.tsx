"use client";

import { Sparkles, Clock, ShieldCheck, CheckCircle2, Phone, Tag, Check, Award } from "lucide-react";
import { RIVERSIDE_COMPANY_INFO, SERVICES_CATALOG, ADDONS_CATALOG } from "@/lib/constants/riverside-data";
import { CleaningFrequency } from "@/lib/types";

interface SummaryCardProps {
  serviceSlug: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  halfBathrooms: number;
  selectedAddOns: string[];
  frequency: CleaningFrequency;
  estimatedHours: number;
}

export function BookingSummaryCard({
  serviceSlug,
  squareFootage,
  bedrooms,
  bathrooms,
  halfBathrooms,
  selectedAddOns,
  frequency,
  estimatedHours,
}: SummaryCardProps) {
  const service =
    SERVICES_CATALOG.find((s) => s.slug === serviceSlug) || SERVICES_CATALOG[0];

  const selectedAddOnItems = selectedAddOns
    .map((slug) => ADDONS_CATALOG.find((a) => a.slug === slug))
    .filter(Boolean);

  const frequencyLabels: Record<CleaningFrequency, string> = {
    weekly: "Weekly Standing Schedule",
    bi_weekly: "Bi-Weekly Care (Most Popular)",
    monthly: "Monthly Deep Refresh",
    one_time: "One-Time Clean",
  };

  return (
    <div className="sticky top-24 rounded-3xl bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 text-white p-6 sm:p-7 shadow-2xl border border-blue-900/60 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-blue-900/80">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-blue-300 font-bold">
            Custom Plan Overview
          </span>
          <h3 className="text-lg font-serif font-bold text-white mt-0.5">
            {service.title}
          </h3>
        </div>
        <div className="p-2 rounded-xl bg-blue-900/80 border border-blue-700/50 text-amber-300">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      {/* Scope Estimate Grid */}
      <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400 shrink-0" />
          <div>
            <span className="text-slate-400 block text-[10px]">Estimated Duration</span>
            <span className="font-bold text-slate-200 font-mono">~{estimatedHours} Hours</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="text-slate-400 block text-[10px]">Specialist Tier</span>
            <span className="font-bold text-slate-200">White-Glove Elite</span>
          </div>
        </div>
      </div>

      {/* Itemized Inclusions (No Dollar Signs) */}
      <div className="space-y-2.5 text-xs text-slate-300">
        <div className="flex justify-between items-center py-1">
          <span className="text-slate-400">Living Area Scope</span>
          <span className="font-mono text-slate-200">{squareFootage.toLocaleString()} sq ft</span>
        </div>

        <div className="flex justify-between items-center py-1">
          <span className="text-slate-400">Bedrooms Cleaned</span>
          <span className="font-mono text-slate-200">{bedrooms} {bedrooms === 1 ? "Room" : "Rooms"}</span>
        </div>

        <div className="flex justify-between items-center py-1">
          <span className="text-slate-400">Bathrooms & Grout</span>
          <span className="font-mono text-slate-200">
            {bathrooms} Full {halfBathrooms > 0 ? `+ ${halfBathrooms} Half` : ""}
          </span>
        </div>

        <div className="flex justify-between items-center py-1">
          <span className="text-slate-400">Frequency Schedule</span>
          <span className="font-semibold text-blue-300">{frequencyLabels[frequency]}</span>
        </div>

        {/* Selected Focus Add-ons */}
        {selectedAddOnItems.length > 0 && (
          <div className="pt-2 border-t border-slate-800 space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
              Focus Add-Ons ({selectedAddOnItems.length})
            </span>
            {selectedAddOnItems.map((addon) => (
              <div key={addon?.slug} className="flex justify-between items-center text-slate-300">
                <span className="truncate pr-2">• {addon?.name}</span>
                <span className="text-[10px] text-blue-400 font-semibold shrink-0">Included</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Free Instant Confirmation & Zero Payment Banner */}
      <div className="p-3.5 rounded-2xl bg-blue-900/50 border border-blue-700/60 space-y-1 text-center">
        <span className="text-xs font-bold text-amber-300 block flex items-center justify-center gap-1.5">
          <Award className="w-4 h-4" />
          <span>100% Free Booking Hold</span>
        </span>
        <p className="text-[11px] text-blue-200">
          No credit card needed to secure your spot. Pay after completion.
        </p>
      </div>

      {/* Trust Guarantee Box */}
      <div className="space-y-2 pt-1 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Pay only after 100% satisfaction</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>$2,000,000 Liability policy protection</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Verified Riverside, CA local crews</span>
        </div>
      </div>

      {/* Phone assistance */}
      <div className="pt-3 border-t border-slate-800/80 text-center">
        <a
          href={`tel:${RIVERSIDE_COMPANY_INFO.phone}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-300 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Questions? Call {RIVERSIDE_COMPANY_INFO.phoneFormatted}</span>
        </a>
      </div>
    </div>
  );
}
