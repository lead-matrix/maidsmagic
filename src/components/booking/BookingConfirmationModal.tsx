"use client";

import { CheckCircle2, Sparkles, Calendar, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import Link from "next/link";
import { RIVERSIDE_COMPANY_INFO } from "@/lib/constants/riverside-data";

interface ConfirmationModalProps {
  booking: {
    id: string;
    bookingReference: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    serviceTitle: string;
    serviceDate: string;
    serviceTimeSlot: string;
    finalTotal: number;
    address: string;
  };
  onClose: () => void;
}

export function BookingConfirmationModal({ booking, onClose }: ConfirmationModalProps) {
  useEffect(() => {
    // Trigger confetti on modal load
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#059669", "#10B981", "#F59E0B", "#D97706"],
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in-50 duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 stroke-[2.5]" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Booking Confirmed • Riverside Dispatch Active
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            You&apos;re All Set for a Sparkling Home!
          </h3>
          <p className="text-sm text-slate-500">
            Confirmation reference:{" "}
            <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
              {booking.bookingReference}
            </span>
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-800 text-sm">{booking.serviceTitle}</span>
            <span className="font-mono font-bold text-emerald-800 text-base">
              ${booking.finalTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {booking.serviceDate} • {booking.serviceTimeSlot}
            </span>
          </div>

          <div className="flex items-start gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>{booking.address}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Confirmation sent to {booking.customerEmail}</span>
          </div>
        </div>

        {/* Trust Guarantee reminder */}
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Zero upfront payment — pay seamlessly after the clean!</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors"
          >
            Done
          </button>

          <Link
            href="/admin"
            className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>View In Admin Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
