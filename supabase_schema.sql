-- ==============================================================================
-- Hair Masters Luxury Salon (Indore Vijay Nagar)
-- Database Initialization & Security Migration Script
-- Supabase PostgreSQL + Row Level Security (RLS)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Drop existing tables if re-running (safe initialization)
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.stylists CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- ==============================================================================
-- Table: Profiles (Extends Supabase auth.users)
-- ==============================================================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for role lookup
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- ==============================================================================
-- Table: Stylists (Master Stylists, Colorists, Aestheticians)
-- ==============================================================================
CREATE TABLE public.stylists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    rating NUMERIC(3, 2) DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5.00),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- Table: Services (Luxury Hair, Spa, Skin, Bridal, Groom, Nails)
-- ==============================================================================
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL CHECK (category IN (
        'Hair Styling',
        'Hair Spa & Treatments',
        'Skin & Facials',
        'Bridal & Makeup',
        'Groom Grooming',
        'Nail Art'
    )),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    duration_mins INTEGER NOT NULL CHECK (duration_mins > 0),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for category search
CREATE INDEX idx_services_category ON public.services(category);

-- ==============================================================================
-- Table: Appointments
-- ==============================================================================
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE RESTRICT,
    stylist_id UUID REFERENCES public.stylists(id) ON DELETE SET NULL,
    appointment_date TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for fast appointment queries
CREATE INDEX idx_appointments_user ON public.appointments(user_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_appointments_status ON public.appointments(status);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stylists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Helper function to check if the requesting user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- PROFILES POLICIES
-- ------------------------------------------------------------------------------
-- Anyone authenticated can read their own profile; admins can read all profiles
CREATE POLICY "Users can view own profile or admin can view all"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Users can update their own profile; admins can update any
CREATE POLICY "Users can update own profile or admin can update any"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id OR public.is_admin())
    WITH CHECK (auth.uid() = id OR public.is_admin());

-- ------------------------------------------------------------------------------
-- STYLISTS POLICIES
-- ------------------------------------------------------------------------------
-- Public read access: Anyone (authenticated or guest) can view stylists
CREATE POLICY "Anyone can view stylists"
    ON public.stylists
    FOR SELECT
    USING (true);

-- Admin write access
CREATE POLICY "Admins can insert stylists"
    ON public.stylists
    FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update stylists"
    ON public.stylists
    FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete stylists"
    ON public.stylists
    FOR DELETE
    USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- SERVICES POLICIES
-- ------------------------------------------------------------------------------
-- Public read access: Anyone can browse salon services & prices
CREATE POLICY "Anyone can view services"
    ON public.services
    FOR SELECT
    USING (true);

-- Admin write access
CREATE POLICY "Admins can insert services"
    ON public.services
    FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update services"
    ON public.services
    FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete services"
    ON public.services
    FOR DELETE
    USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- APPOINTMENTS POLICIES
-- ------------------------------------------------------------------------------
-- Users can see their own appointments; Admins can view all appointments
CREATE POLICY "Users can view own appointments, admins can view all"
    ON public.appointments
    FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

-- Users can insert appointments for themselves
CREATE POLICY "Users can book appointments"
    ON public.appointments
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can reschedule or cancel their own pending/confirmed appointments; Admins can update any
CREATE POLICY "Users can update own appointments, admins can update any"
    ON public.appointments
    FOR UPDATE
    USING (auth.uid() = user_id OR public.is_admin())
    WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- Admins can delete appointments if necessary
CREATE POLICY "Admins can delete appointments"
    ON public.appointments
    FOR DELETE
    USING (public.is_admin());

-- ==============================================================================
-- Automatic Profile Creation on Signup (Trigger)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Valued Guest'),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'client')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- Seed Data: Master Stylists & Curated Luxury Services
-- Hair Masters Luxury Salon (Indore Vijay Nagar)
-- ==============================================================================

-- Stylists
INSERT INTO public.stylists (id, name, role, bio, image_url, rating) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'Vikramaditya Rathore',
    'Creative Director & Master Stylist',
    'With over 14 years shaping editorial hair in Milan and Mumbai, Vikramaditya leads artistic couture styling at Hair Masters Vijay Nagar.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    4.98
),
(
    '22222222-2222-2222-2222-222222222222',
    'Ananya Sen Sharma',
    'Senior Balayage & Colour Alchemist',
    'L’Oréal Professionnel Haute Colour Trophy finalist. Master of seamless butter-blonde and caramel sun-kissed melted balayage.',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    4.95
),
(
    '33333333-3333-3333-3333-333333333333',
    'Zayn Qureshi',
    'Master Barber & Men’s Grooming Specialist',
    'Specializes in precision royal straight-razor fades, beard sculpting, and customized botanical scalp invigorating therapies.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    4.92
),
(
    '44444444-4444-4444-4444-444444444444',
    'Meera Kapoor',
    'Head Bridal Couturier & Makeup Artist',
    'Renowned celebrity bridal artist across Central India. Expert in high-definition luminous royal bridal looks and timeless drapery.',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    4.99
),
(
    '55555555-5555-5555-5555-555555555555',
    'Natasha D’Souza',
    'Chief Aesthetician & Skin Therapist',
    'Certified HydraFacial MD & Korean Glass Skin specialist, curating bespoke medical-grade radiance rejuvenation programs.',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    4.96
);

-- Services
INSERT INTO public.services (id, category, name, description, price, duration_mins, image_url) VALUES
-- Hair Styling
(
    'a1111111-1111-1111-1111-111111111111',
    'Hair Styling',
    'Royal Signature Couture Haircut & Blowdry',
    'Includes hair consultation, dual-cleanse massage with Kérastase elixir, personalized haircut sculpture, and red-carpet bouncy blowout.',
    1850.00,
    60,
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
),
(
    'a2222222-2222-2222-2222-222222222222',
    'Hair Styling',
    'Bespoke French Balayage & Glossing',
    'Freehand artistic dimensional hand-painting with Olaplex bond repair, followed by a customized liquid gold shine glaze.',
    7500.00,
    180,
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
),
(
    'a3333333-3333-3333-3333-333333333333',
    'Hair Styling',
    'Brazilian Diamond Keratin Infusion',
    'Formaldehyde-free smoothing ritual eliminating 95% frizz while sealing reflective mirror shine lasting up to 5 months.',
    8900.00,
    150,
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80'
),

-- Hair Spa & Treatments
(
    'b1111111-1111-1111-1111-111111111111',
    'Hair Spa & Treatments',
    'Kérastase Chronologiste Caviar Ritual',
    'The pinnacle of hair rejuvenation. Biomimetic caviar pearls and hyaluronic acid infuse unmatched softness and scalp vitality.',
    4200.00,
    75,
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80'
),
(
    'b2222222-2222-2222-2222-222222222222',
    'Hair Spa & Treatments',
    'Olaplex No. 1 & 2 Molecular Bond Builder',
    'Patented chemistry that rebuilds broken disulfide bonds, drastically revitalizing compromised or heavily bleached strands.',
    3200.00,
    60,
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80'
),

-- Skin & Facials
(
    'c1111111-1111-1111-1111-111111111111',
    'Skin & Facials',
    '24K Gold Imperial Radiance Facial',
    'Pure 24-karat gold leaf therapy paired with micro-current lifting and antioxidant serums for an illuminated, sculpted contour.',
    5500.00,
    90,
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
),
(
    'c2222222-2222-2222-2222-222222222222',
    'Skin & Facials',
    'HydraFacial Elite MD Detox & Glow',
    'Vortex-Fusion technology deep cleanses, extracts sebum and dead cells, then bathes skin in targeted peptides and hyaluronic nectar.',
    6500.00,
    75,
    'https://images.unsplash.com/photo-1512290900672-1f02e6a0d0a5?auto=format&fit=crop&w=800&q=80'
),

-- Bridal & Makeup
(
    'd1111111-1111-1111-1111-111111111111',
    'Bridal & Makeup',
    'The Maharani Haute Bridal Couture Package',
    'Complete pre-bridal consultation, HD Airbrush makeup, intricate designer hair styling, jewelry setting, dupatta draping, and touch-up kit.',
    28000.00,
    240,
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
),
(
    'd2222222-2222-2222-2222-222222222222',
    'Bridal & Makeup',
    'Cocktail & Sangeet Red Carpet Glamour',
    'Smokey metallic eyes, glass skin glow, false mink lashes, and Hollywood waves tailored for evening celebrations.',
    7000.00,
    90,
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80'
),

-- Groom Grooming
(
    'e1111111-1111-1111-1111-111111111111',
    'Groom Grooming',
    'The Royal Groom Deluxe Experience',
    'Master shear haircut, hot towel straight-razor shave, beard oil nourishment, diamond scalp massage, and quick brightening facial.',
    3800.00,
    90,
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80'
),
(
    'e2222222-2222-2222-2222-222222222222',
    'Groom Grooming',
    'Artisanal Beard Sculpture & Charcoal Detox',
    'Precise razor shaping with activated charcoal pore cleansing and ozone steam to soften bristly facial hair.',
    1600.00,
    45,
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
),

-- Nail Art
(
    'f1111111-1111-1111-1111-111111111111',
    'Nail Art',
    'Russian Gel Manicure with Champagne Chrome',
    'Dry e-file precision cuticle work, structural gel builder, and mirror chrome finish with micro-crystals.',
    2800.00,
    75,
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80'
),
(
    'f2222222-2222-2222-2222-222222222222',
    'Nail Art',
    'Luxury Rose Petal & Milk Pedicure Spa',
    'Organic rose water soak, Dead Sea salt scrub, paraffin wax envelopment, and deep reflexology pressure massage.',
    2400.00,
    60,
    'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80'
);
