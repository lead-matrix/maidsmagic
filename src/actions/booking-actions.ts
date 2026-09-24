"use server";

import { bookingFormSchema, BookingFormValues } from "@/lib/validations/booking.schema";
import { calculateCleaningQuote } from "@/lib/utils/pricing-calculator";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export interface BookingResponse {
  success: boolean;
  message: string;
  booking?: {
    id: string;
    bookingReference: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    serviceTitle: string;
    serviceDate: string;
    serviceTimeSlot: string;
    finalTotal: number;
    discountAmount: number;
    address: string;
  };
  errors?: Record<string, string[]>;
}

export async function createBookingAction(formData: unknown): Promise<BookingResponse> {
  const result = bookingFormSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the highlighted errors in the form.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data: BookingFormValues = result.data;

  // Server-side authoritative price calculation
  const quote = calculateCleaningQuote({
    serviceSlug: data.serviceSlug,
    squareFootage: data.squareFootage,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    halfBathrooms: data.halfBathrooms,
    selectedAddOns: data.selectedAddOns,
    frequency: data.frequency,
  });

  const randomRefDigits = Math.floor(1000 + Math.random() * 9000);
  const bookingReference = `MM-RIV-${randomRefDigits}`;
  const bookingId = `bk-${Date.now()}`;

  const bookingPayload = {
    id: bookingId,
    bookingReference,
    customerName: data.fullName,
    customerEmail: data.email,
    customerPhone: data.phone,
    serviceId: data.serviceSlug,
    serviceTitle: quote.serviceTitle,
    squareFootage: data.squareFootage,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    halfBathrooms: data.halfBathrooms,
    addOns: quote.addOnsList,
    frequency: data.frequency,
    frequencyDiscountPercent: quote.frequencyDiscountPercent,
    subtotal: quote.subtotal,
    discountAmount: quote.discountAmount,
    finalTotal: quote.finalTotal,
    serviceDate: data.serviceDate,
    serviceTimeSlot: data.serviceTimeSlot,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2 || "",
    city: data.city || "Riverside",
    state: data.state || "CA",
    zipCode: data.zipCode,
    neighborhood: data.neighborhood || "Riverside Metro",
    entryInstructions: data.entryInstructions || "",
    specialNotes: data.specialNotes || "",
    status: "pending" as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // If Supabase is configured, write directly to PostgreSQL
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerClient();
      await supabase.from("bookings").insert([
        {
          booking_reference: bookingReference,
          customer_name: data.fullName,
          customer_email: data.email,
          customer_phone: data.phone,
          service_title: quote.serviceTitle,
          square_footage: data.squareFootage,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          half_bathrooms: data.halfBathrooms,
          add_ons: quote.addOnsList,
          frequency: data.frequency,
          frequency_discount_percent: quote.frequencyDiscountPercent,
          subtotal: quote.subtotal,
          discount_amount: quote.discountAmount,
          final_total: quote.finalTotal,
          service_date: data.serviceDate,
          service_time_slot: data.serviceTimeSlot,
          address_line1: data.addressLine1,
          address_line2: data.addressLine2,
          city: data.city,
          state: data.state,
          zip_code: data.zipCode,
          neighborhood: data.neighborhood,
          entry_instructions: data.entryInstructions,
          special_notes: data.specialNotes,
          status: "pending",
        },
      ]);
    } catch (err) {
      console.warn("Supabase insertion notice (using local storage sync):", err);
    }
  }

  return {
    success: true,
    message: `Booking successfully created! Your confirmation number is ${bookingReference}.`,
    booking: {
      id: bookingId,
      bookingReference,
      customerName: data.fullName,
      customerEmail: data.email,
      customerPhone: data.phone,
      serviceTitle: quote.serviceTitle,
      serviceDate: data.serviceDate,
      serviceTimeSlot: data.serviceTimeSlot,
      finalTotal: quote.finalTotal,
      discountAmount: quote.discountAmount,
      address: `${data.addressLine1}, ${data.city}, ${data.state} ${data.zipCode}`,
    },
  };
}
