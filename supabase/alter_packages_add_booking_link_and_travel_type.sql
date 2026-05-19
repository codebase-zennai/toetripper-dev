alter table if exists public.packages
  add column if not exists travel_type text not null default 'Domestic' check (travel_type in ('Domestic', 'International'));

alter table if exists public.packages
  add column if not exists get_your_guide_link text default '';
