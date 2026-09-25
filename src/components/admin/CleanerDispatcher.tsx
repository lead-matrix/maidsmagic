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
  Plus,
} from "lucide-react";

interface CleanerDispatcherProps {
  bookings: BookingLead[];
}

export function CleanerDispatcher({ bookings }: CleanerDispatcherProps) {
  const [cleaners, setCleaners] = useState<CleanerSpecialist[]>(CLEANING_SPECIALISTS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Specialist Form
  const [newFullName, setNewFullName] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newZipCodes, setNewZipCodes] = useState("92506, 92508, 92501");

  const toggleCleanerActive = (id: string) => {
    setCleaners((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleAddSpecialist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone) return;

    const zips = newZipCodes.split(",").map((z) => z.trim()).filter(Boolean);
    const newSpecialist: CleanerSpecialist = {
      id: `cl-${Date.now()}`,
      fullName: newFullName,
      teamName: newTeamName || "Riverside White-Glove Specialist",
      phone: newPhone,
      email: newEmail || "specialist@maidsmagicriverside.com",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5.0,
      completedJobs: 0,
      assignedZipCodes: zips.length > 0 ? zips : ["92506", "92507"],
      specialty: newSpecialty || "Deep Clean & Luxury Detailing",
      isActive: true,
    };

    setCleaners([...cleaners, newSpecialist]);
    setShowAddModal(false);
    setNewFullName("");
    setNewTeamName("");
    setNewPhone("");
    setNewEmail("");
    setNewSpecialty("");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-900/60">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Riverside Crew Operations & Dispatch
          </span>
          <h3 className="text-xl font-serif font-bold text-white mt-1">
            Verified Cleaning Specialists & Crew Roster
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            All specialists hold active $2M liability insurance bonding and 100% background clearance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Specialist</span>
          </button>
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
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                          On Duty
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold">
                          Off Duty
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-blue-800 mt-0.5">
                      {cleaner.teamName}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{cleaner.rating}</span>
                      <span className="text-slate-400 font-normal">
                        ({cleaner.completedJobs} completed cleans)
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
                      : "bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200"
                  }`}
                >
                  {cleaner.isActive ? "Set Off Duty" : "Activate"}
                </button>
              </div>

              {/* Specialty */}
              <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-950">
                <span className="font-bold text-blue-900 block text-[11px]">Primary Specialty:</span>
                <p className="mt-0.5">{cleaner.specialty || "Luxury Residential & Commercial Reset"}</p>
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
                  <span className="font-bold text-blue-800">{assignedJobs.length} active</span>
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
                        <span className="font-bold text-blue-800 text-[11px]">
                          ~{job.estimatedHours || 3.5} hrs
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
                  className="flex items-center gap-1.5 hover:text-blue-700 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-700" />
                  <span>{cleaner.phone}</span>
                </a>
                <span className="text-slate-400">{cleaner.email}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Specialist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Onboard Cleaning Specialist
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSpecialist} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Rodriguez"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Team / Lead Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Sapphire Lead Crew"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="(951) 697-9005"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Primary Cleaning Specialty</label>
                <input
                  type="text"
                  placeholder="e.g. Canyon Crest Marble Care & Deep Cleans"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assigned Riverside Zip Codes (comma separated)</label>
                <input
                  type="text"
                  placeholder="92506, 92508, 92501"
                  value={newZipCodes}
                  onChange={(e) => setNewZipCodes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-700 text-white font-bold"
                >
                  Save Specialist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
