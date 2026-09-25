"use client";

import { useState } from "react";
import { Sparkles, ArrowLeftRight, CheckCircle2 } from "lucide-react";

interface TransformationTab {
  id: string;
  title: string;
  room: string;
  beforeImg: string;
  afterImg: string;
  neighborhood: string;
  description: string;
  badge: string;
}

const TRANSFORMATIONS: TransformationTab[] = [
  {
    id: "kitchen",
    title: "Gourmet Kitchen & Stovetop",
    room: "Chef Kitchen & Range Hood",
    // Unsplash high quality realistic before (lived-in/greasy cookware & cluttered counters) vs after (gleaming marble & polished stainless steel)
    beforeImg: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80",
    afterImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
    neighborhood: "Canyon Crest Estate",
    description: "Deep degreasing of marble island counters, stainless steel range hood scrubbed, brass hardware polished, and backsplash grout detailed.",
    badge: "Grease & Grime Extraction",
  },
  {
    id: "bath",
    title: "Master Spa Bathroom & Shower",
    room: "Enclosed Glass & Tile Shower",
    beforeImg: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80",
    afterImg: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&auto=format&fit=crop&q=80",
    neighborhood: "Hawarden Hills Residence",
    description: "Removed stubborn Riverside hard-water scale and soap scum from floor-to-ceiling glass enclosure and hand-scrubbed porous travertine grout.",
    badge: "Hard Water Mineral Descale",
  },
  {
    id: "living",
    title: "Living Room & Hardwood",
    room: "Crown Moldings & Floors",
    beforeImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80",
    afterImg: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80",
    neighborhood: "Wood Streets Craftsman",
    description: "HEPA 4-stage pet fur extraction, electrostatic dusting of delicate vintage crown moldings, and warm eco wood buffing.",
    badge: "HEPA Pet Fur & Dust Detail",
  },
  {
    id: "turnover",
    title: "Move-Out Vacant Turnover",
    room: "Empty Apartment Suite",
    beforeImg: "https://images.unsplash.com/photo-1502005229762-ee10234b7214?w=1200&auto=format&fit=crop&q=80",
    afterImg: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
    neighborhood: "Orangecrest Property",
    description: "Full deposit-ready white glove clean. Inside empty closets, wiped blinds, vacuumed baseboards, and sanitized windows.",
    badge: "100% Deposit Guarantee",
  },
];

export function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<string>("kitchen");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const current = TRANSFORMATIONS.find((t) => t.id === activeTab) || TRANSFORMATIONS[0];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section id="transformations" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Blue Glows */}
      <div className="absolute -top-40 right-10 w-96 h-96 bg-blue-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Actual Riverside Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Before & After Sparkle Gallery
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Drag the slider horizontally to reveal the MaidsMagic white-glove transformation on real Riverside properties.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 flex-wrap">
          {TRANSFORMATIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(item.id);
                setSliderPosition(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 ring-2 ring-blue-400"
                  : "bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
              }`}
            >
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-900/60 aspect-[16/10] sm:aspect-[16/9] select-none">
            {/* "AFTER" Image (Cleaned & Sparkling) */}
            <img
              src={current.afterImg}
              alt={`${current.title} After MaidsMagic Clean`}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* "BEFORE" Image (Messy / Dirty / Cluttered) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={current.beforeImg}
                alt={`${current.title} Before Clean`}
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: "100%", height: "100%", filter: "contrast(0.95) saturate(0.85) brightness(0.88)" }}
              />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.9)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag Handle Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-slate-950 border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-2xl">
                <ArrowLeftRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute top-4 left-4 z-30 pointer-events-none">
              <span className="px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md text-slate-300 border border-slate-700 text-xs font-bold uppercase tracking-wider">
                Before: Accumulated Grime
              </span>
            </div>
            <div className="absolute top-4 right-4 z-30 pointer-events-none">
              <span className="px-3 py-1.5 rounded-full bg-blue-950/90 backdrop-blur-md text-blue-200 border border-blue-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>After: MaidsMagic Pristine</span>
              </span>
            </div>

            {/* Invisible native range input overlay */}
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPosition}
              onChange={handleSliderChange}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
              aria-label="Before and after slider"
            />
          </div>

          {/* Context Details Below Slider */}
          <div className="mt-6 p-5 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {current.neighborhood}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-blue-300 font-bold bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  {current.badge}
                </span>
              </div>
              <p className="text-sm text-slate-200 mt-1">{current.description}</p>
            </div>

            <a
              href="#book-now"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 shadow-md transition-colors"
            >
              Get This Transformation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
