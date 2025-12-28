import { NextResponse } from 'next/server';
import { getMedia } from '@/lib/db/media';

/**
 * GET /api/cms/media
 * Get all media files
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const uploadedBy = searchParams.get('uploadedBy');
    const mimeType = searchParams.get('mimeType');

    const filters = {};
    if (uploadedBy) filters.uploadedBy = uploadedBy;
    if (mimeType) filters.mimeType = mimeType;

    const mediaFiles = await getMedia(filters);

    return NextResponse.json({
      success: true,
      data: mediaFiles,
      count: mediaFiles.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
