import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const packageSlug = formData.get('packageSlug');

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Sanitize the file name to avoid weird characters
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); 
    
    // Make sure we have a valid target directory name
    const validSlug = packageSlug || 'default-package';
    
    // The directory will be: public/assets/:packagename
    const publicDir = path.join(process.cwd(), 'public');
    const targetDir = path.join(publicDir, 'assets', validSlug);
    
    // Create directory recursively if it doesn't already exist
    await mkdir(targetDir, { recursive: true });
    
    // Guaranteed 1 image per package: purge existing files in this directory before saving the new one
    try {
      const { readdir, unlink } = await import('fs/promises');
      const existingFiles = await readdir(targetDir);
      for (const fileItem of existingFiles) {
        await unlink(path.join(targetDir, fileItem));
      }
    } catch (e) {
      // Ignore errors if directory is perfectly clean or edge cases
    }
    
    const filePath = path.join(targetDir, originalName);
    await writeFile(filePath, buffer);
    
    // This is the URL path that can be requested via the browser
    const publicUrl = `/assets/${validSlug}/${originalName}`;
    
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
  }
}
