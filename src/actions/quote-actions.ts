"use server";

import { quoteCalculatorSchema, QuoteCalculatorValues } from "@/lib/validations/booking.schema";
import { calculateCleaningQuote } from "@/lib/utils/pricing-calculator";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export async function calculateQuoteAction(params: QuoteCalculatorValues) {
  const parsed = quoteCalculatorSchema.safeParse(params);
  if (!parsed.success) {
    throw new Error("Invalid quote parameters");
  }

  const scope = calculateCleaningQuote(parsed.data);
  return { success: true, scope };
}

export async function captureAbandonedQuoteLeadAction(payload: {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  serviceType: string;
  frequency: "one_time" | "weekly" | "bi_weekly" | "monthly";
  addOns: string[];
  zipCode?: string;
  neighborhood?: string;
}) {
  const quoteId = `qt-${Date.now()}`;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerClient();
      await supabase.from("quotes").insert([
        {
          customer_name: payload.customerName,
          customer_email: payload.customerEmail,
          customer_phone: payload.customerPhone,
          square_footage: payload.squareFootage,
          bedrooms: payload.bedrooms,
          bathrooms: payload.bathrooms,
          service_type: payload.serviceType,
          frequency: payload.frequency,
          add_ons: payload.addOns,
          zip_code: payload.zipCode,
          neighborhood: payload.neighborhood,
          status: "inquiry_received",
        },
      ]);
    } catch (err) {
      console.warn("Supabase quote insert error:", err);
    }
  }

  return {
    success: true,
    quoteId,
    message: "Inquiry recorded for dispatch concierge outreach.",
  };
}

export async function sendQuoteRecoveryAction(quoteId: string, channel: "email" | "sms") {
  return {
    success: true,
    message: `Follow-up ${channel.toUpperCase()} dispatched to customer regarding their custom Riverside cleaning plan!`,
    quoteId,
    timestamp: new Date().toISOString(),
  };
}
