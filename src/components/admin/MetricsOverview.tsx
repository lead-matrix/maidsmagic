"use client";

import { BookingLead, QuoteLead } from "@/lib/types";
import { DollarSign, Calendar, Users, TrendingUp, Sparkles, MapPin } from "lucide-react";

interface MetricsOverviewProps {
  bookings: BookingLead[];
  quotes: QuoteLead[];
}

export function MetricsOverview({ bookings, quotes }: MetricsOverviewProps) {
  const totalRevenue = bookings.reduce((sum, b) => sum + b.finalTotal, 0);
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const activeJobsCount = bookings.filter((b) => b.status === "dispatched" || b.status === "in_progress").length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;
  const avgOrderValue = bookings.length > 0 ? totalRevenue / bookings.length : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Revenue Pipeline */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Booking Revenue
          </span>
          <p className="text-2xl font-bold font-mono text-emerald-900 mt-1">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>Across {bookings.length} Riverside Orders</span>
          </span>
        </div>
        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>

      {/* 2. Pending Review / Dispatch Queue */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Pending Dispatch
          </span>
          <p className="text-2xl font-bold font-mono text-amber-600 mt-1">
            {pendingCount} Leads
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {activeJobsCount} currently on-site in Riverside
          </span>
        </div>
        <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
          <Calendar className="w-6 h-6" />
        </div>
      </div>

      {/* 3. Average Ticket Size */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Avg Clean Value
          </span>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
            ${avgOrderValue.toFixed(2)}
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Luxury Deep Clean + Add-Ons
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
          <Sparkles className="w-6 h-6 text-emerald-600" />
        </div>
      </div>

      {/* 4. Riverside Crew Capacity */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Specialist Crews
          </span>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
            4 Active Teams
          </p>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>Riverside Zip Coverage 100%</span>
          </span>
        </div>
        <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
          <Users className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
