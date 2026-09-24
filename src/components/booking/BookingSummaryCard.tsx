"use client";

import { PricingCalculationResult } from "@/lib/utils/pricing-calculator";
import { Sparkles, Clock, ShieldCheck, CheckCircle2, Phone, Tag } from "lucide-react";
import { RIVERSIDE_COMPANY_INFO } from "@/lib/constants/riverside-data";

interface SummaryCardProps {
  quote: PricingCalculationResult;
  currentStep: number;
}

export function BookingSummaryCard({ quote, currentStep }: SummaryCardProps) {
  return (
    <div className="sticky top-24 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 shadow-2xl border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
            Live Riverside Quote
          </span>
          <h3 className="text-lg font-serif font-bold text-white mt-0.5">
            {quote.serviceTitle}
          </h3>
        </div>
        <div className="p-2 rounded-xl bg-emerald-900/60 border border-emerald-700/50 text-amber-300">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      {/* Duration & Crew Estimate */}
      <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="text-slate-400 block text-[10px]">Estimated Time</span>
            <span className="font-bold text-slate-200 font-mono">~{quote.estimatedHours} Hours</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="text-slate-400 block text-[10px]">Crew Tier</span>
            <span className="font-bold text-slate-200">White-Glove Elite</span>
          </div>
        </div>
      </div>

      {/* Itemized Breakdown */}
      <div className="space-y-2.5 text-xs text-slate-300">
        <div className="flex justify-between items-center py-1">
          <span className="text-slate-400">Base Service Package</span>
          <span className="font-mono text-slate-200">${quote.basePrice.toFixed(2)}</span>
        </div>

        {quote.sqftAdjustment > 0 && (
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">Square Footage Scope</span>
            <span className="font-mono text-slate-200">+${quote.sqftAdjustment.toFixed(2)}</span>
          </div>
        )}

        {quote.bedroomsAdjustment > 0 && (
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">Bedrooms Sanitization</span>
            <span className="font-mono text-slate-200">+${quote.bedroomsAdjustment.toFixed(2)}</span>
          </div>
        )}

        {quote.bathroomsAdjustment > 0 && (
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">Bathrooms & Grout Deep Clean</span>
            <span className="font-mono text-slate-200">+${quote.bathroomsAdjustment.toFixed(2)}</span>
          </div>
        )}

        {/* Selected Add-ons */}
        {quote.addOnsList.length > 0 && (
          <div className="pt-2 border-t border-slate-800 space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
              Selected Add-Ons ({quote.addOnsList.length})
            </span>
            {quote.addOnsList.map((addon) => (
              <div key={addon.slug} className="flex justify-between items-center text-slate-300">
                <span className="truncate pr-2">• {addon.name}</span>
                <span className="font-mono text-slate-200 shrink-0">+${addon.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Subtotal */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-800 font-semibold text-slate-200">
          <span>Subtotal</span>
          <span className="font-mono">${quote.subtotal.toFixed(2)}</span>
        </div>

        {/* Frequency Discount */}
        {quote.discountAmount > 0 && (
          <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-semibold">
            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Recurring Savings ({quote.frequencyDiscountPercent}%)</span>
            </div>
            <span className="font-mono">-${quote.discountAmount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Final Total */}
      <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
        <div>
          <span className="text-xs text-slate-400 block font-medium">Guaranteed Price</span>
          <span className="text-[11px] text-emerald-400 font-medium">All taxes & supplies included</span>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold font-mono text-amber-300">
            ${quote.finalTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Trust Guarantee Box */}
      <div className="space-y-2 pt-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Pay after job completion</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>$2,000,000 Liability policy protection</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Riverside, CA based specialists</span>
        </div>
      </div>

      {/* Phone assistance */}
      <div className="pt-3 border-t border-slate-800/80 text-center">
        <a
          href={`tel:${RIVERSIDE_COMPANY_INFO.phone}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-300 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Questions? Call {RIVERSIDE_COMPANY_INFO.phoneFormatted}</span>
        </a>
      </div>
    </div>
  );
}
