import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `gallery/${Date.now()}_${sanitizedName}`;

    // Ensure gallery-images bucket exists and is public
    try {
      const { data: buckets } = await supabaseAdmin.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === 'gallery-images');
      if (!bucketExists) {
        await supabaseAdmin.storage.createBucket('gallery-images', {
          public: true,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'],
        });
      }
    } catch (bucketErr) {
      console.warn('Error checking/creating bucket, proceeding with upload:', bucketErr);
    }

    const { error: uploadError } = await supabaseAdmin
      .storage
      .from('gallery-images')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabaseAdmin
      .storage
      .from('gallery-images')
      .getPublicUrl(storagePath);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      storagePath,
    });
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}
