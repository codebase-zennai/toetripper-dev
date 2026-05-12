import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/server';
import { slugify } from '../../../lib/utils/slugify';

function normalizeDestinationRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    country: row.country || '',
    tagline: row.tagline || '',
    badge: row.badge || '',
    heroImage: row.hero_image || '',
    cardImage: row.card_image || row.hero_image || '',
    excerpt: row.excerpt || '',
    readTime: row.read_time || '',
    contentHtml: row.content_html || '',
    status: row.status || 'draft',
    showInTrending: Boolean(row.show_in_trending),
    sortOrder: row.sort_order || 0,
    linkType: row.link_type || 'blog',
    instagramUrl: row.instagram_url || '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const status = searchParams.get('status') || 'published';
    const trendingOnly = searchParams.get('trending') === 'true';
    const limit = Number(searchParams.get('limit') || 0);

    let query = supabaseAdmin
      .from('destinations')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('updated_at', { ascending: false });

    if (slug) {
      query = query.eq('slug', slug).maybeSingle();
    } else if (status !== 'all') {
      query = query.eq('status', status);
    }

    if (trendingOnly) {
      query = query.eq('show_in_trending', true);
    }

    if (!slug && limit > 0) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (slug) {
      return NextResponse.json({ success: true, data: data ? normalizeDestinationRow(data) : null });
    }

    return NextResponse.json({
      success: true,
      data: (data || []).map(normalizeDestinationRow),
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const resolvedSlug = body.slug || slugify(body.name);
    const linkType = body.linkType === 'instagram' ? 'instagram' : 'blog';
    const instagramUrl = (body.instagramUrl || '').trim();

    if (!body.name || !resolvedSlug) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (linkType === 'instagram' && !instagramUrl) {
      return NextResponse.json(
        { error: 'Instagram URL is required when link type is instagram' },
        { status: 400 }
      );
    }

    const row = {
      slug: resolvedSlug,
      name: body.name,
      country: body.country || '',
      tagline: body.tagline || '',
      badge: body.badge || '',
      hero_image: body.heroImage || '',
      card_image: body.cardImage || body.heroImage || '',
      excerpt: body.excerpt || '',
      read_time: body.readTime || '',
      content_html: body.contentHtml || '',
      status: body.status || 'draft',
      show_in_trending: Boolean(body.showInTrending),
      sort_order: Number(body.sortOrder) || 0,
      link_type: linkType,
      instagram_url: linkType === 'instagram' ? instagramUrl : '',
    };

    const { data, error } = await supabaseAdmin
      .from('destinations')
      .upsert(row, { onConflict: 'slug' })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data: normalizeDestinationRow(data) });
  } catch (error) {
    console.error('Error saving destination:', error);
    return NextResponse.json(
      { error: 'Failed to save destination', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from('destinations').delete().eq('slug', slug);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting destination:', error);
    return NextResponse.json(
      { error: 'Failed to delete destination', details: error.message },
      { status: 500 }
    );
  }
}