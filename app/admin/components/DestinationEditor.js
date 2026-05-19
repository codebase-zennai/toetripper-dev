'use client';

import { useState } from 'react';
import RichTextEditor from './RichTextEditor';

function FieldShell({ label, children, helper }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {helper ? <p className="text-xs text-gray-500">{helper}</p> : null}
    </div>
  );
}

function BaseInput({ name, value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      name={name}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
}

function ImageInputField({ label, fieldName, value, destinationSlug, imageType, handleInputChange }) {
  const [mode, setMode] = useState(value && !value.startsWith('blob:') ? 'url' : 'url');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show immediate local preview
    const localUrl = URL.createObjectURL(file);
    handleInputChange({ target: { name: fieldName, value: localUrl } });

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('destinationSlug', destinationSlug || 'destination-draft');
      formData.append('imageType', imageType);

      const res = await fetch('/api/upload/destination-image', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          handleInputChange({ target: { name: fieldName, value: data.url } });
        }
      } else {
        console.error('Destination image upload failed');
      }
    } catch (err) {
      console.error('Destination image upload error', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FieldShell label={label}>
      <div className="space-y-2">
        {/* Mode toggle */}
        <div className="flex rounded-md overflow-hidden border border-gray-300 w-fit">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${mode === 'url' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer border-l border-gray-300 ${mode === 'upload' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Upload
          </button>
        </div>

        {mode === 'url' ? (
          <BaseInput
            name={fieldName}
            value={value}
            onChange={handleInputChange}
            placeholder="https://..."
            type="url"
          />
        ) : (
          <div className="flex items-center gap-4">
            {value && (
              <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer disabled:opacity-60"
              />
              <p className="mt-1 text-xs text-gray-500">
                {uploading ? 'Uploading…' : 'Pick an image from your computer to upload it automatically.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </FieldShell>
  );
}

export default function DestinationEditor({
  editingDestination,
  handleInputChange,
  handleContentChange,
  handleSave,
  handleCancel,
}) {
  const isInstagramLink = (editingDestination.linkType || 'blog') === 'instagram';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-black">
          {editingDestination.isNew ? 'Create Destination' : 'Edit Destination'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Control destination detail pages and homepage trending visibility here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FieldShell label="Name">
          <BaseInput name="name" value={editingDestination.name} onChange={handleInputChange} placeholder="Bali" />
        </FieldShell>
        <FieldShell label="Slug" helper="Leave blank to generate from the destination name.">
          <BaseInput name="slug" value={editingDestination.slug} onChange={handleInputChange} placeholder="bali-indonesia" />
        </FieldShell>
        <FieldShell label="Country">
          <BaseInput name="country" value={editingDestination.country} onChange={handleInputChange} placeholder="Indonesia" />
        </FieldShell>
        <FieldShell label="Badge">
          <BaseInput name="badge" value={editingDestination.badge} onChange={handleInputChange} placeholder="International" />
        </FieldShell>
        <FieldShell label="Tagline">
          <BaseInput name="tagline" value={editingDestination.tagline} onChange={handleInputChange} placeholder="Island of the Gods" />
        </FieldShell>
        <ImageInputField
          label="Hero Image"
          fieldName="heroImage"
          value={editingDestination.heroImage}
          destinationSlug={editingDestination.slug || editingDestination.name}
          imageType="hero"
          handleInputChange={handleInputChange}
        />
        <ImageInputField
          label="Card Image"
          fieldName="cardImage"
          value={editingDestination.cardImage}
          destinationSlug={editingDestination.slug || editingDestination.name}
          imageType="card"
          handleInputChange={handleInputChange}
        />
        <FieldShell label="Status">
          <select
            name="status"
            value={editingDestination.status || 'draft'}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </FieldShell>
        <FieldShell label="Sort Order">
          <BaseInput name="sortOrder" value={editingDestination.sortOrder} onChange={handleInputChange} placeholder="0" type="number" />
        </FieldShell>
        <FieldShell label="Destination Link Type" helper="Blog opens internal destination page. Instagram redirects to the external URL.">
          <select
            name="linkType"
            value={editingDestination.linkType || 'blog'}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
          >
            <option value="blog">Blog</option>
            <option value="instagram">Instagram Link</option>
          </select>
        </FieldShell>
        <FieldShell label="Instagram URL" helper="Required when Destination Link Type is Instagram. Example: https://instagram.com/...">
          <BaseInput
            name="instagramUrl"
            value={editingDestination.instagramUrl}
            onChange={handleInputChange}
            placeholder="https://instagram.com/..."
            type="url"
          />
        </FieldShell>
        {!isInstagramLink ? (
          <FieldShell label="Read Time">
            <BaseInput name="readTime" value={editingDestination.readTime} onChange={handleInputChange} placeholder="5 min read" />
          </FieldShell>
        ) : null}
      </div>

      {!isInstagramLink ? (
        <FieldShell label="Excerpt">
          <textarea
            name="excerpt"
            value={editingDestination.excerpt || ''}
            onChange={handleInputChange}
            rows={3}
            placeholder="Short summary for cards and previews"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </FieldShell>
      ) : null}

      <div className="flex items-center gap-3">
        <input
          id="showInTrending"
          type="checkbox"
          name="showInTrending"
          checked={Boolean(editingDestination.showInTrending)}
          onChange={handleInputChange}
          className="h-4 w-4"
        />
        <label htmlFor="showInTrending" className="text-sm text-gray-700">Show this destination in trending sections</label>
      </div>

      {!isInstagramLink ? (
        <FieldShell label="Destination Content">
          <RichTextEditor
            value={editingDestination.contentHtml}
            onChange={handleContentChange}
            placeholder="Write the full destination story here..."
          />
        </FieldShell>
      ) : null}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 bg-black text-white rounded-md font-medium cursor-pointer"
        >
          Save Destination
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
  );
}