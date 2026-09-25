"use client";

import { BookingLead, QuoteLead } from "@/lib/types";
import { Calendar, Users, TrendingUp, Sparkles, MapPin, Clock, ShieldCheck } from "lucide-react";

interface MetricsOverviewProps {
  bookings: BookingLead[];
  quotes: QuoteLead[];
}

export function MetricsOverview({ bookings, quotes }: MetricsOverviewProps) {
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const activeJobsCount = bookings.filter((b) => b.status === "dispatched" || b.status === "in_progress").length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;
  const totalHours = bookings.reduce((sum, b) => sum + (b.estimatedHours || 3.5), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Active Bookings */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Riverside Bookings
          </span>
          <p className="text-2xl font-bold font-mono text-blue-900 mt-1">
            {bookings.length} Total Orders
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] text-blue-700 font-medium mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>{completedCount} Completed This Month</span>
          </span>
        </div>
        <div className="p-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
          <Calendar className="w-6 h-6" />
        </div>
      </div>

      {/* 2. Pending Dispatch */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Dispatch Queue
          </span>
          <p className="text-2xl font-bold font-mono text-amber-600 mt-1">
            {pendingCount} Pending Leads
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {activeJobsCount} currently on-site in Riverside
          </span>
        </div>
        <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
          <ShieldCheck className="w-6 h-6" />
        </div>
      </div>

      {/* 3. Dedicated Hours Booked */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Hours Scheduled
          </span>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
            ~{totalHours.toFixed(1)} Hours
          </p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            White-Glove Deep Scope
          </span>
        </div>
        <div className="p-3 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
          <Clock className="w-6 h-6 text-blue-700" />
        </div>
      </div>

      {/* 4. Specialist Crew Coverage */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Specialist Crews
          </span>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
            4 Active Teams
          </p>
          <span className="text-[11px] text-blue-700 font-medium mt-1 flex items-center gap-1">
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
