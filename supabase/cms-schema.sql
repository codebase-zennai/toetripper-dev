create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text default '',
  category text default '',
  author_name text default '',
  author_avatar text default '',
  hero_image text default '',
  hero_image_source text not null default 'url' check (hero_image_source in ('url', 'upload')),
  hero_image_storage_path text default '',
  content_html text default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text default '',
  seo_description text default '',
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists blogs_status_idx on public.blogs (status);
create index if not exists blogs_published_at_idx on public.blogs (published_at desc);
create index if not exists blogs_featured_idx on public.blogs (featured);

drop trigger if exists set_blogs_updated_at on public.blogs;
create trigger set_blogs_updated_at
before update on public.blogs
for each row
execute function public.set_updated_at();

alter table public.blogs
  add column if not exists hero_image_source text not null default 'url' check (hero_image_source in ('url', 'upload'));

alter table public.blogs
  add column if not exists hero_image_storage_path text default '';

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  country text default '',
  tagline text default '',
  badge text default '',
  hero_image text default '',
  card_image text default '',
  excerpt text default '',
  read_time text default '',
  content_html text default '',
  link_type text not null default 'blog' check (link_type in ('blog', 'instagram')),
  instagram_url text default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  show_in_trending boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists destinations_status_idx on public.destinations (status);
create index if not exists destinations_trending_idx on public.destinations (show_in_trending, status);
create index if not exists destinations_sort_order_idx on public.destinations (sort_order asc);

alter table public.destinations
  add column if not exists link_type text not null default 'blog' check (link_type in ('blog', 'instagram'));

alter table public.destinations
  add column if not exists instagram_url text default '';

drop trigger if exists set_destinations_updated_at on public.destinations;
create trigger set_destinations_updated_at
before update on public.destinations
for each row
execute function public.set_updated_at();

alter table public.blogs disable row level security;
alter table public.destinations disable row level security;

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;