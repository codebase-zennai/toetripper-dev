import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseAdminClient;

function createSupabaseAdminClient() {
	if (!supabaseUrl || !supabaseServiceKey) {
		throw new Error(
			'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.'
		);
	}

	return createClient(supabaseUrl, supabaseServiceKey);
}

export function getSupabaseAdmin() {
	if (!supabaseAdminClient) {
		supabaseAdminClient = createSupabaseAdminClient();
	}

	return supabaseAdminClient;
}

// Keep the existing API (`supabaseAdmin.from(...)`) while deferring client creation until first use.
export const supabaseAdmin = new Proxy(
	{},
	{
		get(_target, property) {
			const client = getSupabaseAdmin();
			const value = client[property];

			return typeof value === 'function' ? value.bind(client) : value;
		},
	}
);
