-- Alters existing public.destinations table for destination link routing
-- Adds:
--   1) link_type ('blog' | 'instagram')
--   2) instagram_url
-- Also backfills existing rows and adds a validation constraint.

BEGIN;

ALTER TABLE public.destinations
ADD COLUMN IF NOT EXISTS link_type text NOT NULL DEFAULT 'blog'
CHECK (link_type IN ('blog', 'instagram'));

ALTER TABLE public.destinations
ADD COLUMN IF NOT EXISTS instagram_url text DEFAULT '';

-- Backfill safety for pre-existing rows
UPDATE public.destinations
SET link_type = 'blog'
WHERE link_type IS NULL OR link_type = '';

UPDATE public.destinations
SET instagram_url = ''
WHERE instagram_url IS NULL;

-- Ensure instagram_url is present when link_type is instagram
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'destinations_instagram_url_required_chk'
      AND conrelid = 'public.destinations'::regclass
  ) THEN
    ALTER TABLE public.destinations
    ADD CONSTRAINT destinations_instagram_url_required_chk
    CHECK (
      link_type <> 'instagram'
      OR length(trim(coalesce(instagram_url, ''))) > 0
    );
  END IF;
END $$;

COMMIT;
