import { NextResponse } from 'next/server';
import { getPageById, updatePage, deletePage } from '@/lib/db/pages';

/**
 * GET /api/cms/pages/[id]
 * Get a single page by ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const page = await getPageById(id);

    if (!page) {
      return NextResponse.json(
        { success: false, error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: page,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cms/pages/[id]
 * Update a page
 */
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedPage = await updatePage(id, body);

    return NextResponse.json({
      success: true,
      data: updatedPage,
      message: 'Page updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/cms/pages/[id]
 * Delete a page
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deletePage(id);

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
