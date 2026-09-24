"use client";

import { useState } from "react";
import { BookingLead, BookingStatus } from "@/lib/types";
import { CLEANING_SPECIALISTS } from "@/lib/constants/riverside-data";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Filter,
  Search,
  LayoutGrid,
  List,
} from "lucide-react";

interface LiveOrderBoardProps {
  bookings: BookingLead[];
  onUpdateStatus: (bookingId: string, newStatus: BookingStatus) => void;
  onAssignCleaner: (bookingId: string, cleanerId: string) => void;
}

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; colorClass: string; bgClass: string; borderClass: string }
> = {
  pending: {
    label: "Pending Review",
    colorClass: "text-amber-700",
    bgClass: "bg-amber-50",
    borderClass: "border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    colorClass: "text-blue-700",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-200",
  },
  dispatched: {
    label: "Crew Dispatched",
    colorClass: "text-purple-700",
    bgClass: "bg-purple-50",
    borderClass: "border-purple-200",
  },
  in_progress: {
    label: "In Progress",
    colorClass: "text-emerald-700",
    bgClass: "bg-emerald-50",
    borderClass: "border-emerald-200",
  },
  completed: {
    label: "Completed",
    colorClass: "text-slate-700",
    bgClass: "bg-slate-100",
    borderClass: "border-slate-300",
  },
  cancelled: {
    label: "Cancelled",
    colorClass: "text-red-700",
    bgClass: "bg-red-50",
    borderClass: "border-red-200",
  },
};

export function LiveOrderBoard({
  bookings,
  onUpdateStatus,
  onAssignCleaner,
}: LiveOrderBoardProps) {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [activeDetailsBooking, setActiveDetailsBooking] = useState<BookingLead | null>(null);

  // Filtering
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus =
      selectedStatusFilter === "all" || b.status === selectedStatusFilter;
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.zipCode.includes(searchQuery) ||
      (b.neighborhood && b.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const columns: BookingStatus[] = ["pending", "confirmed", "dispatched", "in_progress", "completed"];

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer, ref, zip code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none"
          />
        </div>

        {/* Filters & View Mode */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
          >
            <option value="all">All Statuses ({bookings.length})</option>
            <option value="pending">Pending ({bookings.filter((b) => b.status === "pending").length})</option>
            <option value="confirmed">Confirmed ({bookings.filter((b) => b.status === "confirmed").length})</option>
            <option value="dispatched">Dispatched ({bookings.filter((b) => b.status === "dispatched").length})</option>
            <option value="in_progress">In Progress ({bookings.filter((b) => b.status === "in_progress").length})</option>
            <option value="completed">Completed ({bookings.filter((b) => b.status === "completed").length})</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === "kanban"
                  ? "bg-white text-emerald-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === "table"
                  ? "bg-white text-emerald-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="List Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {columns.map((colStatus) => {
            const colBookings = filteredBookings.filter((b) => b.status === colStatus);
            const statusMeta = STATUS_CONFIG[colStatus];

            return (
              <div
                key={colStatus}
                className="bg-slate-100/70 rounded-2xl p-3.5 border border-slate-200/80 flex flex-col min-w-[260px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${statusMeta.colorClass}`}
                    >
                      {statusMeta.label}
                    </span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-white text-slate-700 text-xs font-bold flex items-center justify-center border border-slate-200 shadow-xs">
                    {colBookings.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[700px]">
                  {colBookings.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs italic border-2 border-dashed border-slate-200 rounded-xl">
                      No orders in this column
                    </div>
                  ) : (
                    colBookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3 text-xs"
                      >
                        {/* Reference & Total */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            {b.bookingReference}
                          </span>
                          <span className="font-mono font-bold text-slate-900 text-sm">
                            ${b.finalTotal.toFixed(2)}
                          </span>
                        </div>

                        {/* Customer & Neighborhood */}
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">
                            {b.customerName}
                          </h4>
                          <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>
                              {b.neighborhood || "Riverside"}, {b.zipCode}
                            </span>
                          </div>
                        </div>

                        {/* Specs & Service */}
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                          <span className="font-bold text-slate-800 block text-[11px]">
                            {b.serviceTitle}
                          </span>
                          <p className="text-[10px] text-slate-500">
                            {b.squareFootage} sq ft • {b.bedrooms} Bed / {b.bathrooms} Bath
                          </p>
                        </div>

                        {/* Date & Time */}
                        <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{b.serviceDate}</span>
                        </div>

                        {/* Assigned Cleaner Selector */}
                        <div>
                          <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                            Assigned Crew
                          </label>
                          <select
                            value={b.cleanerId || ""}
                            onChange={(e) => onAssignCleaner(b.id, e.target.value)}
                            className="w-full px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-800 focus:outline-none"
                          >
                            <option value="">-- Unassigned --</option>
                            {CLEANING_SPECIALISTS.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.fullName} ({c.teamName.split(" ")[0]})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Status Change Selector & Details Button */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <select
                            value={b.status}
                            onChange={(e) =>
                              onUpdateStatus(b.id, e.target.value as BookingStatus)
                            }
                            className={`px-2 py-1 rounded-lg font-bold text-[10px] border focus:outline-none ${statusMeta.bgClass} ${statusMeta.colorClass} ${statusMeta.borderClass}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => setActiveDetailsBooking(b)}
                            className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-900 hover:underline"
                          >
                            Details →
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List Table View */}
      {viewMode === "table" && (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Service & Specs</th>
                  <th className="p-4">Date & Slot</th>
                  <th className="p-4">Assigned Crew</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.map((b) => {
                  const statusMeta = STATUS_CONFIG[b.status];

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-mono font-bold text-emerald-800">
                        {b.bookingReference}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{b.customerName}</div>
                        <div className="text-[11px] text-slate-500">{b.customerPhone}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-800">{b.serviceTitle}</div>
                        <div className="text-[11px] text-slate-500">
                          {b.squareFootage} sqft • {b.bedrooms}B / {b.bathrooms}Ba • {b.neighborhood}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-slate-800 font-medium">{b.serviceDate}</div>
                        <div className="text-[10px] text-slate-400">{b.serviceTimeSlot.split(" ")[0]}</div>
                      </td>
                      <td className="p-4">
                        <select
                          value={b.cleanerId || ""}
                          onChange={(e) => onAssignCleaner(b.id, e.target.value)}
                          className="px-2 py-1 rounded bg-slate-50 border border-slate-200 text-xs"
                        >
                          <option value="">-- Unassigned --</option>
                          {CLEANING_SPECIALISTS.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.fullName}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 font-mono font-bold text-slate-900">
                        ${b.finalTotal.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) =>
                            onUpdateStatus(b.id, e.target.value as BookingStatus)
                          }
                          className={`px-2.5 py-1 rounded-lg font-bold text-[10px] border focus:outline-none ${statusMeta.bgClass} ${statusMeta.colorClass} ${statusMeta.borderClass}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => setActiveDetailsBooking(b)}
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Drawer Modal */}
      {activeDetailsBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl border border-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {activeDetailsBooking.bookingReference}
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                  {activeDetailsBooking.customerName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailsBooking(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Customer Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-medium">{activeDetailsBooking.customerPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-medium">{activeDetailsBooking.customerEmail}</span>
              </div>
              <div className="flex items-start gap-2 col-span-2 mt-1">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  {activeDetailsBooking.addressLine1},{" "}
                  {activeDetailsBooking.addressLine2 ? `${activeDetailsBooking.addressLine2}, ` : ""}
                  {activeDetailsBooking.city || "Riverside"}, {activeDetailsBooking.state || "CA"}{" "}
                  {activeDetailsBooking.zipCode} ({activeDetailsBooking.neighborhood})
                </span>
              </div>
            </div>

            {/* Entry & Notes */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-800 block">Entry Instructions:</span>
                <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 mt-1">
                  {activeDetailsBooking.entryInstructions || "No special lockbox instructions provided."}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block">Special Requests & Notes:</span>
                <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 mt-1">
                  {activeDetailsBooking.specialNotes || "None provided."}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveDetailsBooking(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
