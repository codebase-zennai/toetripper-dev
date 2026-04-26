'use client';

import { useMemo, useState } from 'react';
import RichTextEditor from './RichTextEditor';
import BlogPreviewModal from './BlogPreviewModal';

function FieldShell({ label, children, helper }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {helper ? <p className="text-xs text-gray-500">{helper}</p> : null}
    </div>
  );
}

function BaseInput({ name, value, onChange, placeholder }) {
  return (
    <input
      type="text"
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
}

export default function BlogEditor({
  editingBlog,
  handleInputChange,
  handleContentChange,
  setBlogField,
  handleSave,
  handleCancel,
}) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const imageSource = editingBlog.heroImageSource || 'url';
  const computedSlug = useMemo(() => {
    if (editingBlog.slug) return editingBlog.slug;
    return (editingBlog.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'blog-draft';
  }, [editingBlog.slug, editingBlog.title]);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('blogSlug', computedSlug);

      const response = await fetch('/api/upload/blog-image', {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.details || payload.error || 'Upload failed');
      }

      setBlogField('heroImageSource', 'upload');
      setBlogField('heroImage', payload.url);
      setBlogField('heroImageStoragePath', payload.storagePath || '');
    } catch (error) {
      console.error('Blog image upload failed', error);
      alert('Image upload failed. Please try again.');
    } finally {
      setUploadingImage(false);
      event.target.value = '';
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">
            {editingBlog.isNew ? 'Create Blog Post' : 'Edit Blog Post'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Content is stored in Supabase as HTML from the editor.</p>
        </div>
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium cursor-pointer"
          >
            Show Preview
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FieldShell label="Title">
            <BaseInput name="title" value={editingBlog.title} onChange={handleInputChange} placeholder="Enter blog title" />
          </FieldShell>
          <FieldShell label="Slug" helper="Leave blank to generate from title on save.">
            <BaseInput name="slug" value={editingBlog.slug} onChange={handleInputChange} placeholder="your-blog-slug" />
          </FieldShell>
          <FieldShell label="Category">
            <BaseInput name="category" value={editingBlog.category} onChange={handleInputChange} placeholder="Travel Tips" />
          </FieldShell>
          <FieldShell label="Status">
            <select
              name="status"
              value={editingBlog.status || 'draft'}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </FieldShell>
          <FieldShell label="Author Name">
            <BaseInput name="authorName" value={editingBlog.authorName} onChange={handleInputChange} placeholder="Toe Tripper Team" />
          </FieldShell>
          <FieldShell label="Author Avatar URL">
            <BaseInput name="authorAvatar" value={editingBlog.authorAvatar} onChange={handleInputChange} placeholder="https://..." />
          </FieldShell>
          <FieldShell label="SEO Title">
            <BaseInput name="seoTitle" value={editingBlog.seoTitle} onChange={handleInputChange} placeholder="Search result title" />
          </FieldShell>
        </div>

        <FieldShell label="Hero Image">
          <div className="space-y-3">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="heroImageSource"
                  value="url"
                  checked={imageSource === 'url'}
                  onChange={(e) => {
                    setBlogField('heroImageSource', e.target.value);
                    setBlogField('heroImageStoragePath', '');
                  }}
                />
                URL
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="heroImageSource"
                  value="upload"
                  checked={imageSource === 'upload'}
                  onChange={(e) => setBlogField('heroImageSource', e.target.value)}
                />
                Upload Image
              </label>
            </div>

            {imageSource === 'url' ? (
              <BaseInput
                name="heroImage"
                value={editingBlog.heroImage}
                onChange={handleInputChange}
                placeholder="https://..."
              />
            ) : (
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:rounded-md"
                  disabled={uploadingImage}
                />
                {uploadingImage ? (
                  <p className="text-xs text-gray-500">Uploading image...</p>
                ) : null}
                {editingBlog.heroImage ? (
                  <p className="text-xs text-gray-500 break-all">{editingBlog.heroImage}</p>
                ) : null}
              </div>
            )}
          </div>
        </FieldShell>

        <FieldShell label="Excerpt">
          <textarea
            name="excerpt"
            value={editingBlog.excerpt || ''}
            onChange={handleInputChange}
            rows={3}
            placeholder="Short summary used on listing cards"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </FieldShell>

        <FieldShell label="SEO Description">
          <textarea
            name="seoDescription"
            value={editingBlog.seoDescription || ''}
            onChange={handleInputChange}
            rows={3}
            placeholder="Meta description for search engines"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </FieldShell>

        <div className="flex items-center gap-3">
          <input
            id="featured"
            type="checkbox"
            name="featured"
            checked={Boolean(editingBlog.featured)}
            onChange={handleInputChange}
            className="h-4 w-4"
          />
          <label htmlFor="featured" className="text-sm text-gray-700">Feature this post on blog listings</label>
        </div>

        <FieldShell label="Blog Content (TipTap)">
          <RichTextEditor
            value={editingBlog.contentHtml}
            onChange={handleContentChange}
            placeholder="Write the full blog post here..."
          />
        </FieldShell>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-black text-white rounded-md font-medium cursor-pointer"
          >
            Save Blog
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 border border-gray-300 rounded-md font-medium cursor-pointer bg-white"
          >
            Cancel
          </button>
        </div>
      </div>

      {previewOpen ? (
        <BlogPreviewModal blog={editingBlog} onClose={() => setPreviewOpen(false)} />
      ) : null}
    </>
  );
}