import { SERVICES_CATALOG, ADDONS_CATALOG } from "@/lib/constants/riverside-data";
import { CleaningFrequency } from "@/lib/types";

export interface PricingCalculationResult {
  basePrice: number;
  sqftAdjustment: number;
  bedroomsAdjustment: number;
  bathroomsAdjustment: number;
  addOnsTotal: number;
  addOnsList: { slug: string; name: string; price: number }[];
  subtotal: number;
  frequencyDiscountPercent: number;
  discountAmount: number;
  finalTotal: number;
  estimatedHours: number;
  serviceTitle: string;
}

export function calculateCleaningQuote({
  serviceSlug = "standard-maintenance",
  squareFootage = 1800,
  bedrooms = 3,
  bathrooms = 2,
  halfBathrooms = 0,
  selectedAddOns = [] as string[],
  frequency = "bi_weekly" as CleaningFrequency,
}: {
  serviceSlug?: string;
  squareFootage?: number;
  bedrooms?: number;
  bathrooms?: number;
  halfBathrooms?: number;
  selectedAddOns?: string[];
  frequency?: CleaningFrequency;
}): PricingCalculationResult {
  const service =
    SERVICES_CATALOG.find((s) => s.slug === serviceSlug) || SERVICES_CATALOG[0];

  // Base price
  const basePrice = service.basePrice;

  // Sqft calculation: base covers up to 1000 sq ft, extra sq ft calculated at service rate
  const baselineSqft = 1000;
  const extraSqft = Math.max(0, squareFootage - baselineSqft);
  const sqftAdjustment = Math.round(extraSqft * service.pricePerSqft * 100) / 100;

  // Bedroom calculation: base covers 1 bedroom
  const extraBeds = Math.max(0, bedrooms - 1);
  const bedroomsAdjustment = extraBeds * service.pricePerBed;

  // Bathroom calculation: base covers 1 full bath
  const extraFullBaths = Math.max(0, bathrooms - 1);
  const fullBathAdjustment = extraFullBaths * service.pricePerBath;
  const halfBathAdjustment = halfBathrooms * (service.pricePerBath * 0.55);
  const bathroomsAdjustment = Math.round((fullBathAdjustment + halfBathAdjustment) * 100) / 100;

  // Add-ons
  const addOnsList = selectedAddOns
    .map((slug) => {
      const addon = ADDONS_CATALOG.find((a) => a.slug === slug);
      if (!addon) return null;
      return {
        slug: addon.slug,
        name: addon.name,
        price: addon.price,
      };
    })
    .filter(Boolean) as { slug: string; name: string; price: number }[];

  const addOnsTotal = addOnsList.reduce((sum, item) => sum + item.price, 0);

  // Subtotal before frequency discount
  const subtotal = Math.round((basePrice + sqftAdjustment + bedroomsAdjustment + bathroomsAdjustment + addOnsTotal) * 100) / 100;

  // Frequency Discount percentages
  let frequencyDiscountPercent = 0;
  if (frequency === "weekly") {
    frequencyDiscountPercent = 20;
  } else if (frequency === "bi_weekly") {
    frequencyDiscountPercent = 15;
  } else if (frequency === "monthly") {
    frequencyDiscountPercent = 10;
  }

  const discountAmount = Math.round((subtotal * (frequencyDiscountPercent / 100)) * 100) / 100;
  const finalTotal = Math.max(79, Math.round((subtotal - discountAmount) * 100) / 100);

  // Estimated Duration in Hours
  const addOnsMinutes = selectedAddOns.reduce((sum, slug) => {
    const addon = ADDONS_CATALOG.find((a) => a.slug === slug);
    return sum + (addon ? addon.estimatedMinutes : 0);
  }, 0);

  const baseHours = service.estimatedHoursBase;
  const sqftHours = (squareFootage / 1000) * 0.65;
  const bedBathHours = (bedrooms * 0.25) + (bathrooms * 0.35);
  const estimatedHours = Math.round((baseHours + sqftHours + bedBathHours + addOnsMinutes / 60) * 2) / 2;

  return {
    basePrice,
    sqftAdjustment,
    bedroomsAdjustment,
    bathroomsAdjustment,
    addOnsTotal,
    addOnsList,
    subtotal,
    frequencyDiscountPercent,
    discountAmount,
    finalTotal,
    estimatedHours,
    serviceTitle: service.title,
  };
}
