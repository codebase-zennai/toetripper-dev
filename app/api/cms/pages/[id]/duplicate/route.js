import { NextResponse } from 'next/server';
import { duplicatePage } from '@/lib/db/pages';

/**
 * POST /api/cms/pages/[id]/duplicate
 * Duplicate a page
 */
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const duplicatedPage = await duplicatePage(id);

    return NextResponse.json({
      success: true,
      data: duplicatedPage,
      message: 'Page duplicated successfully',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
