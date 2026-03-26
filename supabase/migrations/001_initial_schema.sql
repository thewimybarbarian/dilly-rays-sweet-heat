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
