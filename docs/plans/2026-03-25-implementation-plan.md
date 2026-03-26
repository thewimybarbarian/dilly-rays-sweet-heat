# Dilly Ray's Sweet Heat — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a semi-brutalist BBQ food truck website with full online ordering, Stripe payments, Supabase backend, and admin dashboard.

**Architecture:** Next.js 16 App Router with server components for menu/about/contact pages, client components for cart/ordering/admin. Supabase handles database + auth + realtime. Stripe handles payment via Checkout Sessions + webhooks. Cart state managed client-side via React context + localStorage persistence.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Supabase, Stripe, Framer Motion

---

## Phase 1: Project Scaffold & Design System

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

**Step 1: Scaffold Next.js with create-next-app**

```bash
cd C:/Users/jason/OneDrive/Desktop/projects/dilly-rays-sweet-heat
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-turbopack --import-alias "@/*"
```

Answer prompts: Yes to all defaults. This overwrites nothing since the project is empty (just docs/).

**Step 2: Verify the scaffold runs**

```bash
npm run dev
```

Expected: Dev server starts at http://localhost:3000, default Next.js page renders.

**Step 3: Install project dependencies**

```bash
npm install @supabase/supabase-js stripe framer-motion
npm install -D @types/stripe
```

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 16 project with dependencies"
```

---

### Task 2: Brutalist Design System — Tailwind Config & Global Styles

**Files:**
- Modify: `src/app/globals.css`
- Create: `tailwind.config.ts` (if not using CSS-based config)
- Create: `public/textures/grain.png` (placeholder)

**Step 1: Set up Tailwind CSS 4 custom theme in globals.css**

Add custom CSS variables and Tailwind theme tokens for the brutalist palette:

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-heat-red: #B91C1C;
  --color-heat-red-dark: #991B1B;
  --color-heat-red-light: #DC2626;
  --color-heat-black: #0A0A0A;
  --color-heat-charcoal: #1C1917;
  --color-heat-orange: #EA580C;
  --color-heat-ember: #F59E0B;
  --color-heat-white: #FAFAFA;
  --color-heat-smoke: #292524;

  /* Fonts */
  --font-display: "Bebas Neue", Impact, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;

  /* Animations */
  --animate-shake: shake 0.5s ease-in-out;
  --animate-flame: flame 2s ease-in-out infinite;
  --animate-sizzle: sizzle 0.3s ease-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px) rotate(-1deg); }
  75% { transform: translateX(4px) rotate(1deg); }
}

@keyframes flame {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.8; transform: scaleY(1.1); }
}

@keyframes sizzle {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

**Step 2: Add Google Fonts to layout.tsx**

Import Bebas Neue and Inter from `next/font/google` in `src/app/layout.tsx`.

**Step 3: Set base styles**

```css
body {
  background-color: var(--color-heat-black);
  color: var(--color-heat-white);
  font-family: var(--font-body);
}
```

**Step 4: Commit**

```bash
git add -A
git commit -m "style: add brutalist design system with red/black palette and fire animations"
```

---

### Task 3: Brutalist UI Primitives

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Input.tsx`

**Step 1: Build the Button component**

Brutalist oversized button with flame hover effect, shake on click. Variants: `primary` (red bg, black text), `secondary` (black bg, red border), `ghost` (transparent). Sizes: `sm`, `md`, `lg`, `xl`. Include a `sizzle` prop for the heat wobble animation on hover.

```tsx
"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  sizzle?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-heat-red text-heat-white border-4 border-heat-black hover:bg-heat-red-light",
  secondary: "bg-heat-black text-heat-red border-4 border-heat-red hover:bg-heat-charcoal",
  ghost: "bg-transparent text-heat-white border-4 border-heat-white hover:bg-heat-white/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-2xl font-display tracking-wider",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", sizzle = false, className = "", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={sizzle ? { scale: 1.05, rotate: [-1, 1, -1, 0] } : { scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`font-display uppercase tracking-widest cursor-pointer transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
```

**Step 2: Build Card, Badge, and Input components**

- **Card:** Black background, thick red border, raw drop-shadow (no rounded corners — brutalist). Optional `glow` prop for a red box-shadow pulse.
- **Badge:** Small pill for heat levels and categories. Red/orange/yellow variants.
- **Input:** Thick-bordered input fields, black bg, red focus ring. Include textarea variant.

**Step 3: Verify components render**

Create a temporary test page at `src/app/test/page.tsx` that renders all primitives. Verify visually at `/test`.

**Step 4: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add brutalist UI primitives — Button, Card, Badge, Input"
```

---

### Task 4: Layout Components — Navbar & Footer

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Build Navbar**

- Fixed top, black background, thick red bottom border
- Pig mascot SVG as logo (left)
- Nav links: Home, Menu, About, Contact (center/right)
- Cart icon with item count badge (right)
- Mobile: hamburger menu with full-screen red overlay
- Links use `font-display` uppercase with hover flame underline effect

**Step 2: Build Footer**

- Black background, red top border
- Social links (Instagram, Facebook, TikTok)
- "Find the Bus" quick link
- Copyright / branding
- Small pig mascot SVG

**Step 3: Wire into root layout**

Add Navbar and Footer to `src/app/layout.tsx` wrapping `{children}`.

**Step 4: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx
git commit -m "feat: add Navbar and Footer with brutalist styling"
```

---

## Phase 2: Supabase Backend

### Task 5: Supabase Project Setup & Database Schema

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/types.ts`
- Create: `.env.local` (DO NOT COMMIT)
- Create: `supabase/migrations/001_initial_schema.sql`

**Step 1: Create Supabase project**

Go to https://supabase.com/dashboard and create a new project named `dilly-rays-sweet-heat`. Note the project URL and anon key.

**Step 2: Create .env.local**

```
NEXT_PUBLIC_SUPABASE_URL=<project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
STRIPE_SECRET_KEY=<stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<webhook-signing-secret>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<stripe-pub-key>
```

**Step 3: Write the migration SQL**

```sql
-- menu_items
create table menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price integer not null, -- cents
  category text not null check (category in ('mains', 'sides', 'drinks', 'sauces')),
  image_url text,
  heat_level integer not null default 0 check (heat_level between 0 and 5),
  available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- orders
create table orders (
  id uuid primary key default gen_random_uuid(),
  items jsonb not null,
  total integer not null, -- cents
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'ready', 'picked_up')),
  customer_name text not null,
  customer_phone text not null,
  pickup_time timestamptz,
  stripe_session_id text unique,
  created_at timestamptz not null default now()
);

-- locations
create table locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  date date not null,
  start_time time not null,
  end_time time not null,
  notes text,
  created_at timestamptz not null default now()
);

-- RLS policies
alter table menu_items enable row level security;
alter table orders enable row level security;
alter table locations enable row level security;

-- Public read for menu_items (available only)
create policy "Public can read available menu items" on menu_items
  for select using (available = true);

-- Public read for locations (future dates only)
create policy "Public can read upcoming locations" on locations
  for select using (date >= current_date);

-- Service role can do everything (admin via server-side)
-- Orders are created via service role (webhook), read via service role (admin)
```

**Step 4: Run migration in Supabase SQL editor**

Copy-paste the SQL into the Supabase dashboard SQL editor and execute.

**Step 5: Create Supabase client utilities**

`src/lib/supabase/client.ts` — browser client using `createBrowserClient`
`src/lib/supabase/server.ts` — server client using `createServerClient` with cookie handling
`src/lib/supabase/types.ts` — TypeScript types matching the schema (Database type)

**Step 6: Seed sample menu data**

Insert 8-10 sample menu items via Supabase dashboard or a seed script covering all categories.

**Step 7: Commit**

```bash
git add src/lib/supabase/ supabase/
git commit -m "feat: add Supabase setup with menu_items, orders, and locations schema"
```

---

### Task 6: Shared TypeScript Types

**Files:**
- Create: `src/types/menu.ts`
- Create: `src/types/order.ts`
- Create: `src/types/location.ts`
- Create: `src/types/cart.ts`

**Step 1: Define types**

```typescript
// src/types/menu.ts
export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number; // cents
  category: "mains" | "sides" | "drinks" | "sauces";
  image_url: string | null;
  heat_level: number; // 0-5
  available: boolean;
  sort_order: number;
  created_at: string;
}

// src/types/cart.ts
export interface CartItem {
  menu_item_id: string;
  name: string;
  price: number; // cents
  quantity: number;
}

// src/types/order.ts
export type OrderStatus = "pending" | "confirmed" | "ready" | "picked_up";

export interface Order {
  id: string;
  items: CartItem[];
  total: number; // cents
  status: OrderStatus;
  customer_name: string;
  customer_phone: string;
  pickup_time: string | null;
  stripe_session_id: string | null;
  created_at: string;
}

// src/types/location.ts
export interface Location {
  id: string;
  name: string;
  address: string;
  date: string;
  start_time: string;
  end_time: string;
  notes: string | null;
}
```

**Step 2: Commit**

```bash
git add src/types/
git commit -m "feat: add shared TypeScript types for menu, cart, order, and location"
```

---

## Phase 3: Visual Effects & Animations

### Task 7: Pepper Rain Particle Effect

**Files:**
- Create: `src/components/effects/PepperRain.tsx`
- Create: `public/images/pepper.svg` (chili pepper SVG)

**Step 1: Create a chili pepper SVG**

Simple red chili pepper icon, ~40x40px viewBox, saved as `public/images/pepper.svg`.

**Step 2: Build PepperRain component**

Client component that uses a canvas or absolutely-positioned falling pepper elements. Configuration props: `density` (peppers per second), `speed` (fall speed), `wind` (horizontal drift). Uses `requestAnimationFrame` for smooth animation. Peppers rotate as they fall. Renders as a fixed overlay with `pointer-events: none` and `z-index: 0` so it sits behind content.

**Step 3: Build SmokeOverlay component**

Create `src/components/effects/SmokeOverlay.tsx` — a CSS-only subtle animated grain/smoke texture overlay using a `background-image` with noise and `mix-blend-mode: overlay`. Very subtle, adds texture to sections.

**Step 4: Build FlameEffect component**

Create `src/components/effects/FlameEffect.tsx` — a Framer Motion component that adds a flickering flame glow to any wrapped element. Uses animated `box-shadow` in red/orange.

**Step 5: Verify all effects render on the test page**

**Step 6: Commit**

```bash
git add src/components/effects/ public/images/pepper.svg
git commit -m "feat: add PepperRain, SmokeOverlay, and FlameEffect visual components"
```

---

## Phase 4: Public Pages

### Task 8: Home Page — Hero & Landing

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/FeaturedMenu.tsx`
- Create: `src/components/home/LocationStrip.tsx`

**Step 1: Build Hero section**

- Full viewport height, black background
- Bus photo as background image with dark overlay
- Pig mascot SVG large and centered/offset
- "DILLY RAY'S SWEET HEAT" in massive `font-display` text
- "ORDER NOW" Button (xl size, sizzle=true) linking to /menu
- PepperRain running behind the hero content
- Tagline: something like "BBQ SO GOOD IT BITES BACK" in red

**Step 2: Build FeaturedMenu section**

- Fetches 4 featured menu items from Supabase (server component)
- Displays them in a grid of Cards with name, price, heat rating
- "SEE FULL MENU" CTA button

**Step 3: Build LocationStrip section**

- Fetches next 3 upcoming locations from Supabase
- Horizontal strip with date, name, time
- Red background, black text, chunky type

**Step 4: Assemble Home page**

Wire Hero + FeaturedMenu + LocationStrip into `src/app/page.tsx`.

**Step 5: Commit**

```bash
git add src/app/page.tsx src/components/home/
git commit -m "feat: build Home page with hero, featured menu, and location strip"
```

---

### Task 9: Menu Page with Cart Integration

**Files:**
- Create: `src/app/menu/page.tsx`
- Create: `src/components/menu/MenuCard.tsx`
- Create: `src/components/menu/CategoryTabs.tsx`
- Create: `src/components/menu/HeatRating.tsx`
- Create: `src/hooks/useCart.tsx` (cart context + hook)
- Create: `src/components/cart/CartProvider.tsx`

**Step 1: Build Cart Context**

`src/hooks/useCart.tsx` — React context providing:
- `items: CartItem[]`
- `addItem(menuItem: MenuItem): void`
- `removeItem(menuItemId: string): void`
- `updateQuantity(menuItemId: string, quantity: number): void`
- `clearCart(): void`
- `total: number` (computed)
- `itemCount: number` (computed)
- Persists to localStorage

`src/components/cart/CartProvider.tsx` wraps the app in root layout.

**Step 2: Build HeatRating component**

Renders 1-5 pepper icons based on `heat_level`. Empty peppers for unmet levels. Red fill for met levels. Animated on hover.

**Step 3: Build MenuCard component**

Client component. Shows image, name, description, price (formatted from cents), HeatRating, and an "ADD" button that calls `addItem`. Button does the sizzle animation on click. Card has thick black border, red accent on hover.

**Step 4: Build CategoryTabs component**

Client component. Tabs for: All, Mains, Sides, Drinks, Sauces. Active tab has red background. Filters displayed menu items.

**Step 5: Build Menu page**

Server component that fetches all available menu items from Supabase. Passes to client CategoryTabs + MenuCard grid. URL search params for active category.

**Step 6: Commit**

```bash
git add src/app/menu/ src/components/menu/ src/hooks/ src/components/cart/CartProvider.tsx
git commit -m "feat: build Menu page with category tabs, menu cards, heat ratings, and cart context"
```

---

### Task 10: Cart Drawer

**Files:**
- Create: `src/components/cart/CartDrawer.tsx`
- Create: `src/components/cart/CartItem.tsx`
- Modify: `src/components/layout/Navbar.tsx` (add cart button trigger)
- Modify: `src/app/layout.tsx` (add CartDrawer)

**Step 1: Build CartItem component**

Shows item name, price, quantity controls (+/-), remove button. Compact row layout.

**Step 2: Build CartDrawer component**

- Slide-out from right (Framer Motion `AnimatePresence`)
- Black background, red border on left edge
- Header: "YOUR ORDER" in display font
- List of CartItems
- Subtotal at bottom
- "CHECKOUT" button (links to /checkout)
- "CLEAR ALL" destructive action
- Overlay behind drawer to close on click

**Step 3: Wire cart button into Navbar**

Shopping bag/cart icon in Navbar shows `itemCount` badge. Clicking opens CartDrawer.

**Step 4: Add CartDrawer to root layout**

Render CartDrawer in layout so it's accessible from any page.

**Step 5: Commit**

```bash
git add src/components/cart/ src/components/layout/Navbar.tsx src/app/layout.tsx
git commit -m "feat: add slide-out CartDrawer with item management"
```

---

### Task 11: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Build About page**

Static page with:
- Hero section: "THE STORY" heading, subtitle about the bus
- Two-column layout: Jason & Dylan bios with placeholder photos
- "The Double Decker Experience" section describing the top-level seating
- Photo gallery placeholder (grid of image placeholders)
- "THE SWEET HEAT PHILOSOPHY" section with brand story
- CTA: "HUNGRY? CHECK THE MENU" button → /menu
- SmokeOverlay on the hero section for texture

**Step 2: Commit**

```bash
git add src/app/about/
git commit -m "feat: build About page with team bios and bus story"
```

---

### Task 12: Contact Page + Location Schedule

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/components/contact/CateringForm.tsx`
- Create: `src/components/contact/LocationSchedule.tsx`

**Step 1: Build CateringForm component**

Client component with fields: name, email, phone, event date, event type (dropdown: wedding, corporate, festival, private, other), guest count, message. Submits to a Server Action that stores in Supabase (or sends email via Resend). Success/error states.

**Step 2: Build LocationSchedule component**

Server component that fetches upcoming locations from Supabase. Displays as a list/timeline with date, name, address, hours. Red date badges.

**Step 3: Assemble Contact page**

Two sections: "FIND THE BUS" (LocationSchedule) and "BOOK US" (CateringForm). Social media links.

**Step 4: Commit**

```bash
git add src/app/contact/ src/components/contact/
git commit -m "feat: build Contact page with catering form and location schedule"
```

---

## Phase 5: Checkout & Payments

### Task 13: Stripe Integration — Checkout Flow

**Files:**
- Create: `src/lib/stripe/config.ts`
- Create: `src/app/api/checkout/route.ts`
- Create: `src/app/checkout/page.tsx`
- Create: `src/app/checkout/success/page.tsx`

**Step 1: Set up Stripe config**

```typescript
// src/lib/stripe/config.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil", // use latest
});
```

**Step 2: Build checkout page**

Client component. Shows order summary from cart, input fields for customer_name, customer_phone, pickup_time. "PAY NOW" button triggers Server Action.

**Step 3: Build checkout API route**

`POST /api/checkout` — receives cart items + customer info. Creates a Stripe Checkout Session with line items derived from cart. Returns the session URL. Client redirects to Stripe.

```typescript
// Pseudocode for route handler:
// 1. Validate cart items against menu_items in Supabase (check prices match, items exist, are available)
// 2. Create Stripe Checkout Session with line_items
// 3. Store pending order metadata in session metadata
// 4. Return session.url
```

**Step 4: Build success page**

`/checkout/success?session_id=xxx` — shows order confirmation. Fetches order from Supabase by stripe_session_id. Displays order number, items, pickup time, status. Clears cart. Big green checkmark (or, on-brand, a happy pig mascot).

**Step 5: Commit**

```bash
git add src/lib/stripe/ src/app/api/checkout/ src/app/checkout/
git commit -m "feat: add Stripe checkout flow with order creation"
```

---

### Task 14: Stripe Webhook — Order Confirmation

**Files:**
- Create: `src/app/api/webhooks/stripe/route.ts`

**Step 1: Build webhook handler**

Handles `checkout.session.completed` event:
1. Verify webhook signature using `STRIPE_WEBHOOK_SECRET`
2. Extract order data from session metadata
3. Insert order into Supabase `orders` table with status `confirmed`
4. Return 200

```typescript
// Key points:
// - Use raw body for signature verification (export const config = { api: { bodyParser: false } })
// - Extract metadata: customer_name, customer_phone, pickup_time, items (JSON string)
// - Insert into Supabase using service role client
```

**Step 2: Set up Stripe webhook in dashboard**

Configure webhook endpoint URL in Stripe dashboard pointing to `/api/webhooks/stripe`. Subscribe to `checkout.session.completed` event.

For local development: use `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

**Step 3: Test the full ordering flow**

1. Add items to cart on /menu
2. Go to /checkout, fill details
3. Complete Stripe test payment (card: 4242 4242 4242 4242)
4. Verify order appears in Supabase orders table
5. Verify redirect to /checkout/success shows order details

**Step 4: Commit**

```bash
git add src/app/api/webhooks/
git commit -m "feat: add Stripe webhook for order confirmation"
```

---

## Phase 6: Admin Dashboard

### Task 15: Admin Auth — Supabase Login

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/login/page.tsx`

**Step 1: Build admin login page**

Simple email/password login form using Supabase Auth. Brutalist styling — big bold "ADMIN" heading. On success, redirect to `/admin`.

**Step 2: Build admin layout with auth guard**

`src/app/admin/layout.tsx` checks for authenticated session on the server. If no session, redirect to `/admin/login`. Sidebar nav with links: Dashboard, Menu, Orders, Locations.

**Step 3: Create admin user in Supabase**

Manually create an admin user in Supabase Auth dashboard for Jason and Dylan.

**Step 4: Commit**

```bash
git add src/app/admin/
git commit -m "feat: add admin auth with Supabase login and protected layout"
```

---

### Task 16: Admin — Order Dashboard (Realtime)

**Files:**
- Create: `src/app/admin/orders/page.tsx`
- Create: `src/components/admin/OrderCard.tsx`
- Create: `src/components/admin/OrderStatusBadge.tsx`

**Step 1: Build OrderStatusBadge**

Color-coded badge: pending=yellow, confirmed=orange, ready=green, picked_up=gray.

**Step 2: Build OrderCard**

Shows: order number (last 8 chars of UUID), customer name, phone, items list, total, pickup time, status badge, and status action buttons (Confirm, Mark Ready, Mark Picked Up).

**Step 3: Build Orders page**

Client component. Subscribes to Supabase Realtime on the `orders` table. Displays orders in columns by status (Kanban-style) or as a filtered list. New orders appear automatically with a notification sound/flash. Status updates via Supabase update.

**Step 4: Commit**

```bash
git add src/app/admin/orders/ src/components/admin/
git commit -m "feat: add realtime order dashboard with status management"
```

---

### Task 17: Admin — Menu Management

**Files:**
- Create: `src/app/admin/menu/page.tsx`
- Create: `src/components/admin/MenuEditor.tsx`
- Create: `src/components/admin/MenuItemForm.tsx`

**Step 1: Build MenuItemForm**

Form with fields matching menu_items schema: name, description, price (input in dollars, stored in cents), category dropdown, heat_level slider (0-5), image upload (Supabase Storage), available toggle. Used for both create and edit.

**Step 2: Build MenuEditor**

Table/grid of all menu items (including unavailable). Each row has: name, price, category, heat level, available toggle, edit button, delete button. Sortable by drag-and-drop (stretch: use @dnd-kit).

**Step 3: Build Menu admin page**

Server component that fetches all menu items. "ADD NEW ITEM" button opens the form. Edit opens pre-filled form. Delete with confirmation dialog.

**Step 4: Commit**

```bash
git add src/app/admin/menu/ src/components/admin/MenuEditor.tsx src/components/admin/MenuItemForm.tsx
git commit -m "feat: add admin menu management with CRUD operations"
```

---

### Task 18: Admin — Location Management

**Files:**
- Create: `src/app/admin/locations/page.tsx`
- Create: `src/components/admin/LocationForm.tsx`

**Step 1: Build LocationForm**

Form with: name, address, date, start_time, end_time, notes. Date picker for the date field.

**Step 2: Build Locations admin page**

List of upcoming + past locations. Add/Edit/Delete. Simple table layout.

**Step 3: Build Admin Dashboard landing page**

`src/app/admin/page.tsx` — quick stats: orders today, pending orders count, menu items count. Links to each admin section.

**Step 4: Commit**

```bash
git add src/app/admin/locations/ src/components/admin/LocationForm.tsx src/app/admin/page.tsx
git commit -m "feat: add admin location management and dashboard"
```

---

## Phase 7: Polish & Deploy

### Task 19: 404 Page + Loading States

**Files:**
- Create: `src/app/not-found.tsx`
- Create: `src/app/loading.tsx`

**Step 1: Build 404 page**

The pig mascot looking confused/sad with a chili pepper. "404 — THIS AIN'T ON THE MENU" heading. "BACK TO HOME" button. PepperRain in background.

**Step 2: Build loading state**

Animated pig mascot or spinning chili pepper. "COOKIN' UP SOMETHING..." text.

**Step 3: Commit**

```bash
git add src/app/not-found.tsx src/app/loading.tsx
git commit -m "feat: add branded 404 and loading pages"
```

---

### Task 20: SEO, Metadata & Open Graph

**Files:**
- Modify: `src/app/layout.tsx` (metadata)
- Create: `public/og-image.png` (placeholder)
- Create: `src/app/sitemap.ts`

**Step 1: Add metadata to root layout**

Title, description, Open Graph tags, Twitter card, favicon setup.

**Step 2: Add per-page metadata**

Export `metadata` from each page with page-specific titles and descriptions.

**Step 3: Add sitemap**

Dynamic sitemap.ts that includes all public routes.

**Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/sitemap.ts public/
git commit -m "feat: add SEO metadata, Open Graph, and sitemap"
```

---

### Task 21: Vercel Deployment

**Step 1: Connect repo to Vercel**

```bash
npx vercel link
```

**Step 2: Add environment variables in Vercel dashboard**

All vars from `.env.local`: Supabase URL, keys, Stripe keys, webhook secret.

**Step 3: Deploy**

```bash
npx vercel --prod
```

**Step 4: Update Stripe webhook URL to production domain**

**Step 5: Test full flow on production**

1. Browse menu
2. Add items, checkout with Stripe test mode
3. Verify order appears in admin dashboard
4. Mark order ready

**Step 6: Commit any deployment config changes**

```bash
git add -A
git commit -m "chore: add Vercel deployment configuration"
```

---

## Summary

| Phase | Tasks | What's Built |
|-------|-------|-------------|
| 1 | 1-4 | Project scaffold, design system, UI primitives, layout |
| 2 | 5-6 | Supabase schema, types |
| 3 | 7 | PepperRain, SmokeOverlay, FlameEffect |
| 4 | 8-12 | Home, Menu, Cart, About, Contact pages |
| 5 | 13-14 | Stripe checkout + webhook |
| 6 | 15-18 | Admin auth, orders, menu, locations |
| 7 | 19-21 | 404, loading, SEO, deploy |
