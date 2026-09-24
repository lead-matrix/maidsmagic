"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink, ShieldCheck, CheckCircle2, MapPin } from "lucide-react";
import { VERIFIED_GOOGLE_REVIEWS, RIVERSIDE_COMPANY_INFO } from "@/lib/constants/riverside-data";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

export function VerifiedGoogleReviews() {
  return (
    <section id="reviews" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Include Schema.org JSON-LD structured data for Google Search Snippets */}
      <LocalBusinessJsonLd />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs font-bold shadow-xs">
            {/* Google G Colors Mini Representation */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Google Verified Business Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Loved By Homeowners Across Riverside
          </h2>

          {/* Rating Summary Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-slate-900 font-bold text-base font-mono">
              {RIVERSIDE_COMPANY_INFO.aggregateRating.ratingValue} / 5.0
            </span>
            <span className="text-slate-500 text-sm">
              ({RIVERSIDE_COMPANY_INFO.aggregateRating.reviewCount} Verified Client Reviews)
            </span>
            <a
              href={RIVERSIDE_COMPANY_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full hover:underline transition-all"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Reviews Grid (Desktop 3-Column / Mobile Horizontal Snap Scroll) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {VERIFIED_GOOGLE_REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-emerald-400/80 hover:ring-1 hover:ring-emerald-400/40"
            >
              <div>
                {/* Header of review card */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                      alt={review.author}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">
                          {review.author}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                        <span>{review.neighborhood}</span>
                      </div>
                    </div>
                  </div>

                  {/* Google Verified Checkmark Badge */}
                  <a
                    href={review.verifiedSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Verified Google Customer"
                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center gap-1 text-[10px] font-bold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                    <span className="hidden sm:inline">Verified</span>
                  </a>
                </div>

                {/* Star Rating & Service Tag */}
                <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {review.serviceType}
                  </span>
                </div>

                {/* Review Body Text */}
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Posted {review.date}</span>
                <a
                  href={review.verifiedSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Google Review</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom GMB Info Card */}
        <div className="mt-14 max-w-2xl mx-auto p-6 rounded-3xl bg-gradient-to-r from-emerald-900 to-slate-950 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Official Riverside Google Business Profile
            </span>
            <p className="text-sm text-slate-200">
              1405 Spruce St, Riverside, CA 92507 • Phone: (951) 697-9000
            </p>
          </div>

          <a
            href={RIVERSIDE_COMPANY_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-2 shadow-md transition-all"
          >
            <span>Open Google Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
