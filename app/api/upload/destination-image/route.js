import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/server';

function sanitizeSlug(value = '') {
  return value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'destination-draft';
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const destinationSlug = formData.get('destinationSlug') || 'destination-draft';
    const imageType = formData.get('imageType') || 'hero'; // 'hero' or 'card'

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const validSlug = sanitizeSlug(destinationSlug);
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${validSlug}/${imageType}_${Date.now()}_${sanitizedName}`;

    const { error: uploadError } = await supabaseAdmin
      .storage
      .from('destination-images')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabaseAdmin
      .storage
      .from('destination-images')
      .getPublicUrl(storagePath);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      storagePath,
    });
  } catch (error) {
    console.error('Error uploading destination image:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}
