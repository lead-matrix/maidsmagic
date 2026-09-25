"use client";

import { useState, useMemo } from "react";
import { Step1PropertySpecs } from "./Step1PropertySpecs";
import { Step2AddOnSelector } from "./Step2AddOnSelector";
import { Step3ScheduleContact } from "./Step3ScheduleContact";
import { BookingSummaryCard } from "./BookingSummaryCard";
import { BookingConfirmationModal } from "./BookingConfirmationModal";
import { SERVICES_CATALOG, ADDONS_CATALOG } from "@/lib/constants/riverside-data";
import { CleaningFrequency } from "@/lib/types";
import { createBookingAction } from "@/actions/booking-actions";
import { Sparkles, Check, Home, Shield, Calendar } from "lucide-react";

export function InstantQuoteEngine() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Specs
  const [serviceSlug, setServiceSlug] = useState<string>("luxury-deep-clean");
  const [squareFootage, setSquareFootage] = useState<number>(2000);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [halfBathrooms, setHalfBathrooms] = useState<number>(1);

  // Step 2: Add-Ons
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["inside-oven"]);

  // Step 3: Schedule & Contact
  const [frequency, setFrequency] = useState<CleaningFrequency>("bi_weekly");
  const [serviceDate, setServiceDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  });
  const [serviceTimeSlot, setServiceTimeSlot] = useState<string>("Morning (8:00 AM - 11:00 AM)");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [addressLine2, setAddressLine2] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("92506");
  const [entryInstructions, setEntryInstructions] = useState<string>("");
  const [specialNotes, setSpecialNotes] = useState<string>("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  // Calculated duration
  const estimatedHours = useMemo(() => {
    const service =
      SERVICES_CATALOG.find((s) => s.slug === serviceSlug) || SERVICES_CATALOG[0];
    const addOnsMinutes = selectedAddOns.reduce((sum, slug) => {
      const addon = ADDONS_CATALOG.find((a) => a.slug === slug);
      return sum + (addon ? addon.estimatedMinutes : 0);
    }, 0);

    const base = service.estimatedHoursBase;
    const sqftExtra = (squareFootage / 1000) * 0.65;
    const rooms = bedrooms * 0.25 + bathrooms * 0.35;
    return Math.round((base + sqftExtra + rooms + addOnsMinutes / 60) * 2) / 2;
  }, [serviceSlug, squareFootage, bedrooms, bathrooms, selectedAddOns]);

  const toggleAddOn = (slug: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = {
        serviceSlug,
        squareFootage,
        bedrooms,
        bathrooms,
        halfBathrooms,
        selectedAddOns,
        frequency,
        serviceDate,
        serviceTimeSlot,
        fullName,
        email,
        phone,
        addressLine1,
        addressLine2,
        city: "Riverside",
        state: "CA",
        zipCode,
        neighborhood: "Riverside",
        entryInstructions,
        specialNotes,
      };

      const res = await createBookingAction(payload);

      if (res.success && res.booking) {
        setConfirmedBooking(res.booking);

        // Also sync to localStorage for immediate instant reflect in /admin portal
        try {
          const existing = JSON.parse(localStorage.getItem("maidsmagic_custom_bookings") || "[]");
          const selectedService = SERVICES_CATALOG.find((s) => s.slug === serviceSlug);
          const addOnsList = selectedAddOns
            .map((slug) => {
              const a = ADDONS_CATALOG.find((item) => item.slug === slug);
              return a ? { slug: a.slug, name: a.name } : null;
            })
            .filter(Boolean);

          const newBookingItem = {
            id: res.booking.id,
            bookingReference: res.booking.bookingReference,
            customerName: res.booking.customerName,
            customerEmail: res.booking.customerEmail,
            customerPhone: res.booking.customerPhone,
            serviceId: serviceSlug,
            serviceTitle: selectedService?.title || res.booking.serviceTitle,
            squareFootage,
            bedrooms,
            bathrooms,
            halfBathrooms,
            addOns: addOnsList,
            frequency,
            serviceDate: res.booking.serviceDate,
            serviceTimeSlot: res.booking.serviceTimeSlot,
            addressLine1,
            addressLine2,
            city: "Riverside",
            state: "CA",
            zipCode,
            neighborhood: "Riverside",
            entryInstructions,
            specialNotes,
            status: "pending",
            priorityTag: "VIP Riverside",
            paymentStatus: "unpaid",
            internalCrmNotes: "Online direct booking request. Instant slot reserved.",
            estimatedHours,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          localStorage.setItem("maidsmagic_custom_bookings", JSON.stringify([newBookingItem, ...existing]));
          window.dispatchEvent(new Event("maidsmagic_booking_created"));
        } catch {
          // ignore
        }
      } else if (res.errors) {
        setErrors(res.errors);
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      setErrors({ form: ["An error occurred while submitting your booking. Please try again."] });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-now" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Effortless 3-Step Booking Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Customize & Reserve Your Riverside Clean
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your home specs, customize focus add-on areas, and hold your preferred Riverside arrival window. Zero upfront charge.
          </p>
        </div>

        {/* 3-Step Wizard Navigation Indicator */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            {/* Step 1 Pill */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                currentStep === 1
                  ? "bg-blue-700 text-white border-blue-700 shadow-md"
                  : currentStep > 1
                  ? "bg-blue-50 text-blue-900 border-blue-300 font-medium"
                  : "bg-slate-50 text-slate-500 border-slate-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  currentStep === 1
                    ? "bg-amber-400 text-slate-950"
                    : currentStep > 1
                    ? "bg-blue-800 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {currentStep > 1 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : "1"}
              </div>
              <span className="text-xs font-bold hidden sm:inline">1. Property Specs</span>
            </button>

            {/* Step 2 Pill */}
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                currentStep === 2
                  ? "bg-blue-700 text-white border-blue-700 shadow-md"
                  : currentStep > 2
                  ? "bg-blue-50 text-blue-900 border-blue-300 font-medium"
                  : "bg-slate-50 text-slate-500 border-slate-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  currentStep === 2
                    ? "bg-amber-400 text-slate-950"
                    : currentStep > 2
                    ? "bg-blue-800 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {currentStep > 2 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : "2"}
              </div>
              <span className="text-xs font-bold hidden sm:inline">2. Focus Add-Ons</span>
            </button>

            {/* Step 3 Pill */}
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                currentStep === 3
                  ? "bg-blue-700 text-white border-blue-700 shadow-md"
                  : "bg-slate-50 text-slate-500 border-slate-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  currentStep === 3
                    ? "bg-amber-400 text-slate-950"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                3
              </div>
              <span className="text-xs font-bold hidden sm:inline">3. Schedule & Reserve</span>
            </button>
          </div>
        </div>

        {/* 2-Column Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Left Column */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
            {currentStep === 1 && (
              <Step1PropertySpecs
                serviceSlug={serviceSlug}
                setServiceSlug={setServiceSlug}
                squareFootage={squareFootage}
                setSquareFootage={setSquareFootage}
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                bathrooms={bathrooms}
                setBathrooms={setBathrooms}
                halfBathrooms={halfBathrooms}
                setHalfBathrooms={setHalfBathrooms}
                onNext={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && (
              <Step2AddOnSelector
                selectedAddOns={selectedAddOns}
                toggleAddOn={toggleAddOn}
                onBack={() => setCurrentStep(1)}
                onNext={() => setCurrentStep(3)}
              />
            )}

            {currentStep === 3 && (
              <Step3ScheduleContact
                frequency={frequency}
                setFrequency={setFrequency}
                serviceDate={serviceDate}
                setServiceDate={setServiceDate}
                serviceTimeSlot={serviceTimeSlot}
                setServiceTimeSlot={setServiceTimeSlot}
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                addressLine1={addressLine1}
                setAddressLine1={setAddressLine1}
                addressLine2={addressLine2}
                setAddressLine2={setAddressLine2}
                zipCode={zipCode}
                setZipCode={setZipCode}
                entryInstructions={entryInstructions}
                setEntryInstructions={setEntryInstructions}
                specialNotes={specialNotes}
                setSpecialNotes={setSpecialNotes}
                onBack={() => setCurrentStep(2)}
                onSubmit={handleFinalSubmit}
                isSubmitting={isSubmitting}
                errors={errors}
              />
            )}
          </div>

          {/* Right Column: Live Sticky Summary Card */}
          <div className="lg:col-span-4">
            <BookingSummaryCard
              serviceSlug={serviceSlug}
              squareFootage={squareFootage}
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              halfBathrooms={halfBathrooms}
              selectedAddOns={selectedAddOns}
              frequency={frequency}
              estimatedHours={estimatedHours}
            />
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <BookingConfirmationModal
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}
    </section>
  );
}
