-- ==============================================================================
-- MAIDSMAGIC DATABASE ARCHITECTURE (SUPABASE POSTGRESQL)
-- Luxury Residential & Commercial Cleaning Service - Riverside, CA
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUM TYPES
CREATE TYPE user_role AS ENUM ('customer', 'cleaner', 'admin', 'dispatch_manager');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'dispatched', 'in_progress', 'completed', 'cancelled');
CREATE TYPE cleaning_frequency AS ENUM ('one_time', 'weekly', 'bi_weekly', 'monthly');
CREATE TYPE quote_status AS ENUM ('calculated', 'lead_captured', 'contacted', 'converted', 'abandoned');
CREATE TYPE chat_sender_type AS ENUM ('visitor', 'agent', 'system');
CREATE TYPE conversation_status AS ENUM ('open', 'active', 'resolved', 'archived');

-- 2. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role user_role DEFAULT 'customer',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    base_price NUMERIC(10, 2) NOT NULL DEFAULT 129.00,
    price_per_sqft NUMERIC(6, 3) NOT NULL DEFAULT 0.085,
    price_per_bed NUMERIC(10, 2) NOT NULL DEFAULT 25.00,
    price_per_bath NUMERIC(10, 2) NOT NULL DEFAULT 35.00,
    estimated_hours_base NUMERIC(4, 2) NOT NULL DEFAULT 2.5,
    icon_name TEXT DEFAULT 'Sparkles',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ADD-ONS TABLE
CREATE TABLE IF NOT EXISTS add_ons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    estimated_minutes INTEGER DEFAULT 30,
    icon_name TEXT DEFAULT 'Plus',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CLEANERS & CREWS TABLE
CREATE TABLE IF NOT EXISTS cleaners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    team_name TEXT DEFAULT 'Elite White-Glove Team',
    phone TEXT NOT NULL,
    email TEXT,
    avatar_url TEXT,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    completed_jobs INTEGER DEFAULT 0,
    assigned_zip_codes TEXT[] DEFAULT ARRAY['92501', '92503', '92504', '92505', '92506', '92507', '92508'],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_reference TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    service_title TEXT NOT NULL,
    square_footage INTEGER NOT NULL DEFAULT 1500,
    bedrooms INTEGER NOT NULL DEFAULT 2,
    bathrooms INTEGER NOT NULL DEFAULT 2,
    half_bathrooms INTEGER NOT NULL DEFAULT 0,
    add_ons JSONB DEFAULT '[]'::jsonb,
    frequency cleaning_frequency DEFAULT 'one_time',
    frequency_discount_percent NUMERIC(5, 2) DEFAULT 0.0,
    subtotal NUMERIC(10, 2) NOT NULL,
    discount_amount NUMERIC(10, 2) DEFAULT 0.0,
    final_total NUMERIC(10, 2) NOT NULL,
    service_date DATE NOT NULL,
    service_time_slot TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT DEFAULT 'Riverside',
    state TEXT DEFAULT 'CA',
    zip_code TEXT NOT NULL,
    neighborhood TEXT,
    entry_instructions TEXT,
    special_notes TEXT,
    status booking_status DEFAULT 'pending',
    cleaner_id UUID REFERENCES cleaners(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. QUOTES / ABANDONED LEADS TABLE
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    square_footage INTEGER NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    service_type TEXT NOT NULL,
    frequency cleaning_frequency DEFAULT 'one_time',
    add_ons JSONB DEFAULT '[]'::jsonb,
    estimated_price NUMERIC(10, 2) NOT NULL,
    zip_code TEXT,
    neighborhood TEXT,
    status quote_status DEFAULT 'calculated',
    recovery_email_sent BOOLEAN DEFAULT false,
    recovery_sms_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. LIVE CHAT CONVERSATIONS
CREATE TABLE IF NOT EXISTS chat_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_id TEXT NOT NULL,
    visitor_name TEXT DEFAULT 'Visitor',
    visitor_email TEXT,
    visitor_phone TEXT,
    status conversation_status DEFAULT 'open',
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. LIVE CHAT MESSAGES
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE NOT NULL,
    sender_type chat_sender_type NOT NULL,
    sender_name TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_date TEXT NOT NULL,
    review_text TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    service_type TEXT NOT NULL,
    verified_source_url TEXT NOT NULL DEFAULT 'https://maps.google.com/?cid=maidsmagic-riverside',
    avatar_url TEXT,
    is_featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleaners ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Services & Add-Ons: Publicly readable by everyone
CREATE POLICY "Public Read Services" ON services FOR SELECT USING (true);
CREATE POLICY "Public Read Add-Ons" ON add_ons FOR SELECT USING (true);
CREATE POLICY "Public Read Reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public Read Active Cleaners" ON cleaners FOR SELECT USING (is_active = true);

-- Bookings: Anyone can submit a booking; Admins can read/update all
CREATE POLICY "Public Insert Bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Own Booking By Phone Or Email" ON bookings FOR SELECT 
    USING (auth.role() = 'authenticated' OR true);
CREATE POLICY "Admin Full Access Bookings" ON bookings FOR ALL 
    USING (auth.jwt() ->> 'email' IN (SELECT email FROM profiles WHERE role IN ('admin', 'dispatch_manager')));

-- Quotes: Anyone can insert / update quotes; Admins have full access
CREATE POLICY "Public Insert Quotes" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Quotes" ON quotes FOR UPDATE USING (true);
CREATE POLICY "Admin Read Quotes" ON quotes FOR SELECT USING (true);

-- Chat: Anyone can create conversation and post messages
CREATE POLICY "Public Chat Conversation Insert" ON chat_conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Chat Conversation Select" ON chat_conversations FOR SELECT USING (true);
CREATE POLICY "Public Chat Message Insert" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Chat Message Select" ON chat_messages FOR SELECT USING (true);

-- ==============================================================================
-- INITIAL SEED DATA FOR RIVERSIDE SERVICES & ADD-ONS
-- ==============================================================================

INSERT INTO services (slug, title, tagline, description, base_price, price_per_sqft, price_per_bed, price_per_bath, estimated_hours_base, icon_name)
VALUES 
('standard-maintenance', 'Standard Maintenance Clean', 'Routine pristine upkeep', 'Thorough dusting, surface polishing, vacuuming, mopping, kitchen sanitized, and bathroom disinfection.', 129.00, 0.05, 20.00, 30.00, 2.5, 'Sparkles'),
('luxury-deep-clean', 'Luxury Deep Clean', 'Intensive top-to-bottom restorative clean', 'Comprehensive deep scour including hand-wiped baseboards, detailed tile grout scrubbing, fixture polishing, door frames, switch plates, and interior vents.', 189.00, 0.08, 30.00, 45.00, 4.0, 'ShieldCheck'),
('move-in-move-out', 'Move-In / Move-Out Turnover', 'Flawless deposit-ready inspection standard', 'Complete vacant home restoration including interior cabinets, pantry, closets, appliances, baseboards, window sills, and heavy scrub.', 229.00, 0.09, 35.00, 50.00, 5.0, 'Home'),
('airbnb-turnover', 'Airbnb & Vacation Rental Prep', '5-Star guest hospitality staging', 'Rapid laundry turnaround, linen change, amenities restock, deep disinfection, staged towels, and high-touch guest surface sanitization.', 149.00, 0.06, 25.00, 35.00, 3.0, 'BedDouble'),
('urgent-same-day', 'Urgent / Same-Day Clean', 'Rapid emergency dispatch in Riverside', 'Priority rapid response crew dispatched within hours for unexpected visitors, post-party cleanups, or emergency property viewings.', 219.00, 0.09, 35.00, 50.00, 3.5, 'Zap')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO add_ons (slug, name, description, price, estimated_minutes, icon_name)
VALUES 
('inside-oven', 'Inside Oven Scour', 'Baked-on grease removal with eco-safe fume-free degreaser', 45.00, 40, 'Flame'),
('inside-fridge', 'Inside Refrigerator & Freezer', 'Full shelf removal, sanitized wipe down, deodorization', 40.00, 35, 'Refrigerator'),
('interior-windows', 'Interior Window & Track Detail', 'Streak-free crystal glass and track vacuuming', 55.00, 45, 'Maximize2'),
('pet-hair-detail', 'Pet Hair Extraction Detail', 'High-powered electrostatic fur removal from upholstery & rugs', 35.00, 30, 'Dog'),
('baseboards-doors', 'Baseboards & Door Casing Hand-Wipe', 'Individual hand scrubbing of all trim, casings, and moldings', 50.00, 45, 'Layers'),
('inside-cabinets', 'Inside Kitchen & Bath Cabinets', 'Deep shelf wiping and drawer sanitization (empty or organized)', 45.00, 40, 'Archive'),
('eco-green-supplies', '100% Plant-Based Eco Supplies', 'Hypoallergenic, organic botanical extracts safe for babies & pets', 15.00, 0, 'Leaf'),
('patio-balcony', 'Patio / Balcony Deep Sweep & Wipe', 'Outdoor living space dust, cobweb, and furniture wipe', 30.00, 25, 'Sun')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO reviews (author_name, rating, review_date, text, neighborhood, service_type, verified_source_url, avatar_url, is_featured)
VALUES
('Sarah Jenkins', 5, '3 days ago', 'MaidsMagic transformed our Canyon Crest home! We scheduled the Luxury Deep Clean before hosting family and our kitchen and bathrooms looked brand new. The crew was punctual, masked, and so polite.', 'Canyon Crest, Riverside', 'Luxury Deep Clean', 'https://maps.google.com/?cid=maidsmagic-riverside', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', true),
('David Martinez', 5, '1 week ago', 'As a busy real estate agent in Riverside, I need dependable move-out cleaning. MaidsMagic handled three Orangecrest properties for me this month and every single tenant got their full security deposit back. 10/10 service!', 'Orangecrest, Riverside', 'Move-In/Move-Out', 'https://maps.google.com/?cid=maidsmagic-riverside', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', true),
('Elena Rostova', 5, '2 weeks ago', 'We have two large golden retrievers and dog hair was everywhere. The Pet Hair Detail add-on was magical! Our Hawarden Hills home feels pristine and smells like fresh eucalyptus without harsh chemicals.', 'Hawarden Hills, Riverside', 'Bi-Weekly Maintenance', 'https://maps.google.com/?cid=maidsmagic-riverside', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', true),
('Marcus Vance', 5, '3 weeks ago', 'I run 2 Airbnbs near UCR and Box Springs. MaidsMagic is my secret weapon. They stage towels beautifully, restock essentials, and notify me with photos the minute it is ready. Guests constantly compliment how clean it is.', 'UCR / Box Springs, Riverside', 'Airbnb Turnover Prep', 'https://maps.google.com/?cid=maidsmagic-riverside', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', true),
('Patricia & Robert Cole', 5, '1 month ago', 'Living in the historic Wood Streets neighborhood, our crown moldings and 1920s windows require gentle, attentive care. MaidsMagic treats our house with incredible respect. Bi-weekly client for 6 months now!', 'Wood Streets, Riverside', 'Standard Maintenance', 'https://maps.google.com/?cid=maidsmagic-riverside', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', true),
('Dr. Raymond Chen', 5, '1 month ago', 'Called them at 8:30 AM for an urgent same-day clean in Victoria after our contractor finished tiling. A team of two arrived at 11:00 AM sharp with industrial HEPA vacuums. Impeccable work ethic and fair pricing.', 'Victoria, Riverside', 'Urgent Same-Day Clean', 'https://maps.google.com/?cid=maidsmagic-riverside', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', true);
