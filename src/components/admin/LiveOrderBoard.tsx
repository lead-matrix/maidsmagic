"use client";

import { useState } from "react";
import { BookingLead, BookingStatus, PaymentStatus } from "@/lib/types";
import { CLEANING_SPECIALISTS, SERVICES_CATALOG } from "@/lib/constants/riverside-data";
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
  Plus,
  FileText,
  CreditCard,
  Tag,
} from "lucide-react";

interface LiveOrderBoardProps {
  bookings: BookingLead[];
  onUpdateStatus: (bookingId: string, newStatus: BookingStatus) => void;
  onAssignCleaner: (bookingId: string, cleanerId: string) => void;
  onUpdateNotes?: (bookingId: string, notes: string) => void;
  onAddNewBooking?: (booking: BookingLead) => void;
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
    colorClass: "text-blue-800",
    bgClass: "bg-blue-100",
    borderClass: "border-blue-300",
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
  onUpdateNotes,
  onAddNewBooking,
}: LiveOrderBoardProps) {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [activeDetailsBooking, setActiveDetailsBooking] = useState<BookingLead | null>(null);
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);

  // Manual Booking Form State
  const [manualName, setManualName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualAddress, setManualAddress] = useState("");
  const [manualNeighborhood, setManualNeighborhood] = useState("Canyon Crest");
  const [manualServiceSlug, setManualServiceSlug] = useState("luxury-deep-clean");
  const [manualDate, setManualDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [manualTimeSlot, setManualTimeSlot] = useState("Morning (8:00 AM - 11:00 AM)");
  const [manualPriority, setManualPriority] = useState<"Standard" | "VIP Riverside" | "Urgent Turnover">("Standard");

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

  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) return;

    const srv = SERVICES_CATALOG.find((s) => s.slug === manualServiceSlug) || SERVICES_CATALOG[0];
    const newRef = `MM-RIV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingLead = {
      id: `bk-${Date.now()}`,
      bookingReference: newRef,
      customerName: manualName,
      customerPhone: manualPhone,
      customerEmail: manualEmail || "concierge@maidsmagicriverside.com",
      serviceId: manualServiceSlug,
      serviceTitle: srv.title,
      squareFootage: 2200,
      bedrooms: 3,
      bathrooms: 2,
      halfBathrooms: 1,
      addOns: [],
      frequency: "bi_weekly",
      serviceDate: manualDate,
      serviceTimeSlot: manualTimeSlot,
      addressLine1: manualAddress || "Riverside, CA",
      city: "Riverside",
      state: "CA",
      zipCode: "92506",
      neighborhood: manualNeighborhood,
      status: "pending",
      priorityTag: manualPriority,
      paymentStatus: "unpaid",
      internalCrmNotes: "Manually booked by dispatch manager.",
      estimatedHours: srv.estimatedHoursBase,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (onAddNewBooking) {
      onAddNewBooking(newBooking);
    }
    setShowAddBookingModal(false);
    setManualName("");
    setManualPhone("");
    setManualEmail("");
    setManualAddress("");
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search customer, ref, neighborhood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-blue-700 focus:outline-none"
          />
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:ring-2 focus:ring-blue-700 focus:outline-none"
          >
            <option value="all">All Statuses ({bookings.length})</option>
            <option value="pending">Pending ({bookings.filter((b) => b.status === "pending").length})</option>
            <option value="confirmed">Confirmed ({bookings.filter((b) => b.status === "confirmed").length})</option>
            <option value="dispatched">Dispatched ({bookings.filter((b) => b.status === "dispatched").length})</option>
            <option value="in_progress">In Progress ({bookings.filter((b) => b.status === "in_progress").length})</option>
            <option value="completed">Completed ({bookings.filter((b) => b.status === "completed").length})</option>
          </select>

          {/* Add Booking Button */}
          <button
            type="button"
            onClick={() => setShowAddBookingModal(true)}
            className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>

          {/* View Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === "kanban"
                  ? "bg-white text-blue-900 shadow-xs"
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
                  ? "bg-white text-blue-900 shadow-xs"
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
                        {/* Reference & Priority Tag */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[11px] text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {b.bookingReference}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              b.priorityTag === "VIP Riverside"
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : b.priorityTag === "Urgent Turnover"
                                ? "bg-red-100 text-red-900"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {b.priorityTag || "Standard"}
                          </span>
                        </div>

                        {/* Customer & Neighborhood */}
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">
                            {b.customerName}
                          </h4>
                          <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-0.5">
                            <MapPin className="w-3 h-3 text-blue-700 shrink-0" />
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
                            {b.squareFootage} sq ft • {b.bedrooms} Bed / {b.bathrooms} Bath • ~{b.estimatedHours || 3.5} hrs
                          </p>
                        </div>

                        {/* Date & Time */}
                        <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                          <span>{b.serviceDate} • {b.serviceTimeSlot.split(" ")[0]}</span>
                        </div>

                        {/* Assigned Cleaner Selector */}
                        <div>
                          <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                            Assigned Specialist Crew
                          </label>
                          <select
                            value={b.cleanerId || ""}
                            onChange={(e) => onAssignCleaner(b.id, e.target.value)}
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-800 focus:outline-none"
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
                            className="text-[11px] font-semibold text-blue-800 hover:text-blue-900 hover:underline"
                          >
                            CRM Details →
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
                  <th className="p-4">Service & Scope</th>
                  <th className="p-4">Date & Slot</th>
                  <th className="p-4">Assigned Crew</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.map((b) => {
                  const statusMeta = STATUS_CONFIG[b.status];

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-mono font-bold text-blue-900">
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
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            b.priorityTag === "VIP Riverside"
                              ? "bg-amber-100 text-amber-900"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {b.priorityTag || "Standard"}
                        </span>
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
                          CRM View
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

      {/* Manual Booking Creation Modal */}
      {showAddBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Create New Riverside Booking Lead
              </h3>
              <button
                type="button"
                onClick={() => setShowAddBookingModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateManualBooking} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Vance"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="(951) 555-0199"
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="client@gmail.com"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cleaning Package</label>
                  <select
                    value={manualServiceSlug}
                    onChange={(e) => setManualServiceSlug(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    {SERVICES_CATALOG.map((s) => (
                      <option key={s.slug} value={s.slug}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Riverside Zone</label>
                  <select
                    value={manualNeighborhood}
                    onChange={(e) => setManualNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value="Canyon Crest">Canyon Crest</option>
                    <option value="Orangecrest">Orangecrest</option>
                    <option value="The Wood Streets">The Wood Streets</option>
                    <option value="Hawarden Hills">Hawarden Hills</option>
                    <option value="Victoria Avenue">Victoria Avenue</option>
                    <option value="UCR / Box Springs">UCR / Box Springs</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Date</label>
                  <input
                    type="date"
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority Tier</label>
                  <select
                    value={manualPriority}
                    onChange={(e) => setManualPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value="Standard">Standard</option>
                    <option value="VIP Riverside">VIP Riverside</option>
                    <option value="Urgent Turnover">Urgent Turnover</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Street Address</label>
                <input
                  type="text"
                  placeholder="e.g. 1405 Spruce St, Riverside"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBookingModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-700 text-white font-bold"
                >
                  Create Lead
                </button>
              </div>
            </form>
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
                <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
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
                <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                <span className="font-medium">{activeDetailsBooking.customerPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                <span className="font-medium">{activeDetailsBooking.customerEmail}</span>
              </div>
              <div className="flex items-start gap-2 col-span-2 mt-1">
                <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>
                  {activeDetailsBooking.addressLine1},{" "}
                  {activeDetailsBooking.addressLine2 ? `${activeDetailsBooking.addressLine2}, ` : ""}
                  {activeDetailsBooking.city || "Riverside"}, {activeDetailsBooking.state || "CA"}{" "}
                  {activeDetailsBooking.zipCode} ({activeDetailsBooking.neighborhood})
                </span>
              </div>
            </div>

            {/* Inclusions & Focus Add-ons */}
            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-950 space-y-1.5">
              <span className="font-bold block">Selected Package & Focus Scope:</span>
              <p className="font-semibold text-blue-900">
                {activeDetailsBooking.serviceTitle} ({activeDetailsBooking.squareFootage} sq ft • {activeDetailsBooking.bedrooms} Bed / {activeDetailsBooking.bathrooms} Bath)
              </p>
              {activeDetailsBooking.addOns && activeDetailsBooking.addOns.length > 0 && (
                <div className="pt-1">
                  <span className="text-slate-600 block text-[11px] mb-1">Focus Areas:</span>
                  <div className="flex flex-wrap gap-1">
                    {activeDetailsBooking.addOns.map((a) => (
                      <span key={a.slug} className="px-2 py-0.5 rounded bg-white border border-blue-200 text-blue-900 text-[10px] font-bold">
                        {a.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Entry & Notes */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-800 block">Entry / Smart Lock Instructions:</span>
                <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 mt-1">
                  {activeDetailsBooking.entryInstructions || "No special lockbox instructions provided."}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block">Internal Dispatch CRM Notes:</span>
                <textarea
                  rows={2}
                  defaultValue={activeDetailsBooking.internalCrmNotes || ""}
                  onChange={(e) => {
                    if (onUpdateNotes) onUpdateNotes(activeDetailsBooking.id, e.target.value);
                  }}
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-900 mt-1 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                  placeholder="Add private customer notes, gate codes, crew feedback..."
                />
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveDetailsBooking(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close CRM Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
