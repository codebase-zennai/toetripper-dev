'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with TipTap
const TiptapEditor = dynamic(() => import('@/app/components/cms/TiptapEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-lg p-4 h-[600px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

const PagePreview = dynamic(() => import('@/app/components/cms/PagePreview'), {
  ssr: false,
});

export default function NewPageForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: { type: 'doc', content: [] },
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    status: 'draft',
    featuredImage: '',
  });
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title]);

  // Auto-save draft
  useEffect(() => {
    if (!formData.title) return;

    const timer = setTimeout(() => {
      autoSaveDraft();
    }, 3000);

    return () => clearTimeout(timer);
  }, [formData]);

  const autoSaveDraft = async () => {
    // Only auto-save if there's content
    if (!formData.title || autoSaving) return;

    setAutoSaving(true);
    // In production, implement actual auto-save logic
    setTimeout(() => setAutoSaving(false), 500);
  };

  const handleSubmit = async (status) => {
    setError('');
    setSaving(true);

    try {
      const res = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status,
          seoKeywords: formData.seoKeywords.split(',').map((k) => k.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/cms/pages');
      } else {
        setError(data.error);
        setSaving(false);
      }
    } catch (err) {
      setError('Failed to save page');
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Create New Page</h1>
        <div className="flex items-center space-x-2">
          {autoSaving && <span className="text-sm text-gray-500">Auto-saving...</span>}
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            {showPreview ? '📝 Edit' : '👁️ Preview'}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={saving}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={saving}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {!showPreview ? (
            <>
              {/* Title */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter page title"
                  required
                />
              </div>

              {/* Content Editor */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <TiptapEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Start writing your content..."
                />
              </div>
            </>
          ) : (
            <PagePreview page={formData} />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Page Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="page-url"
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL: /{formData.slug || 'page-url'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={formData.featuredImage}
                  onChange={(e) =>
                    setFormData({ ...formData, featuredImage: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, seoTitle: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Leave blank to use page title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, seoDescription: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description for search engines"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.seoDescription.length} / 160 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  value={formData.seoKeywords}
                  onChange={(e) =>
                    setFormData({ ...formData, seoKeywords: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate keywords with commas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
