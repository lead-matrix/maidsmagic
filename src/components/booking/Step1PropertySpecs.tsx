"use client";

import { SERVICES_CATALOG } from "@/lib/constants/riverside-data";
import { Sparkles, ShieldCheck, Home, BedDouble, Zap, Minus, Plus } from "lucide-react";

interface Step1Props {
  serviceSlug: string;
  setServiceSlug: (slug: string) => void;
  squareFootage: number;
  setSquareFootage: (sqft: number) => void;
  bedrooms: number;
  setBedrooms: (beds: number) => void;
  bathrooms: number;
  setBathrooms: (baths: number) => void;
  halfBathrooms: number;
  setHalfBathrooms: (halfBaths: number) => void;
  onNext: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-emerald-600" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
  Home: <Home className="w-5 h-5 text-emerald-600" />,
  BedDouble: <BedDouble className="w-5 h-5 text-emerald-600" />,
  Zap: <Zap className="w-5 h-5 text-amber-500" />,
};

export function Step1PropertySpecs({
  serviceSlug,
  setServiceSlug,
  squareFootage,
  setSquareFootage,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  halfBathrooms,
  setHalfBathrooms,
  onNext,
}: Step1Props) {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* 1. Cleaning Service Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-900">
          1. Select Cleaning Service Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES_CATALOG.map((service) => {
            const isSelected = serviceSlug === service.slug;

            return (
              <button
                key={service.slug}
                type="button"
                onClick={() => setServiceSlug(service.slug)}
                className={`text-left p-4 rounded-xl border-2 transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/70 shadow-md ring-1 ring-emerald-600"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-emerald-600" />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-white border border-slate-100 shadow-xs">
                      {iconMap[service.iconName] || <Sparkles className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                      From ${service.basePrice}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{service.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{service.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Square Footage Slider */}
      <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-bold text-slate-900 block">
              2. Home Square Footage
            </label>
            <p className="text-xs text-slate-500">Approximate interior heated living area</p>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs font-mono font-bold text-base text-emerald-800">
            {squareFootage.toLocaleString()} sq ft
          </div>
        </div>

        <input
          type="range"
          min={500}
          max={6000}
          step={50}
          value={squareFootage}
          onChange={(e) => setSquareFootage(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
        />

        <div className="flex justify-between text-[11px] text-slate-400 font-medium">
          <span>500 sq ft (Studio/Condo)</span>
          <span>2,200 sq ft (Riverside Avg)</span>
          <span>6,000+ sq ft (Estate)</span>
        </div>
      </div>

      {/* 3. Bedrooms & Bathrooms Steppers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Bedrooms */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
          <div className="mb-3">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Bedrooms</span>
            <p className="text-lg font-bold text-slate-900">{bedrooms} {bedrooms === 1 ? "Bedroom" : "Bedrooms"}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
              disabled={bedrooms <= 1}
              className="w-9 h-9 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-base w-6 text-center">{bedrooms}</span>
            <button
              type="button"
              onClick={() => setBedrooms(Math.min(8, bedrooms + 1))}
              className="w-9 h-9 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100 text-slate-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Full Bathrooms */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
          <div className="mb-3">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Full Baths</span>
            <p className="text-lg font-bold text-slate-900">{bathrooms} {bathrooms === 1 ? "Full Bath" : "Full Baths"}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
              disabled={bathrooms <= 1}
              className="w-9 h-9 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-base w-6 text-center">{bathrooms}</span>
            <button
              type="button"
              onClick={() => setBathrooms(Math.min(7, bathrooms + 1))}
              className="w-9 h-9 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100 text-slate-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Half Baths / Powder Rooms */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
          <div className="mb-3">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Half Baths</span>
            <p className="text-lg font-bold text-slate-900">{halfBathrooms} {halfBathrooms === 1 ? "Half Bath" : "Half Baths"}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setHalfBathrooms(Math.max(0, halfBathrooms - 1))}
              disabled={halfBathrooms <= 0}
              className="w-9 h-9 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-base w-6 text-center">{halfBathrooms}</span>
            <button
              type="button"
              onClick={() => setHalfBathrooms(Math.min(5, halfBathrooms + 1))}
              className="w-9 h-9 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100 text-slate-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Continue Action */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
        >
          Continue to Luxury Add-Ons →
        </button>
      </div>
    </div>
  );
}
