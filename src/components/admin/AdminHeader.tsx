"use client";

import Link from "next/link";
import { Sparkles, Phone, ExternalLink, RefreshCw, Bell, Shield, MapPin } from "lucide-react";
import { RIVERSIDE_COMPANY_INFO } from "@/lib/constants/riverside-data";

interface AdminHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function AdminHeader({ onRefresh, isRefreshing }: AdminHeaderProps) {
  return (
    <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Portal Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center font-serif font-bold text-amber-300 shadow-md">
              MM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-white">MaidsMagic</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-700/60">
                  Command Center
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Riverside Dispatch & Operations Hub</p>
            </div>
          </Link>
        </div>

        {/* Location & Status Indicator */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Riverside Hub (1405 Spruce St)</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Dispatch Active</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onRefresh}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Refresh Leads and Chats"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-amber-400" : ""}`} />
            <span>Sync Live</span>
          </button>

          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            target="_blank"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
