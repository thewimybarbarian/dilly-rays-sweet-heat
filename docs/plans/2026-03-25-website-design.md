# Dilly Ray's Sweet Heat — Website Design

**Date:** 2026-03-25
**Status:** Approved
**Authors:** Jason Flick, Dylan Johnson

## Overview

Website for Dilly Ray's Sweet Heat — a BBQ food truck operating out of a double-decker bus (top level is dine-in seating). The site serves as both a brand presence and a full online ordering system with admin management.

## Visual Identity

### Style: Semi-Brutalist + Fire Energy

- **Primary Colors:** Deep red (#B91C1C), black (#0A0A0A)
- **Accent Colors:** Flame orange (#EA580C), ember yellow (#F59E0B), white (#FAFAFA)
- **Typography:** Chunky display fonts for headings (Impact/Bebas Neue style), clean sans-serif for body/menu
- **Textures:** Smoke/char grain overlays, raw textured backgrounds — no clean gradients
- **Animations:** Falling chili pepper particles (canvas/CSS), flame lick hover effects, shake/rumble on CTAs
- **Mascot:** The pig with chili pepper featured prominently — hero, loading states, 404 page
- **Buttons:** Oversized, pepper-shaped or flame-bordered. Hover = sizzle effect.

## Pages

### Home (/)
- Full-viewport hero with bus photo + mascot overlay
- Falling peppers particle animation
- Giant "ORDER NOW" CTA
- Quick menu preview (featured items)
- Location/hours strip
- Social proof / Instagram feed

### Menu (/menu)
- Category tabs: Mains, Sides, Drinks, Sauces
- Item cards with photo, name, description, price, heat rating (pepper icons)
- Add-to-cart buttons on each item
- Spice level filter
- Items pulled from Supabase, togglable availability

### About (/about)
- The story of the bus and the brand
- Jason & Dylan bios
- Photo gallery of the double-decker interior, food shots
- The "Sweet Heat" philosophy

### Contact (/contact)
- Catering inquiry form (name, email, event date, details)
- Social media links
- "Find the Bus" — upcoming locations with dates/times
- Embedded map

### Cart / Checkout
- Slide-out cart drawer (accessible from any page)
- Order summary with item quantities, subtotal
- Customer info: name, phone, pickup time
- Stripe Checkout integration
- Order confirmation page with pickup details

### Admin (/admin)
- Protected route (Supabase auth)
- Menu management: add/edit/remove items, toggle availability, reorder
- Order dashboard: real-time incoming orders (Supabase Realtime)
- Order status management: pending → confirmed → ready → picked up
- Location schedule management

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 + React 19 + TypeScript |
| Routing | App Router |
| Styling | Tailwind CSS 4 + custom design tokens |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (admin only) |
| Payments | Stripe Checkout Sessions + Webhooks |
| Animations | Framer Motion + CSS/Canvas particles |
| Hosting | Vercel |
| Realtime | Supabase Realtime (order dashboard) |

## Data Model

### menu_items
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | text | |
| description | text | |
| price | numeric | In cents |
| category | text | mains, sides, drinks, sauces |
| image_url | text | Supabase Storage |
| heat_level | int | 0-5 (pepper rating) |
| available | boolean | Toggle from admin |
| sort_order | int | Display ordering |
| created_at | timestamptz | |

### orders
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| items | jsonb | Array of {menu_item_id, name, price, quantity} |
| total | numeric | In cents |
| status | text | pending, confirmed, ready, picked_up |
| customer_name | text | |
| customer_phone | text | |
| pickup_time | timestamptz | |
| stripe_session_id | text | |
| created_at | timestamptz | |

### locations
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name | text | Event/location name |
| address | text | |
| date | date | |
| start_time | time | |
| end_time | time | |
| notes | text | Optional |

## Ordering Flow

1. Customer browses menu → adds items to cart (client-side state)
2. Opens cart drawer → reviews order → enters name, phone, pickup time
3. Clicks "Pay" → Server Action creates Stripe Checkout Session
4. Stripe redirects to success page → webhook fires → order saved to Supabase (status: confirmed)
5. Admin dashboard shows new order via Supabase Realtime
6. Admin marks order ready → picked_up
7. Stretch goal: SMS notification via Twilio when order is ready

## Project Structure

```
dilly-rays-sweet-heat/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, global styles
│   │   ├── page.tsx            # Home
│   │   ├── menu/page.tsx       # Menu + ordering
│   │   ├── about/page.tsx      # About the bus & team
│   │   ├── contact/page.tsx    # Contact + find the bus
│   │   ├── checkout/
│   │   │   ├── page.tsx        # Checkout flow
│   │   │   └── success/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx      # Auth-protected layout
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── menu/page.tsx   # Menu management
│   │   │   ├── orders/page.tsx # Order management
│   │   │   └── locations/page.tsx
│   │   └── api/
│   │       ├── checkout/route.ts    # Stripe session creation
│   │       └── webhooks/stripe/route.ts
│   ├── components/
│   │   ├── ui/                 # Brutalist UI primitives
│   │   ├── layout/             # Navbar, Footer, CartDrawer
│   │   ├── home/               # Hero, FeaturedMenu, LocationStrip
│   │   ├── menu/               # MenuCard, CategoryTabs, HeatRating
│   │   ├── cart/               # CartDrawer, CartItem, OrderForm
│   │   ├── admin/              # OrderCard, MenuEditor, etc.
│   │   └── effects/            # PepperRain, FlameEffect, SmokeOverlay
│   ├── lib/
│   │   ├── supabase/           # Client, server, types
│   │   ├── stripe/             # Config, helpers
│   │   └── utils.ts
│   ├── hooks/                  # useCart, useOrders, etc.
│   └── types/                  # Shared TypeScript types
├── public/
│   ├── images/                 # Bus photos, food shots
│   ├── mascot/                 # Pig SVGs and variations
│   └── textures/               # Grain overlays, smoke
├── docs/plans/
├── supabase/migrations/
└── ...config files
```
