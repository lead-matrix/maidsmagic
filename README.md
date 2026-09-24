# ✨ MaidsMagic — Premier Riverside Luxury Cleaning Platform

> **"The Ultimate Clean for Riverside Homes"**  
> Luxury residential and commercial cleaning platform crafted with Next.js (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL, and Framer Motion.

---

## 🌟 Overview & Architecture

**MaidsMagic** (`1405 Spruce St, Riverside, CA 92507` • `+1 (951) 697-9000`) is an end-to-end luxury cleaning SaaS platform engineered for high conversion, hyper-local trust, and rapid dispatch across Riverside, California.

### Key Highlights
- **Visual Style**: High-end luxury hospitality meets modern minimalism. Deep Emerald (`#064e3b`), Champagne Gold (`#f59e0b`), Midnight Slate (`#0b1320`), and Frost White.
- **Micro-Interactions & Motion**: Buttery-smooth Framer Motion viewport reveals, interactive before/after image comparison slider, and interactive quote pricing updates.
- **Conversion Flow**: Zero payment friction—clients configure quotes in 60 seconds and confirm bookings without upfront credit card barriers.
- **Riverside Local SEO & JSON-LD**: Schema.org `LocalBusiness`, `CleaningService`, and `AggregateRating` structured data for 5-star Google snippets.

---

## 📁 Project Directory Structure

```
maidsmagic/
├── public/
│   └── images/
│       ├── maidsmagic-logo.jpg          # Official Stylized MM Logo
│       └── maidsmagic-gmb-card.png      # Google Business Card & Photos
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # Root layout with SEO metadata & fonts
│   │   ├── page.tsx                     # Luxury Public Landing & Booking Page
│   │   ├── quote/page.tsx               # Dedicated Quote & Booking Engine
│   │   ├── admin/page.tsx               # MaidsMagic Command Center & Dispatcher
│   │   └── globals.css                  # Custom Emerald & Gold design tokens
│   ├── actions/
│   │   ├── booking-actions.ts           # Server Actions for Zod booking creation
│   │   ├── quote-actions.ts             # Quote calculation & recovery actions
│   │   └── chat-actions.ts              # Visitor live chat & admin reply actions
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx               # Glassmorphism header with phone & CTA
│   │   │   └── Footer.tsx               # Luxury footer with Riverside address
│   │   ├── home/
│   │   │   ├── HeroSection.tsx          # Value prop, trust badges & stats
│   │   │   ├── ServicesGrid.tsx         # 5 Core cleaning services & pricing
│   │   │   ├── BeforeAfterSlider.tsx    # Interactive draggable comparison
│   │   │   ├── RiversideNeighborhoods.tsx # Zip code checker & area badges
│   │   │   ├── CleaningChecklist.tsx    # Scope matrix (Standard vs Deep vs Move-Out)
│   │   │   ├── VerifiedGoogleReviews.tsx # 5.0★ Google Reviews with JSON-LD
│   │   │   ├── RiversideGuarantee.tsx   # 100% Sparkle Guarantee & $2M policy
│   │   │   └── FAQSection.tsx           # High-intent customer Q&A accordion
│   │   ├── booking/
│   │   │   ├── InstantQuoteEngine.tsx   # Master 3-Step Wizard Engine
│   │   │   ├── Step1PropertySpecs.tsx   # Sq-ft slider, bedrooms, bathrooms
│   │   │   ├── Step2AddOnSelector.tsx   # Oven, Fridge, Windows, Pet Hair
│   │   │   ├── Step3ScheduleContact.tsx # Date picker, recurring discounts
│   │   │   ├── BookingSummaryCard.tsx   # Real-time itemized live quote card
│   │   │   └── BookingConfirmationModal.tsx # Celebration modal & reference ID
│   │   ├── chat/
│   │   │   └── LiveChatWidget.tsx       # Floating concierge widget
│   │   ├── admin/
│   │   │   ├── AdminHeader.tsx          # Live status & sync controls
│   │   │   ├── MetricsOverview.tsx      # Revenue, pipeline & crew metrics
│   │   │   ├── LiveOrderBoard.tsx       # Kanban & Table views with status management
│   │   │   ├── LiveChatInbox.tsx        # Real-time customer chat management
│   │   │   ├── AbandonedQuotesConsole.tsx # 1-Click SMS/Email recovery
│   │   │   └── CleanerDispatcher.tsx    # Specialist roster & zip assignments
│   │   └── seo/
│   │       └── LocalBusinessJsonLd.tsx  # Schema.org structured data
│   ├── lib/
│   │   ├── types/index.ts               # Strict TypeScript models
│   │   ├── validations/                 # Zod validation schemas
│   │   ├── constants/riverside-data.ts  # Company info, reviews, crews & zips
│   │   ├── constants/checklist-data.ts  # Scope comparison checklist
│   │   ├── utils/pricing-calculator.ts  # Authoritative deterministic pricing
│   │   ├── store/mock-data.ts           # Rich Riverside mock database
│   │   └── supabase/                    # Supabase client & server config
│   └── supabase/
│       └── schema.sql                   # Full PostgreSQL database schema + RLS
```

---

## 🗄️ Database Architecture (`supabase/schema.sql`)

The database is built on PostgreSQL with Row Level Security (RLS) enabled on all tables:
1. `profiles`: Admin, staff, and customer accounts.
2. `services`: Predefined packages (Standard, Deep Clean, Move-In/Out, Airbnb, Urgent).
3. `add_ons`: Focus areas (Inside Oven, Inside Fridge, Windows, Pet Hair Detail, Baseboards).
4. `cleaners`: Verified Riverside specialists with assigned zip codes and ratings.
5. `bookings`: Complete customer reservations, property specs, totals, and statuses.
6. `quotes`: Abandoned quote tracking for promotional recovery.
7. `chat_conversations` & `chat_messages`: Live visitor interactions synced to the dispatcher.
8. `reviews`: 5-star verified Google reviews.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` or `v20+` or `v24+`
- npm `v10+`

### Installation & Run
```bash
# 1. Clone or navigate to the project directory
cd maidsmagic

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public experience or [http://localhost:3000/admin](http://localhost:3000/admin) for the Dispatch Command Center.

---

## 🏆 Key Features Implemented

### 1. High-Converting Instant Quote & Booking Engine
- **Step 1: Property Specs**: Interactive sliders for square footage (500–6,000+ sq ft), steppers for bedrooms, full baths, and half baths.
- **Step 2: Luxury Add-On Selectors**: Visual toggle cards for Inside Oven, Inside Fridge, Interior Windows, Pet Hair Detail, Baseboards, Inside Cabinets, Eco Green Supplies, and Patio Sweeps.
- **Step 3: Schedule & Frequency**: Automatic recurring discounts (**Weekly -20%**, **Bi-Weekly -15%**, **Monthly -10%**), date picker, arrival windows, and Zod contact validation.

### 2. Hyper-Local Riverside Trust Architecture
- **Riverside Zip Code Checker**: Validates local zip codes (`92501`, `92506`, `92508`, `92507`, etc.) with instant neighborhood feedback.
- **Before & After Slider**: Touch-and-mouse interactive image reveal showcasing marble kitchens, spa bathrooms, and hardwood restorations.
- **Google Verified Reviews**: Schema.org JSON-LD structured data, 3-column desktop grid with hover glow, mobile carousel, and outbound Google Maps profile link.

### 3. MaidsMagic Command Center (`/admin`)
- **Live Order Board**: Kanban & Table views to transition booking statuses (`Pending` ➔ `Confirmed` ➔ `Dispatched` ➔ `Completed`).
- **Live Communication Hub**: Real-time two-way chat inbox with instant admin reply capability.
- **Abandoned Quote Recovery Console**: 1-click SMS/Email trigger with promo code `RIVERSIDE10`.
- **Cleaner Dispatcher**: Track specialist crew duty status, ratings, completed jobs, and assigned Riverside zip codes.
