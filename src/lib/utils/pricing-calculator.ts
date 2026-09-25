import { SERVICES_CATALOG, ADDONS_CATALOG } from "@/lib/constants/riverside-data";
import { CleaningFrequency } from "@/lib/types";

export interface CleaningScopeResult {
  serviceSlug: string;
  serviceTitle: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  halfBathrooms: number;
  selectedAddOns: { slug: string; name: string }[];
  frequency: CleaningFrequency;
  estimatedHours: number;
  crewTier: string;
  inclusions: string[];
}

export function calculateCleaningQuote({
  serviceSlug = "luxury-deep-clean",
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
}): CleaningScopeResult {
  const service =
    SERVICES_CATALOG.find((s) => s.slug === serviceSlug) || SERVICES_CATALOG[0];

  const addOnsList = selectedAddOns
    .map((slug) => {
      const addon = ADDONS_CATALOG.find((a) => a.slug === slug);
      if (!addon) return null;
      return {
        slug: addon.slug,
        name: addon.name,
      };
    })
    .filter(Boolean) as { slug: string; name: string }[];

  const addOnsMinutes = selectedAddOns.reduce((sum, slug) => {
    const addon = ADDONS_CATALOG.find((a) => a.slug === slug);
    return sum + (addon ? addon.estimatedMinutes : 0);
  }, 0);

  const baseHours = service.estimatedHoursBase;
  const sqftHours = (squareFootage / 1000) * 0.65;
  const bedBathHours = bedrooms * 0.25 + bathrooms * 0.35 + halfBathrooms * 0.15;
  const estimatedHours = Math.round((baseHours + sqftHours + bedBathHours + addOnsMinutes / 60) * 2) / 2;

  return {
    serviceSlug: service.slug,
    serviceTitle: service.title,
    squareFootage,
    bedrooms,
    bathrooms,
    halfBathrooms,
    selectedAddOns: addOnsList,
    frequency,
    estimatedHours,
    crewTier: "White-Glove Elite Specialist Crew",
    inclusions: service.inclusions,
  };
}
