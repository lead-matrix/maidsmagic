export interface ChecklistSection {
  room: string;
  icon: string;
  items: {
    task: string;
    standard: boolean;
    deep: boolean;
    moveInOut: boolean;
  }[];
}

export const CLEANING_CHECKLIST_DATA: ChecklistSection[] = [
  {
    room: "Kitchen & Dining Area",
    icon: "Utensils",
    items: [
      { task: "Stovetop degreasing & exterior burner scrub", standard: true, deep: true, moveInOut: true },
      { task: "Countertops wiped & sanitizing polish", standard: true, deep: true, moveInOut: true },
      { task: "Exterior of refrigerator, oven & dishwasher polished", standard: true, deep: true, moveInOut: true },
      { task: "Sink & faucet scrubbed, descaled & shined", standard: true, deep: true, moveInOut: true },
      { task: "Microwave interior and exterior cleaned", standard: true, deep: true, moveInOut: true },
      { task: "Backsplash scrubbed and tile grout wiped", standard: false, deep: true, moveInOut: true },
      { task: "Cabinet exterior faces hand-wiped and degreased", standard: false, deep: true, moveInOut: true },
      { task: "Inside empty cabinets, drawers and pantry shelves sanitized", standard: false, deep: false, moveInOut: true },
      { task: "Trash emptied & can sanitized inside/out", standard: true, deep: true, moveInOut: true },
      { task: "Floors vacuumed and hand-mopped", standard: true, deep: true, moveInOut: true },
    ],
  },
  {
    room: "Bathrooms & Powder Rooms",
    icon: "Bath",
    items: [
      { task: "Shower walls, glass doors, and tub descaling scrub", standard: true, deep: true, moveInOut: true },
      { task: "Toilet thoroughly disinfected inside, bowl & base", standard: true, deep: true, moveInOut: true },
      { task: "Vanity countertop, sink basin & fixtures polished", standard: true, deep: true, moveInOut: true },
      { task: "Mirrors polished streak-free crystal clear", standard: true, deep: true, moveInOut: true },
      { task: "Heavy mineral deposit & soap scum deep extraction", standard: false, deep: true, moveInOut: true },
      { task: "Tile grout hand-scrubbed with antimicrobial solution", standard: false, deep: true, moveInOut: true },
      { task: "Exhaust fan vent grill vacuumed & wiped", standard: false, deep: true, moveInOut: true },
      { task: "Inside vanity drawers & medicine cabinet wiped clean", standard: false, deep: false, moveInOut: true },
      { task: "Baseboards behind toilets and vanity hand-scrubbed", standard: false, deep: true, moveInOut: true },
      { task: "Floors vacuumed, mopped, and corners detailed", standard: true, deep: true, moveInOut: true },
    ],
  },
  {
    room: "Bedrooms & Living Areas",
    icon: "Bed",
    items: [
      { task: "All accessible surfaces, tabletops, and shelves dusted", standard: true, deep: true, moveInOut: true },
      { task: "Beds made & pillows fluffed (linens changed if left out)", standard: true, deep: true, moveInOut: true },
      { task: "Carpets & rugs thoroughly vacuumed with HEPA filters", standard: true, deep: true, moveInOut: true },
      { task: "Hardwood / tile floors vacuumed and microfiber mopped", standard: true, deep: true, moveInOut: true },
      { task: "Ceiling fans & overhead light fixtures detailed", standard: false, deep: true, moveInOut: true },
      { task: "Baseboards, door frames & trim hand-wiped throughout", standard: false, deep: true, moveInOut: true },
      { task: "Light switches & electrical faceplates sanitized", standard: false, deep: true, moveInOut: true },
      { task: "Window sills, blinds & ledges detailed", standard: false, deep: true, moveInOut: true },
      { task: "Inside closets, shelving & closet floor vacuumed", standard: false, deep: false, moveInOut: true },
      { task: "Under accessible lightweight furniture vacuumed", standard: false, deep: true, moveInOut: true },
    ],
  },
];
