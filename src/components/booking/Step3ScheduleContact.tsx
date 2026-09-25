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

const FREQUENCY_OPTIONS: { id: CleaningFrequency; label: string; badgeText: string; highlight?: boolean }[] = [
  { id: "weekly", label: "Weekly Care", badgeText: "Priority Crew Hold", highlight: false },
  { id: "bi_weekly", label: "Bi-Weekly Care", badgeText: "Most Popular", highlight: true },
  { id: "monthly", label: "Monthly Reset", badgeText: "Seasonal Upkeep", highlight: false },
  { id: "one_time", label: "One-Time Clean", badgeText: "Single Visit", highlight: false },
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
          1. Choose Cleaning Frequency
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
                    ? "border-blue-600 bg-blue-50/90 text-blue-900 shadow-sm ring-1 ring-blue-600"
                    : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                }`}
              >
                {opt.highlight && (
                  <span className="absolute -top-2.5 px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[9px] rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                )}
                <span className="font-bold text-xs sm:text-sm block">{opt.label}</span>
                <span className="text-[11px] font-semibold mt-0.5 text-blue-700">
                  {opt.badgeText}
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
            <Calendar className="w-4 h-4 text-blue-700" />
            <span>Preferred Service Date</span>
          </label>
          <input
            type="date"
            min={minDateString}
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
          {errors.serviceDate && (
            <p className="text-red-500 text-xs mt-1">{errors.serviceDate[0]}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5 mb-2">
            <Clock className="w-4 h-4 text-blue-700" />
            <span>Arrival Time Window</span>
          </label>
          <select
            value={serviceTimeSlot}
            onChange={(e) => setServiceTimeSlot(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode[0]}</p>}
          </div>
        </div>

        {/* Entry & Special Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">
              Entry / Keyless Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="Gate code #1234, smart lock, key under mat..."
              value={entryInstructions}
              onChange={(e) => setEntryInstructions(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">
              Special Focus Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="Focus on master bath marble, gentle on wood..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Trust Guarantee Note */}
      <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-3 text-xs text-blue-950">
        <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">Zero Upfront Obligation!</span>
          <p className="text-blue-800 mt-0.5">
            Your Riverside cleaning crew slot is held instantly. You will only complete payment after our specialists finish the clean to your 100% sparkle satisfaction.
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
          className="px-9 py-4 rounded-xl bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white font-bold text-sm shadow-lg shadow-blue-950/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Securing Your Riverside Slot...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Confirm & Hold Riverside Slot</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
