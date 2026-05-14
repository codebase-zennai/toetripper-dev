import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseClient;

function createSupabaseClient() {
	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error(
			'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.'
		);
	}

	return createClient(supabaseUrl, supabaseAnonKey);
}

export function getSupabaseClient() {
	if (!supabaseClient) {
		supabaseClient = createSupabaseClient();
	}

	return supabaseClient;
}

export const supabase = new Proxy(
	{},
	{
		get(_target, property) {
			const client = getSupabaseClient();
			const value = client[property];

			return typeof value === 'function' ? value.bind(client) : value;
		},
	}
);
