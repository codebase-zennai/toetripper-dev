import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/server';

// GET — Fetch all packages (with related data)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'published';

    let query = supabaseAdmin
      .from('packages')
      .select(`
        *,
        package_highlights(id, highlight, sort_order),
        package_itinerary(id, day_number, title, description),
        package_inclusions(id, item, sort_order),
        package_exclusions(id, item, sort_order),
        package_images(id, public_url, is_primary, sort_order)
      `)
      .order('sort_order', { ascending: true });

    // If status is 'all', don't filter by status (for admin panel)
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: packages, error } = await query;

    if (error) throw error;

    // Transform to match the shape expected by frontend components
    const transformedPackages = packages.map(pkg => ({
      id: pkg.id,
      slug: pkg.slug,
      title: pkg.title,
      description: pkg.description,
      fullDescription: pkg.full_description,
      imageSrc: pkg.image_url,
      image: pkg.image_url,
      href: pkg.href || `/packages/${pkg.slug}`,
      destination: pkg.destination,
      cost: pkg.cost,
      duration: pkg.duration,
      category: pkg.category,
      travelType: pkg.travel_type,
      bestTime: pkg.best_time,
      difficulty: pkg.difficulty,
      groupSize: pkg.group_size,
      status: pkg.status,
      highlights: (pkg.package_highlights || [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(h => h.highlight),
      itinerary: (pkg.package_itinerary || [])
        .sort((a, b) => a.day_number - b.day_number)
        .map(i => ({ day: i.day_number, title: i.title, description: i.description })),
      included: (pkg.package_inclusions || [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(i => i.item),
      excluded: (pkg.package_exclusions || [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(e => e.item),
    }));

    return NextResponse.json({ success: true, data: transformedPackages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages', details: error.message },
      { status: 500 }
    );
  }
}

// POST — Create or update a package (admin only)
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      slug,
      title,
      description,
      fullDescription,
      imageSrc,
      destination,
      cost,
      duration,
      category,
      travelType,
      bestTime,
      difficulty,
      groupSize,
      highlights,
      itinerary,
      included,
      excluded,
      status: pkgStatus,
    } = body;

    // Upsert the package (snake_case for DB columns)
    const packageData = {
      slug,
      title,
      description,
      full_description: fullDescription || '',
      image_url: imageSrc || '',
      href: `/packages/${slug}`,
      destination: destination || '',
      cost: Number(cost) || 0,
      duration: Number(duration) || 1,
      category: category || '',
      travel_type: travelType || 'Domestic',
      best_time: bestTime || '',
      difficulty: difficulty || 'Easy',
      group_size: groupSize || '',
      status: pkgStatus || 'published',
    };

    const { data: pkg, error: pkgError } = await supabaseAdmin
      .from('packages')
      .upsert(packageData, { onConflict: 'slug' })
      .select()
      .single();

    if (pkgError) throw pkgError;

    // Replace highlights
    if (highlights && Array.isArray(highlights)) {
      await supabaseAdmin.from('package_highlights').delete().eq('package_id', pkg.id);
      if (highlights.length > 0) {
        const highlightRows = highlights.map((h, i) => ({
          package_id: pkg.id, highlight: h, sort_order: i
        }));
        await supabaseAdmin.from('package_highlights').insert(highlightRows);
      }
    }

    // Replace itinerary
    if (itinerary && Array.isArray(itinerary)) {
      await supabaseAdmin.from('package_itinerary').delete().eq('package_id', pkg.id);
      if (itinerary.length > 0) {
        const itineraryRows = itinerary.map(item => ({
          package_id: pkg.id,
          day_number: item.day,
          title: item.title,
          description: item.description
        }));
        await supabaseAdmin.from('package_itinerary').insert(itineraryRows);
      }
    }

    // Replace inclusions
    if (included && Array.isArray(included)) {
      await supabaseAdmin.from('package_inclusions').delete().eq('package_id', pkg.id);
      if (included.length > 0) {
        const inclusionRows = included.map((item, i) => ({
          package_id: pkg.id, item, sort_order: i
        }));
        await supabaseAdmin.from('package_inclusions').insert(inclusionRows);
      }
    }

    // Replace exclusions
    if (excluded && Array.isArray(excluded)) {
      await supabaseAdmin.from('package_exclusions').delete().eq('package_id', pkg.id);
      if (excluded.length > 0) {
        const exclusionRows = excluded.map((item, i) => ({
          package_id: pkg.id, item, sort_order: i
        }));
        await supabaseAdmin.from('package_exclusions').insert(exclusionRows);
      }
    }

    return NextResponse.json({ success: true, data: pkg });
  } catch (error) {
    console.error('Error saving package:', error);
    return NextResponse.json(
      { error: 'Save failed', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE — Remove a package
export async function DELETE(request) {
  try {
    const { slug } = await request.json();

    // ON DELETE CASCADE will clean up highlights, itinerary, inclusions, exclusions, images
    const { error } = await supabaseAdmin
      .from('packages')
      .delete()
      .eq('slug', slug);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json(
      { error: 'Delete failed', details: error.message },
      { status: 500 }
    );
  }
}
