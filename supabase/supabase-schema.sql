-- Supabase schema for testimonials and gallery_items
-- Run this in the Supabase SQL editor.

create extension if not exists pgcrypto;

-- Testimonials table
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  destination text,
  rating int check (rating >= 1 and rating <= 5) default 5,
  message text not null,
  image_url text,
  is_published boolean default false,
  created_at timestamptz default now(),
  "order" int default 0
);

create index if not exists testimonials_created_idx on testimonials (created_at desc);

-- Gallery table
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  image_url text not null,
  tags text[] default '{}',
  is_published boolean default false,
  created_at timestamptz default now(),
  "order" int default 0
);

create index if not exists gallery_items_created_idx on gallery_items (created_at desc);
