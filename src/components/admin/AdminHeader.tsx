"use client";

import Link from "next/link";
import { Sparkles, Phone, ExternalLink, RefreshCw, Bell, Shield, MapPin, Download, Plus } from "lucide-react";
import { RIVERSIDE_COMPANY_INFO } from "@/lib/constants/riverside-data";

interface AdminHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
  onExportCsv?: () => void;
}

export function AdminHeader({ onRefresh, isRefreshing, onExportCsv }: AdminHeaderProps) {
  return (
    <header className="bg-slate-950 text-white border-b border-blue-950 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Portal Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-white p-0.5 shadow-md border-2 border-blue-400 flex items-center justify-center">
              <img
                src="/images/maidsmagic-logo.jpg"
                alt="MaidsMagic Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg text-white">MaidsMagic</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-900/90 text-blue-200 text-[10px] font-bold uppercase tracking-wider border border-blue-700/60">
                  All-In-One CRM
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Riverside Dispatch & Operations Hub</p>
            </div>
          </Link>
        </div>

        {/* Location & Status Indicator */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>1405 Spruce St, Riverside CA</span>
          </div>

          <div className="flex items-center gap-1.5 text-blue-300 bg-blue-950/80 px-3 py-1.5 rounded-xl border border-blue-800/80">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Live CRM Dispatch Active</span>
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
            <span>Sync CRM</span>
          </button>

          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            target="_blank"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
