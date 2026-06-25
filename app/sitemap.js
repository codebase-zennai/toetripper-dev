import { supabaseAdmin } from '../lib/supabase/server';

const BASE_URL = 'https://www.toetripper.com';

export default async function sitemap() {
  // ── Static routes ──────────────────────────────────────────────
  const staticRoutes = [
    { path: '/',                                changeFrequency: 'weekly',  priority: 1.0  },
    { path: '/about',                           changeFrequency: 'monthly', priority: 0.8  },
    { path: '/packages',                        changeFrequency: 'weekly',  priority: 0.9  },
    { path: '/destinations',                    changeFrequency: 'weekly',  priority: 0.9  },
    { path: '/blog',                            changeFrequency: 'weekly',  priority: 0.8  },
    { path: '/travel-themes',                   changeFrequency: 'monthly', priority: 0.7  },
    { path: '/gallery',                         changeFrequency: 'monthly', priority: 0.6  },
    { path: '/feedback',                        changeFrequency: 'monthly', priority: 0.6  },
    { path: '/contact',                         changeFrequency: 'monthly', priority: 0.7  },
    { path: '/services/corporate-travels',      changeFrequency: 'monthly', priority: 0.8  },
    { path: '/services/experiential-holidays',  changeFrequency: 'monthly', priority: 0.8  },
    { path: '/services/mice-incentive',         changeFrequency: 'monthly', priority: 0.8  },
    { path: '/privacy-policy',                  changeFrequency: 'yearly',  priority: 0.3  },
    { path: '/terms-conditions',                changeFrequency: 'yearly',  priority: 0.3  },
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // ── Dynamic routes (blogs) ────────────────────────────────────
  let blogEntries = [];
  try {
    const { data: blogs } = await supabaseAdmin
      .from('blogs')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    blogEntries = (blogs || []).map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updated_at || post.published_at || new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Sitemap: Failed to fetch blogs', error);
  }

  // ── Dynamic routes (destinations) ─────────────────────────────
  let destinationEntries = [];
  try {
    const { data: destinations } = await supabaseAdmin
      .from('destinations')
      .select('slug, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    destinationEntries = (destinations || [])
      .filter((d) => d.slug)
      .map((dest) => ({
        url: `${BASE_URL}/destinations/${dest.slug}`,
        lastModified: dest.updated_at || new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
  } catch (error) {
    console.error('Sitemap: Failed to fetch destinations', error);
  }

  // ── Dynamic routes (packages) ─────────────────────────────────
  let packageEntries = [];
  try {
    const { data: packages } = await supabaseAdmin
      .from('packages')
      .select('slug, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    packageEntries = (packages || [])
      .filter((p) => p.slug)
      .map((pkg) => ({
        url: `${BASE_URL}/packages/${pkg.slug}`,
        lastModified: pkg.updated_at || new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
  } catch (error) {
    console.error('Sitemap: Failed to fetch packages', error);
  }

  return [...staticEntries, ...blogEntries, ...destinationEntries, ...packageEntries];
}
