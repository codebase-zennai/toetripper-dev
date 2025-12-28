'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    totalMedia: 0,
  });
  const [recentPages, setRecentPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all pages
      const pagesRes = await fetch('/api/cms/pages');
      const pagesData = await pagesRes.json();

      if (pagesData.success) {
        const pages = pagesData.data;
        setStats({
          totalPages: pages.length,
          publishedPages: pages.filter((p) => p.status === 'published').length,
          draftPages: pages.filter((p) => p.status === 'draft').length,
        });

        // Get 5 most recent pages
        setRecentPages(pages.slice(0, 5));
      }

      // Fetch media count
      const mediaRes = await fetch('/api/cms/media');
      const mediaData = await mediaRes.json();

      if (mediaData.success) {
        setStats((prev) => ({ ...prev, totalMedia: mediaData.count }));
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Pages"
          value={stats.totalPages}
          icon="📄"
          color="bg-blue-500"
        />
        <StatCard
          title="Published"
          value={stats.publishedPages}
          icon="✅"
          color="bg-green-500"
        />
        <StatCard
          title="Drafts"
          value={stats.draftPages}
          icon="📝"
          color="bg-yellow-500"
        />
        <StatCard
          title="Media Files"
          value={stats.totalMedia}
          icon="🖼️"
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/cms/pages/new"
            className="flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <span className="mr-2">➕</span>
            Create New Page
          </Link>
          <Link
            href="/cms/pages"
            className="flex items-center justify-center px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <span className="mr-2">📄</span>
            Manage Pages
          </Link>
          <Link
            href="/cms/media"
            className="flex items-center justify-center px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <span className="mr-2">🖼️</span>
            Upload Media
          </Link>
        </div>
      </div>

      {/* Recent Pages */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Pages</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentPages.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No pages yet. Create your first page!
            </div>
          ) : (
            recentPages.map((page) => (
              <Link
                key={page.id}
                href={`/cms/pages/${page.id}/edit`}
                className="block px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{page.title}</h4>
                    <p className="text-sm text-gray-500">/{page.slug}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        page.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {page.status}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
