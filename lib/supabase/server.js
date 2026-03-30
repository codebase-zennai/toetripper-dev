import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Server client bypasses RLS — ONLY use in API routes (app/api/)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
