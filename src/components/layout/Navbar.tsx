"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Sparkles, Shield, Menu, X, ArrowRight, LayoutDashboard, Star } from "lucide-react";
import { RIVERSIDE_COMPANY_INFO } from "@/lib/constants/riverside-data";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Notification Trust Strip */}
      <div className="bg-slate-950 text-slate-100 text-xs py-2 px-4 border-b border-blue-950/80 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/90 text-blue-200 border border-blue-700/60">
              Riverside HQ
            </span>
            <span className="text-slate-300 font-medium hidden sm:inline">
              1405 Spruce St, Riverside, CA 92507
            </span>
            <span className="text-blue-400 font-semibold">• 100% Sparkle Satisfaction Guarantee</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.96/5.0 Google Rating</span>
            </div>
            <a
              href={`tel:${RIVERSIDE_COMPANY_INFO.phone}`}
              className="flex items-center gap-1.5 text-white hover:text-blue-300 font-semibold group transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>{RIVERSIDE_COMPANY_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Luxury Glass Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-blue-100 py-2.5"
            : "bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-white shadow-md border-2 border-blue-200 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
              <img
                src="/images/maidsmagic-logo.jpg"
                alt="MaidsMagic Logo"
                className="w-full h-full object-contain"
              />
              <Sparkles className="w-3.5 h-3.5 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-serif font-black text-xl tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                  Maids<span className="text-blue-700 font-sans font-bold">Magic</span>
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-blue-700 font-bold">
                Riverside White-Glove Care
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <Link href="/#services" className="hover:text-blue-700 transition-colors">
              Services
            </Link>
            <Link href="/#book-now" className="hover:text-blue-700 transition-colors">
              Custom Booking
            </Link>
            <Link href="/#transformations" className="hover:text-blue-700 transition-colors">
              Before & After
            </Link>
            <Link href="/#neighborhoods" className="hover:text-blue-700 transition-colors">
              Riverside Zones
            </Link>
            <Link href="/#checklist" className="hover:text-blue-700 transition-colors">
              Checklist
            </Link>
            <Link href="/#reviews" className="hover:text-blue-700 transition-colors flex items-center gap-1">
              <span>Google Reviews</span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                5.0★
              </span>
            </Link>
          </nav>

          {/* Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-800 px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/60 transition-all"
              title="Dispatcher & CRM Portal"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-700" />
              <span>Admin CRM</span>
            </Link>

            <a
              href="/#book-now"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 hover:from-blue-700 hover:to-blue-500 text-white text-sm font-bold shadow-md shadow-blue-900/20 hover:shadow-lg hover:shadow-blue-900/30 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Book Your Clean</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/admin"
              className="p-2 text-slate-700 hover:text-blue-800 rounded-lg hover:bg-slate-100"
              aria-label="Admin CRM"
            >
              <LayoutDashboard className="w-5 h-5 text-blue-700" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-800 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-4 pb-6 mt-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-800">
              <Link
                href="/#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
              >
                Services
              </Link>
              <Link
                href="/#book-now"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
              >
                Custom Booking Engine
              </Link>
              <Link
                href="/#transformations"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
              >
                Before & After Gallery
              </Link>
              <Link
                href="/#neighborhoods"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
              >
                Riverside Service Zones
              </Link>
              <Link
                href="/#checklist"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
              >
                Cleaning Checklist Scope
              </Link>
              <Link
                href="/#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-800"
              >
                Verified Google Reviews (5.0★)
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-blue-50 text-blue-900 font-semibold flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-blue-700" />
                <span>Admin CRM & Dispatch Center</span>
              </Link>
            </nav>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${RIVERSIDE_COMPANY_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-50"
              >
                <Phone className="w-4 h-4 text-blue-700" />
                <span>Call {RIVERSIDE_COMPANY_INFO.phoneFormatted}</span>
              </a>
              <a
                href="/#book-now"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-900/20"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Book In 60 Seconds</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
