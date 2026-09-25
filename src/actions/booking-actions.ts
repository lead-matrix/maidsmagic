"use server";

import { bookingFormSchema, BookingFormValues } from "@/lib/validations/booking.schema";
import { SERVICES_CATALOG, ADDONS_CATALOG } from "@/lib/constants/riverside-data";
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
    address: string;
    estimatedHours: number;
  };
  errors?: Record<string, string[]>;
}

export async function createBookingAction(formData: unknown): Promise<BookingResponse> {
  const result = bookingFormSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data: BookingFormValues = result.data;
  const service =
    SERVICES_CATALOG.find((s) => s.slug === data.serviceSlug) || SERVICES_CATALOG[0];

  const addOnsList = data.selectedAddOns
    .map((slug) => {
      const addon = ADDONS_CATALOG.find((a) => a.slug === slug);
      if (!addon) return null;
      return { slug: addon.slug, name: addon.name };
    })
    .filter(Boolean) as { slug: string; name: string }[];

  // Calculate estimated crew duration
  const baseHours = service.estimatedHoursBase;
  const sqftHours = (data.squareFootage / 1000) * 0.65;
  const bedBathHours = data.bedrooms * 0.25 + data.bathrooms * 0.35;
  const estimatedHours = Math.round((baseHours + sqftHours + bedBathHours) * 2) / 2;

  const randomRefDigits = Math.floor(1000 + Math.random() * 9000);
  const bookingReference = `MM-RIV-${randomRefDigits}`;
  const bookingId = `bk-${Date.now()}`;

  // If Supabase is configured, record in database
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerClient();
      await supabase.from("bookings").insert([
        {
          booking_reference: bookingReference,
          customer_name: data.fullName,
          customer_email: data.email,
          customer_phone: data.phone,
          service_title: service.title,
          square_footage: data.squareFootage,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          half_bathrooms: data.halfBathrooms,
          add_ons: addOnsList,
          frequency: data.frequency,
          service_date: data.serviceDate,
          service_time_slot: data.serviceTimeSlot,
          address_line1: data.addressLine1,
          address_line2: data.addressLine2,
          city: data.city || "Riverside",
          state: data.state || "CA",
          zip_code: data.zipCode,
          neighborhood: data.neighborhood || "Riverside",
          entry_instructions: data.entryInstructions,
          special_notes: data.specialNotes,
          status: "pending",
        },
      ]);
    } catch (err) {
      console.warn("Supabase insertion notice:", err);
    }
  }

  return {
    success: true,
    message: `Your booking request has been confirmed! Confirmation: ${bookingReference}. Our Riverside concierge will hold this slot with zero upfront payment.`,
    booking: {
      id: bookingId,
      bookingReference,
      customerName: data.fullName,
      customerEmail: data.email,
      customerPhone: data.phone,
      serviceTitle: service.title,
      serviceDate: data.serviceDate,
      serviceTimeSlot: data.serviceTimeSlot,
      address: `${data.addressLine1}, ${data.city || "Riverside"}, CA ${data.zipCode}`,
      estimatedHours,
    },
  };
}
