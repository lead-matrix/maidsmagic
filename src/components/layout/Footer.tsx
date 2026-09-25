import Link from "next/link";
import { Phone, Mail, MapPin, Sparkles, Shield, Clock, Award, ArrowUpRight } from "lucide-react";
import { RIVERSIDE_COMPANY_INFO, RIVERSIDE_NEIGHBORHOODS } from "@/lib/constants/riverside-data";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-md border-2 border-blue-400/40 flex items-center justify-center">
                <img
                  src="/images/maidsmagic-logo.jpg"
                  alt="MaidsMagic Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-white tracking-tight">
                  Maids<span className="text-blue-400 font-sans">Magic</span>
                </span>
                <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">
                  Riverside White-Glove Specialists
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Riverside&apos;s premier white-glove residential & turnover cleaning service. We deliver immaculate sanctuaries using certified eco-safe methods and vetted local cleaning specialists.
            </p>

            <div className="space-y-2.5 pt-2 text-sm">
              <a
                href={RIVERSIDE_COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-slate-300 hover:text-blue-400 transition-colors group"
              >
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{RIVERSIDE_COMPANY_INFO.address}</span>
              </a>

              <a
                href={`tel:${RIVERSIDE_COMPANY_INFO.phone}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{RIVERSIDE_COMPANY_INFO.phoneFormatted}</span>
              </a>

              <div className="flex items-center gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon–Sat: 7:30 AM – 7:00 PM | Sun: 8:30 AM – 5:00 PM</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>$2,000,000 Insured & Bonded</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Sparkle Guarantee</span>
              </div>
            </div>
          </div>

          {/* Cleaning Services Column */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 text-blue-400">
              Cleaning Packages
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#book-now" className="hover:text-blue-400 transition-colors">
                  Luxury Deep Clean
                </Link>
              </li>
              <li>
                <Link href="/#book-now" className="hover:text-blue-400 transition-colors">
                  Standard Maintenance Clean
                </Link>
              </li>
              <li>
                <Link href="/#book-now" className="hover:text-blue-400 transition-colors">
                  Move-In / Move-Out Turnover
                </Link>
              </li>
              <li>
                <Link href="/#book-now" className="hover:text-blue-400 transition-colors">
                  Airbnb & Vacation Rental Prep
                </Link>
              </li>
              <li>
                <Link href="/#book-now" className="hover:text-blue-400 transition-colors">
                  Urgent Same-Day Clean
                </Link>
              </li>
              <li>
                <Link href="/#book-now" className="hover:text-blue-400 transition-colors">
                  Pet Hair Extraction Detail
                </Link>
              </li>
            </ul>
          </div>

          {/* Riverside Service Neighborhoods */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 text-blue-400">
              Riverside Zones
            </h3>
            <ul className="space-y-2.5 text-sm">
              {RIVERSIDE_NEIGHBORHOODS.slice(0, 6).map((n) => (
                <li key={n.name}>
                  <Link href="/#neighborhoods" className="hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{n.name}</span>
                    <span className="text-[11px] text-slate-500">{n.zip.split(" ")[0]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & CRM */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 text-blue-400">
              Explore & CRM
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#book-now" className="hover:text-blue-400 transition-colors">
                  Custom Booking Engine
                </Link>
              </li>
              <li>
                <Link href="/#transformations" className="hover:text-blue-400 transition-colors">
                  Before & After Slider
                </Link>
              </li>
              <li>
                <Link href="/#checklist" className="hover:text-blue-400 transition-colors">
                  Cleaning Scope Checklist
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-blue-400 transition-colors">
                  Google Verified Reviews (4.96★)
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>Admin CRM & Dispatcher</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MaidsMagic LLC. 1405 Spruce St, Riverside, CA 92507. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Riverside, California</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
