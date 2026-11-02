# Hair Masters Luxury Salon (Indore Vijay Nagar)
### Ultra-Luxury Salon Web Application & Management Suite

Inspired by the prestigious **Hair Masters Luxury Salon** location in **PU-4 / Scheme No. 54, Vijay Nagar, Indore**. Built with high-fashion aesthetics, dark obsidian tones, warm champagne/metallic gold highlights, sophisticated serif typography (*Playfair Display & Cinzel*), and buttery-smooth micro-interactions.

---

## 💎 Features & Architecture

1. **Ultra-Luxury Landing Experience:**
   - Cinematic hero section with dark gradient parallax styling.
   - Distinctive location badging for Indore Vijay Nagar.
   - Signature highlights: Private VIP Suites, French & Italian formulations (Kérastase, Olaplex, Dyson), and 24K dermal gold therapies.
   - Voices of Distinction: Royal patron reviews & rotating quote carousel.
   - Live Lookbook Instagram integration.

2. **Interactive 5-Step Booking & Appointment Engine:**
   - **Step 1:** Select Sanctuary Discipline (Hair Styling, Hair Spa, Skin & Facials, Bridal & Makeup, Groom Grooming, Nail Art).
   - **Step 2:** Choose Primary Treatment & Add-Ons with real-time running investment total (₹ INR) and duration.
   - **Step 3:** Select Master Stylist with photos, certifications, and ratings or choose *Any Available Expert*.
   - **Step 4:** Interactive 14-day calendar date picker & time slots (Morning Serenity, Afternoon Indulgence, Twilight Radiance) with booked-slot collision prevention.
   - **Step 5:** Client particulars, special occasion notes, instant reservation reference, and luxury confetti celebration (`canvas-confetti`).

3. **Client Authentication & Dashboard:**
   - Supabase Auth (Email & Password, Google OAuth).
   - Dedicated Client Portal displaying **Upcoming Appointments**, **Past History**, **Saved/Favorited Services**, and **Profile Credentials**.
   - Instant 1-click evaluation access buttons (*Client Demo* & *Director Demo*).
   - Live cancellation and status update flows.

4. **Dynamic Services & Pricing Catalog:**
   - Filterable category chips with live search bar.
   - Interactive Service Detail modal showcasing full treatment description, duration, starting price, and recommended hair/skin type.

5. **Stylist Guild Showcase:**
   - Dedicated artists page showcasing creative directors, balayage alchemists, barbers, and bridal couturiers with bios, ratings, and specialties.

6. **Haute Lookbook & Lightbox:**
   - Filterable lookbook gallery across Bridal, Hair Transformations, Men's Grooming, Skin Radiance, and Nail Art.
   - Lightbox modal with artist attribution and direct *"Reserve This Look"* action.

7. **Director / Salon Manager Portal (Role-Based RLS Protected):**
   - Protected route (`/admin`) for salon directors and managers.
   - Real-time appointment management table: filter by status (*Pending, Confirmed, Completed, Cancelled*), search by client or notes, one-click status transitions (*Approve, Complete, Cancel*).
   - Service & pricing management: modal to add or edit rituals directly synced to Supabase.
   - Executive KPIs: Total pipeline revenue, pending reviews, confirmed appointments, active stylists.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Canvas Confetti.
- **Backend & Database:** Supabase (PostgreSQL, Row Level Security, Auth, Storage).
- **Routing & State:** React Router v6, Context API (AuthContext, BookingContext).
- **Deployment:** Pre-configured for **Vercel** (`vercel.json` included).

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
The project is already pre-configured with your Supabase credentials in `.env`:
```env
VITE_SUPABASE_URL=https://szdytmelbhxsjalsmzva.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_OhnDovaegyvASQGlmKajBA_cnHx-K7e
```

### 3. Initialize Supabase Database
Open your [Supabase SQL Editor](https://supabase.com/dashboard/project/szdytmelbhxsjalsmzva/sql) and run the contents of:
```
supabase_schema.sql
```
This initializes:
- `profiles` table with automatic signup trigger `on_auth_user_created`
- `stylists` table with 5 master stylists pre-seeded
- `services` table with 13 luxury rituals pre-seeded
- `appointments` table with foreign key relationships
- Row Level Security (RLS) policies for clients and salon directors.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
```
Optimized vendor and UI chunks are output to `dist/`.

---

## 🚀 Vercel Deployment

Deploy with one click or via Vercel CLI:
```bash
vercel --prod
```
The included `vercel.json` ensures all SPA client-side routes (`/services`, `/book`, `/dashboard`, `/admin`, `/lookbook`) are seamlessly rewritten to `/index.html`.
