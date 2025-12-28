import { NextResponse } from 'next/server';
import { getPages, createPage } from '@/lib/db/pages';
import { initializeDemoPages } from '@/lib/db/pages';

// Initialize demo pages on first load
initializeDemoPages();

/**
 * GET /api/cms/pages
 * Get all pages (with optional filters)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const authorId = searchParams.get('authorId');

    const filters = {};
    if (status) filters.status = status;
    if (authorId) filters.authorId = authorId;

    const pages = await getPages(filters);

    return NextResponse.json({
      success: true,
      data: pages,
      count: pages.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cms/pages
 * Create a new page
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    // TODO: Get user ID from session
    const pageData = {
      ...body,
      authorId: 'user_1', // Replace with actual user ID from session
    };

    const page = await createPage(pageData);

    return NextResponse.json(
      {
        success: true,
        data: page,
        message: 'Page created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
