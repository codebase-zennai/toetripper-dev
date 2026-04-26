import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/server';
import { slugify } from '../../../lib/utils/slugify';

function normalizeBlogRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    category: row.category || '',
    authorName: row.author_name || '',
    authorAvatar: row.author_avatar || '',
    heroImage: row.hero_image || '',
    heroImageSource: row.hero_image_source || 'url',
    heroImageStoragePath: row.hero_image_storage_path || '',
    contentHtml: row.content_html || '',
    status: row.status || 'draft',
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    seoTitle: row.seo_title || '',
    seoDescription: row.seo_description || '',
    featured: Boolean(row.featured),
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const status = searchParams.get('status') || 'published';
    const featuredOnly = searchParams.get('featured') === 'true';
    const limit = Number(searchParams.get('limit') || 0);

    let query = supabaseAdmin
      .from('blogs')
      .select('*')
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('updated_at', { ascending: false });

    if (slug) {
      query = query.eq('slug', slug).maybeSingle();
    } else if (status !== 'all') {
      query = query.eq('status', status);
    }

    if (featuredOnly) {
      query = query.eq('featured', true);
    }

    if (!slug && limit > 0) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (slug) {
      return NextResponse.json({ success: true, data: data ? normalizeBlogRow(data) : null });
    }

    return NextResponse.json({
      success: true,
      data: (data || []).map(normalizeBlogRow),
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const resolvedSlug = body.slug || slugify(body.title);

    if (!body.title || !resolvedSlug) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const status = body.status || 'draft';
    const now = new Date().toISOString();
    const row = {
      slug: resolvedSlug,
      title: body.title,
      excerpt: body.excerpt || '',
      category: body.category || '',
      author_name: body.authorName || '',
      author_avatar: body.authorAvatar || '',
      hero_image: body.heroImage || '',
      hero_image_source: body.heroImageSource || 'url',
      hero_image_storage_path: body.heroImageStoragePath || '',
      content_html: body.contentHtml || '',
      status,
      seo_title: body.seoTitle || '',
      seo_description: body.seoDescription || '',
      featured: Boolean(body.featured),
      published_at: status === 'published' ? body.publishedAt || now : null,
    };

    const { data, error } = await supabaseAdmin
      .from('blogs')
      .upsert(row, { onConflict: 'slug' })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data: normalizeBlogRow(data) });
  } catch (error) {
    console.error('Error saving blog:', error);
    return NextResponse.json(
      { error: 'Failed to save blog', details: error.message },
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

    const { error } = await supabaseAdmin.from('blogs').delete().eq('slug', slug);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog', details: error.message },
      { status: 500 }
    );
  }
}