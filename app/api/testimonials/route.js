import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/server';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get('status');

    const query = supabaseAdmin
      .from('testimonials')
      .select('id,name,destination,rating,message,image_url,created_at,is_published');

    if (status !== 'all') {
      query.eq('is_published', true);
    }

    const { data, error } = await query.order('order', { ascending: true }).order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Fetch failed' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, destination, rating, message, image_url } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.from('testimonials').insert([
      {
        name,
        destination: destination || null,
        rating: rating ? Number(rating) : 5,
        message,
        image_url: image_url || null,
        is_published: true
      },
    ]).select();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Insert failed' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, ...fields } = body;

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const { data, error } = await supabaseAdmin.from('testimonials').update(fields).eq('id', id).select();
    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const { data, error } = await supabaseAdmin.from('testimonials').delete().eq('id', id).select();
    if (error) throw error;

    return NextResponse.json({ deleted: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Delete failed' }, { status: 500 });
  }
}
