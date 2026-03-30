import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const packageSlug = formData.get('packageSlug');

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const validSlug = packageSlug || 'default-package';
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${validSlug}/${Date.now()}_${sanitizedName}`;

    // Delete existing images for this package (1 image per package rule)
    const { data: existingFiles } = await supabaseAdmin
      .storage
      .from('package-images')
      .list(validSlug);

    if (existingFiles && existingFiles.length > 0) {
      const filesToRemove = existingFiles.map(f => `${validSlug}/${f.name}`);
      await supabaseAdmin.storage.from('package-images').remove(filesToRemove);
    }

    // Upload new image to Supabase Storage (S3)
    const { error: uploadError } = await supabaseAdmin
      .storage
      .from('package-images')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: urlData } = supabaseAdmin
      .storage
      .from('package-images')
      .getPublicUrl(storagePath);

    const publicUrl = urlData.publicUrl;

    // Update the package's image_url in the database
    await supabaseAdmin
      .from('packages')
      .update({ image_url: publicUrl })
      .eq('slug', validSlug);

    // Also store metadata in package_images table
    const { data: pkg } = await supabaseAdmin
      .from('packages')
      .select('id')
      .eq('slug', validSlug)
      .single();

    if (pkg) {
      // Remove old image entries for this package
      await supabaseAdmin
        .from('package_images')
        .delete()
        .eq('package_id', pkg.id);

      // Insert new image entry
      await supabaseAdmin
        .from('package_images')
        .insert({
          package_id: pkg.id,
          storage_path: storagePath,
          public_url: publicUrl,
          original_filename: sanitizedName,
          mime_type: file.type,
          size_bytes: buffer.length,
          is_primary: true
        });
    }

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}
