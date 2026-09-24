"use client";

import { ADDONS_CATALOG } from "@/lib/constants/riverside-data";
import { Flame, Refrigerator, Maximize2, Dog, Layers, Archive, Leaf, Sun, Check, ArrowLeft } from "lucide-react";

interface Step2Props {
  selectedAddOns: string[];
  toggleAddOn: (slug: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Flame: <Flame className="w-5 h-5 text-amber-500" />,
  Refrigerator: <Refrigerator className="w-5 h-5 text-sky-500" />,
  Maximize2: <Maximize2 className="w-5 h-5 text-blue-500" />,
  Dog: <Dog className="w-5 h-5 text-orange-500" />,
  Layers: <Layers className="w-5 h-5 text-emerald-600" />,
  Archive: <Archive className="w-5 h-5 text-indigo-500" />,
  Leaf: <Leaf className="w-5 h-5 text-emerald-600" />,
  Sun: <Sun className="w-5 h-5 text-amber-500" />,
};

export function Step2AddOnSelector({
  selectedAddOns,
  toggleAddOn,
  onBack,
  onNext,
}: Step2Props) {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Select Luxury Deep Clean Add-Ons
            </h3>
            <p className="text-xs text-slate-500">
              Customize your booking with individual focus areas.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
            {selectedAddOns.length} Selected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {ADDONS_CATALOG.map((addon) => {
          const isSelected = selectedAddOns.includes(addon.slug);

          return (
            <button
              key={addon.slug}
              type="button"
              onClick={() => toggleAddOn(addon.slug)}
              className={`p-4 rounded-xl border-2 text-left transition-all relative flex items-start gap-3.5 ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50/60 shadow-sm ring-1 ring-emerald-600"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                  isSelected
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {isSelected ? (
                  <Check className="w-5 h-5 text-white stroke-[3]" />
                ) : (
                  iconMap[addon.iconName] || <Flame className="w-5 h-5 text-emerald-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{addon.name}</h4>
                  <span className="font-mono font-bold text-emerald-800 text-sm shrink-0">
                    +${addon.price}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {addon.description}
                </p>
                {addon.estimatedMinutes > 0 && (
                  <span className="inline-block text-[10px] font-semibold text-slate-400 mt-1.5">
                    +~{addon.estimatedMinutes} mins detail
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Specs</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
        >
          Continue to Schedule & Contact →
        </button>
      </div>
    </div>
  );
}
