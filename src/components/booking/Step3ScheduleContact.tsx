"use client";

import { CleaningFrequency } from "@/lib/types";
import { ArrowLeft, Calendar, Clock, MapPin, User, Mail, Phone, Lock, Sparkles, Check } from "lucide-react";

interface Step3Props {
  frequency: CleaningFrequency;
  setFrequency: (freq: CleaningFrequency) => void;
  serviceDate: string;
  setServiceDate: (date: string) => void;
  serviceTimeSlot: string;
  setServiceTimeSlot: (slot: string) => void;
  fullName: string;
  setFullName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  addressLine1: string;
  setAddressLine1: (val: string) => void;
  addressLine2: string;
  setAddressLine2: (val: string) => void;
  zipCode: string;
  setZipCode: (val: string) => void;
  entryInstructions: string;
  setEntryInstructions: (val: string) => void;
  specialNotes: string;
  setSpecialNotes: (val: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  errors: Record<string, string[]>;
}

const FREQUENCY_OPTIONS: { id: CleaningFrequency; label: string; discountText: string; highlight?: boolean }[] = [
  { id: "weekly", label: "Weekly Clean", discountText: "Save 20% OFF", highlight: false },
  { id: "bi_weekly", label: "Bi-Weekly Clean", discountText: "Save 15% OFF", highlight: true },
  { id: "monthly", label: "Monthly Clean", discountText: "Save 10% OFF", highlight: false },
  { id: "one_time", label: "One-Time Clean", discountText: "Standard Rate", highlight: false },
];

const TIME_SLOTS = [
  "Morning (8:00 AM - 11:00 AM)",
  "Midday (11:00 AM - 2:00 PM)",
  "Afternoon (2:00 PM - 5:00 PM)",
];

export function Step3ScheduleContact({
  frequency,
  setFrequency,
  serviceDate,
  setServiceDate,
  serviceTimeSlot,
  setServiceTimeSlot,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  addressLine1,
  setAddressLine1,
  addressLine2,
  setAddressLine2,
  zipCode,
  setZipCode,
  entryInstructions,
  setEntryInstructions,
  specialNotes,
  setSpecialNotes,
  onBack,
  onSubmit,
  isSubmitting,
  errors,
}: Step3Props) {
  // Tomorrow's date formatted as YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split("T")[0];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Frequency Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-900">
          1. Choose Cleaning Frequency & Discount
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FREQUENCY_OPTIONS.map((opt) => {
            const isSelected = frequency === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFrequency(opt.id)}
                className={`p-3.5 rounded-xl border-2 text-center transition-all relative flex flex-col items-center justify-center ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-600"
                    : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                }`}
              >
                {opt.highlight && (
                  <span className="absolute -top-2.5 px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[9px] rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                )}
                <span className="font-bold text-xs sm:text-sm block">{opt.label}</span>
                <span
                  className={`text-[11px] font-semibold mt-0.5 ${
                    opt.id === "one_time" ? "text-slate-400" : "text-emerald-700 font-bold"
                  }`}
                >
                  {opt.discountText}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Date & Time Slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div>
          <label className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5 mb-2">
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>Preferred Service Date</span>
          </label>
          <input
            type="date"
            min={minDateString}
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
          {errors.serviceDate && (
            <p className="text-red-500 text-xs mt-1">{errors.serviceDate[0]}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5 mb-2">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>Arrival Time Window</span>
          </label>
          <select
            value={serviceTimeSlot}
            onChange={(e) => setServiceTimeSlot(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Riverside Contact & Property Details */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-slate-900">
          2. Riverside Contact & Location Details
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName[0]}</p>}
          </div>

          <div className="sm:col-span-1">
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="sarah@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
          </div>

          <div className="sm:col-span-1">
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                placeholder="(951) 555-0199"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>}
          </div>
        </div>

        {/* Address Lines */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Street Address</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. 4820 Overlook Terrace"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
            {errors.addressLine1 && <p className="text-red-500 text-xs mt-1">{errors.addressLine1[0]}</p>}
          </div>

          <div className="sm:col-span-1">
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Apt / Suite</label>
            <input
              type="text"
              placeholder="Unit #, Apt"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Riverside Zip</label>
            <input
              type="text"
              placeholder="92506"
              maxLength={5}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode[0]}</p>}
          </div>
        </div>

        {/* Entry & Special Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">
              Entry / Gate Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="Gate code #1234, key under mat, lockbox..."
              value={entryInstructions}
              onChange={(e) => setEntryInstructions(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">
              Special Requests / Focus Areas (Optional)
            </label>
            <input
              type="text"
              placeholder="Focus on master bath marble, gentle on wood..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Trust Guarantee Note */}
      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-900">
        <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">No Upfront Payment Required!</span>
          <p className="text-emerald-800 mt-0.5">
            You will only be charged after your Riverside cleaning specialist completes the job to your 100% satisfaction. Free cancellation up to 24 hours prior.
          </p>
        </div>
      </div>

      {/* Final Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Add-Ons</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-9 py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-950/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Securing Your Riverside Slot...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Confirm & Secure Riverside Clean</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
