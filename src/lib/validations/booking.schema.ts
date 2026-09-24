import { z } from "zod";

export const bookingFormSchema = z.object({
  // Property Specs
  serviceSlug: z.string().min(1, "Please select a cleaning service type"),
  squareFootage: z.coerce
    .number()
    .min(300, "Minimum 300 sq ft")
    .max(10000, "Maximum 10,000 sq ft for instant online booking"),
  bedrooms: z.coerce.number().min(0).max(10),
  bathrooms: z.coerce.number().min(1, "At least 1 bathroom required").max(10),
  halfBathrooms: z.coerce.number().min(0).max(6).default(0),

  // Add-ons
  selectedAddOns: z.array(z.string()).default([]),

  // Frequency
  frequency: z.enum(["one_time", "weekly", "bi_weekly", "monthly"]),

  // Schedule
  serviceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a valid service date"),
  serviceTimeSlot: z.string().min(1, "Please select a preferred arrival window"),

  // Contact & Location (Riverside, CA)
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number").max(20),
  addressLine1: z.string().min(5, "Street address is required"),
  addressLine2: z.string().optional(),
  city: z.string().default("Riverside"),
  state: z.string().default("CA"),
  zipCode: z.string().regex(/^\d{5}$/, "Please enter a valid 5-digit California zip code"),
  neighborhood: z.string().optional(),
  entryInstructions: z.string().max(500).optional(),
  specialNotes: z.string().max(1000).optional(),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export const quoteCalculatorSchema = z.object({
  serviceSlug: z.string().default("standard-maintenance"),
  squareFootage: z.number().min(300).max(10000).default(1800),
  bedrooms: z.number().min(0).max(10).default(3),
  bathrooms: z.number().min(1).max(10).default(2),
  halfBathrooms: z.number().min(0).max(6).default(0),
  selectedAddOns: z.array(z.string()).default([]),
  frequency: z.enum(["one_time", "weekly", "bi_weekly", "monthly"]).default("bi_weekly"),
});

export type QuoteCalculatorValues = z.infer<typeof quoteCalculatorSchema>;
