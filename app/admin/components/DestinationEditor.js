'use client';

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
        <FieldShell label="Hero Image URL">
          <BaseInput name="heroImage" value={editingDestination.heroImage} onChange={handleInputChange} placeholder="https://..." />
        </FieldShell>
        <FieldShell label="Card Image URL">
          <BaseInput name="cardImage" value={editingDestination.cardImage} onChange={handleInputChange} placeholder="https://..." />
        </FieldShell>
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