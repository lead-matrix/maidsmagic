"use client";

import { useState } from "react";
import { CLEANING_SPECIALISTS } from "@/lib/constants/riverside-data";
import { CleanerSpecialist, BookingLead } from "@/lib/types";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Calendar,
  Award,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface CleanerDispatcherProps {
  bookings: BookingLead[];
}

export function CleanerDispatcher({ bookings }: CleanerDispatcherProps) {
  const [cleaners, setCleaners] = useState<CleanerSpecialist[]>(CLEANING_SPECIALISTS);

  const toggleCleanerActive = (id: string) => {
    setCleaners((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Riverside Crew Operations
          </span>
          <h3 className="text-xl font-serif font-bold text-white mt-1">
            Verified Cleaning Specialists & Crew Roster
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            All specialists hold active $2M liability insurance bonding and 100% background clearance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-900/60 border border-emerald-700/50 text-xs">
            <span className="text-emerald-300 block font-semibold">Active Crews</span>
            <span className="text-lg font-bold text-white font-mono">
              {cleaners.filter((c) => c.isActive).length} / {cleaners.length}
            </span>
          </div>
        </div>
      </div>

      {/* Specialist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cleaners.map((cleaner) => {
          // Count assigned active jobs
          const assignedJobs = bookings.filter(
            (b) => b.cleanerId === cleaner.id && b.status !== "completed" && b.status !== "cancelled"
          );

          return (
            <div
              key={cleaner.id}
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                cleaner.isActive
                  ? "bg-white border-slate-200 shadow-sm hover:shadow-md"
                  : "bg-slate-50 border-slate-200 opacity-60"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={cleaner.avatarUrl}
                    alt={cleaner.fullName}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 leading-tight">
                        {cleaner.fullName}
                      </h4>
                      {cleaner.isActive ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          On Duty
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold">
                          Off Duty
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                      {cleaner.teamName}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{cleaner.rating}</span>
                      <span className="text-slate-400 font-normal">
                        ({cleaner.completedJobs} completed jobs)
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleCleanerActive(cleaner.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                    cleaner.isActive
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                      : "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200"
                  }`}
                >
                  {cleaner.isActive ? "Set Off Duty" : "Activate"}
                </button>
              </div>

              {/* Assigned Riverside Zip Codes */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Assigned Riverside Coverage Zones
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cleaner.assignedZipCodes.map((zip) => (
                    <span
                      key={zip}
                      className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-semibold"
                    >
                      {zip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Active Jobs Pipeline */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Currently Assigned Bookings:</span>
                  <span className="font-bold text-emerald-800">{assignedJobs.length} active</span>
                </div>

                {assignedJobs.length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic">No active dispatch orders</p>
                ) : (
                  <div className="space-y-1.5 pt-1">
                    {assignedJobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{job.customerName}</span>
                          <span className="text-slate-400 text-[10px] block">
                            {job.serviceDate} • {job.neighborhood}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-emerald-800 text-[11px]">
                          ${job.finalTotal.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <a
                  href={`tel:${cleaner.phone}`}
                  className="flex items-center gap-1.5 hover:text-emerald-700 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{cleaner.phone}</span>
                </a>
                <span className="text-slate-400">{cleaner.email}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
