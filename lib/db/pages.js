/**
 * Database operations for Pages
 * 
 * This is a simple in-memory implementation for demonstration.
 * In production, replace with actual database calls (PostgreSQL, MongoDB, etc.)
 */

// In-memory storage (replace with actual database)
let pages = [];
let nextId = 1;

/**
 * Generate a URL-friendly slug from title
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Create a new page
 */
export async function createPage(pageData) {
  const page = {
    id: `page_${nextId++}`,
    title: pageData.title,
    slug: pageData.slug || generateSlug(pageData.title),
    content: pageData.content || { type: 'doc', content: [] },
    seoTitle: pageData.seoTitle || pageData.title,
    seoDescription: pageData.seoDescription || '',
    seoKeywords: pageData.seoKeywords || [],
    status: pageData.status || 'draft',
    featuredImage: pageData.featuredImage || null,
    authorId: pageData.authorId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: pageData.status === 'published' ? new Date().toISOString() : null,
    version: 1,
  };

  // Check for duplicate slug
  if (pages.some(p => p.slug === page.slug)) {
    throw new Error('Slug already exists');
  }

  pages.push(page);
  return page;
}

/**
 * Get all pages (with optional filters)
 */
export async function getPages(filters = {}) {
  let filteredPages = [...pages];

  if (filters.status) {
    filteredPages = filteredPages.filter(p => p.status === filters.status);
  }

  if (filters.authorId) {
    filteredPages = filteredPages.filter(p => p.authorId === filters.authorId);
  }

  // Sort by updatedAt (most recent first)
  filteredPages.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return filteredPages;
}

/**
 * Get a single page by ID
 */
export async function getPageById(id) {
  return pages.find(p => p.id === id) || null;
}

/**
 * Get a single page by slug
 */
export async function getPageBySlug(slug) {
  return pages.find(p => p.slug === slug) || null;
}

/**
 * Update a page
 */
export async function updatePage(id, updates) {
  const index = pages.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Page not found');
  }

  // Check for duplicate slug if slug is being updated
  if (updates.slug && updates.slug !== pages[index].slug) {
    if (pages.some(p => p.slug === updates.slug && p.id !== id)) {
      throw new Error('Slug already exists');
    }
  }

  const updatedPage = {
    ...pages[index],
    ...updates,
    updatedAt: new Date().toISOString(),
    version: pages[index].version + 1,
  };

  // Update publishedAt if status changed to published
  if (updates.status === 'published' && pages[index].status !== 'published') {
    updatedPage.publishedAt = new Date().toISOString();
  }

  pages[index] = updatedPage;
  return updatedPage;
}

/**
 * Delete a page
 */
export async function deletePage(id) {
  const index = pages.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Page not found');
  }

  pages.splice(index, 1);
  return true;
}

/**
 * Duplicate a page
 */
export async function duplicatePage(id) {
  const original = pages.find(p => p.id === id);
  
  if (!original) {
    throw new Error('Page not found');
  }

  const duplicate = {
    ...original,
    id: `page_${nextId++}`,
    title: `${original.title} (Copy)`,
    slug: `${original.slug}-copy-${Date.now()}`,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: null,
    version: 1,
  };

  pages.push(duplicate);
  return duplicate;
}

/**
 * Get published pages only (for public viewing)
 */
export async function getPublishedPages() {
  return pages.filter(p => p.status === 'published');
}

/**
 * Initialize with some demo pages
 */
export function initializeDemoPages() {
  if (pages.length === 0) {
    pages = [
      {
        id: 'page_1',
        title: 'About Us',
        slug: 'about',
        content: {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 1 },
              content: [{ type: 'text', text: 'About Us' }]
            },
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Welcome to our company. We are dedicated to providing excellent service.' }]
            }
          ]
        },
        seoTitle: 'About Us - Learn More About Our Company',
        seoDescription: 'Discover our story, mission, and values.',
        seoKeywords: ['about', 'company', 'team'],
        status: 'published',
        featuredImage: null,
        authorId: 'user_1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        version: 1,
      },
      {
        id: 'page_2',
        title: 'Privacy Policy',
        slug: 'privacy-policy',
        content: {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 1 },
              content: [{ type: 'text', text: 'Privacy Policy' }]
            },
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Your privacy is important to us.' }]
            }
          ]
        },
        seoTitle: 'Privacy Policy',
        seoDescription: 'Our privacy policy and data protection practices.',
        seoKeywords: ['privacy', 'policy', 'data protection'],
        status: 'published',
        featuredImage: null,
        authorId: 'user_1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        version: 1,
      },
    ];
    nextId = 3;
  }
}
