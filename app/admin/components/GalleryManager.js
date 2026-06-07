'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  FolderOpen,
  Folder,
  Image as ImageIcon,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Tag,
  Check,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  HardDrive,
  FileImage,
  Globe,
  Copy,
  ExternalLink,
  LayoutGrid,
  Info,
  Plus,
} from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeFolder, setActiveFolder] = useState('all'); // 'all' | 'published' | 'drafts' | tag string
  const [allTags, setAllTags] = useState([]);

  // Upload state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploadMeta, setUploadMeta] = useState({ title: '', description: '', tags: '' });
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  // Editing state (for detail panel)
  const [editMeta, setEditMeta] = useState({ title: '', description: '', tags: '' });
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery?status=all');
      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];
      setItems(arr);

      // Collect all unique tags
      const tagSet = new Set();
      arr.forEach(item => {
        if (Array.isArray(item.tags)) {
          item.tags.forEach(t => { if (t) tagSet.add(t); });
        }
      });
      setAllTags([...tagSet]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load gallery items.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchItems(); }, [fetchItems]);

  // Select item -> populate edit state
  useEffect(() => {
    if (selectedItem) {
      setEditMeta({
        title: selectedItem.title || '',
        description: selectedItem.description || '',
        tags: Array.isArray(selectedItem.tags) ? selectedItem.tags.join(', ') : '',
      });
    }
  }, [selectedItem]);

  // Filtered items based on active folder
  const filteredItems = items.filter(item => {
    if (activeFolder === 'all') return true;
    if (activeFolder === 'published') return item.is_published;
    if (activeFolder === 'drafts') return !item.is_published;
    // tag filter
    return Array.isArray(item.tags) && item.tags.includes(activeFolder);
  });

  // Drag-and-drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadFile(file);
      setUploadPreview(URL.createObjectURL(file));
      setUploadMeta({ title: file.name.replace(/\.[^.]+$/, '').replace(/_/g, ' '), description: '', tags: '' });
    }
  };
  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadFile(file);
      setUploadPreview(URL.createObjectURL(file));
      setUploadMeta({ title: file.name.replace(/\.[^.]+$/, '').replace(/_/g, ' '), description: '', tags: '' });
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) return;
    setUploading(true);
    setUploadStatus('idle');

    try {
      // 1. Upload image to Supabase Storage
      const formData = new FormData();
      formData.append('file', uploadFile);
      const uploadRes = await fetch('/api/upload/gallery-image', { method: 'POST', body: formData });
      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.details || err.error || 'Upload failed');
      }
      const { url } = await uploadRes.json();

      // 2. Save metadata to gallery_items table
      const tags = uploadMeta.tags
        ? uploadMeta.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];
      const saveRes = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: uploadMeta.title || uploadFile.name,
          description: uploadMeta.description || null,
          image_url: url,
          tags,
        }),
      });
      if (!saveRes.ok) throw new Error('Failed to save metadata');

      setUploadStatus('success');
      toast.success('Image uploaded successfully!');
      setUploadFile(null);
      setUploadPreview(null);
      setUploadMeta({ title: '', description: '', tags: '' });
      await fetchItems();
    } catch (err) {
      console.error(err);
      setUploadStatus('error');
      toast.error(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handlePublish = async (item, next) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, is_published: next }),
      });
      if (!res.ok) throw new Error('Update failed');
      toast.success(next ? 'Published to gallery!' : 'Unpublished from gallery.');
      const updated = { ...item, is_published: next };
      setItems(prev => prev.map(i => i.id === item.id ? updated : i));
      setSelectedItem(updated);
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedItem) return;
    setSaving(true);
    try {
      const tags = editMeta.tags
        ? editMeta.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedItem.id,
          title: editMeta.title || null,
          description: editMeta.description || null,
          tags,
        }),
      });
      if (!res.ok) throw new Error('Save failed');
      toast.success('Asset details saved.');
      await fetchItems();
    } catch (err) {
      toast.error('Failed to save asset details.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: 'Delete Asset?',
      text: `This will permanently remove "${item.title || 'this image'}" from the gallery.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
    });
    if (!result.isConfirmed) return;
    try {
      const res = await fetch('/api/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id }),
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Asset deleted.');
      setSelectedItem(null);
      await fetchItems();
    } catch (err) {
      toast.error('Failed to delete asset.');
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.info('URL copied to clipboard!');
  };

  const formatBytes = (bytes) => {
    if (!bytes) return 'N/A';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const publishedCount = items.filter(i => i.is_published).length;
  const draftCount = items.filter(i => !i.is_published).length;

  return (
    <div className="flex gap-0 h-[calc(100vh-220px)] min-h-[500px] overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">

      {/* ── Left Folder Sidebar ── */}
      <aside className="w-[180px] shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col overflow-y-auto">
        <div className="p-3 border-b border-slate-200">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Photo Booth</p>
        </div>

        <div className="p-2 space-y-0.5 flex-1">
          {/* All Assets */}
          <button
            onClick={() => { setActiveFolder('all'); setSelectedItem(null); }}
            className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all text-left ${
              activeFolder === 'all'
                ? 'bg-[#193B9D] text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <LayoutGrid size={14} className={activeFolder === 'all' ? 'text-[#F4A300]' : 'text-slate-400'} />
            <span>All Assets</span>
            <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
              activeFolder === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
            }`}>{items.length}</span>
          </button>

          {/* Published */}
          <button
            onClick={() => { setActiveFolder('published'); setSelectedItem(null); }}
            className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all text-left ${
              activeFolder === 'published'
                ? 'bg-[#193B9D] text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FolderOpen size={14} className={activeFolder === 'published' ? 'text-[#F4A300]' : 'text-emerald-500'} />
            <span>Published</span>
            <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
              activeFolder === 'published' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600'
            }`}>{publishedCount}</span>
          </button>

          {/* Drafts */}
          <button
            onClick={() => { setActiveFolder('drafts'); setSelectedItem(null); }}
            className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all text-left ${
              activeFolder === 'drafts'
                ? 'bg-[#193B9D] text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Folder size={14} className={activeFolder === 'drafts' ? 'text-[#F4A300]' : 'text-amber-500'} />
            <span>Drafts</span>
            <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
              activeFolder === 'drafts' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-600'
            }`}>{draftCount}</span>
          </button>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="pt-3">
              <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400 px-2.5 mb-1">Tags</p>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => { setActiveFolder(tag); setSelectedItem(null); }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left ${
                    activeFolder === tag
                      ? 'bg-[#193B9D] text-white'
                      : 'text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  <Tag size={12} className={activeFolder === tag ? 'text-[#F4A300]' : 'text-slate-400'} />
                  <span className="truncate">{tag}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* ── Main Asset Grid ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <HardDrive size={14} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-600">
              {filteredItems.length} {activeFolder === 'all' ? 'asset' : ''}{filteredItems.length !== 1 ? 's' : ''}
              {activeFolder !== 'all' && activeFolder !== 'published' && activeFolder !== 'drafts' ? ` tagged "${activeFolder}"` : ''}
            </span>
          </div>
          <button
            onClick={() => { setSelectedItem(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#193B9D] hover:bg-[#153285] text-white text-xs font-bold rounded-lg shadow-sm shadow-[#193B9D]/20 transition-all cursor-pointer"
          >
            <Upload size={12} />
            <span>Upload Image</span>
          </button>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-3">
              <Loader2 className="animate-spin text-[#193B9D]" size={28} />
              <p className="text-xs text-slate-400">Loading assets...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-3 text-center">
              <FileImage size={36} className="text-slate-300" />
              <p className="text-sm font-semibold text-slate-400">No assets found</p>
              <p className="text-xs text-slate-300">Upload images using the button above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all focus:outline-none ${
                    selectedItem?.id === item.id
                      ? 'border-[#193B9D] shadow-md shadow-[#193B9D]/20'
                      : 'border-transparent hover:border-[#193B9D]/30 hover:shadow-sm'
                  }`}
                >
                  <img
                    src={item.image_url}
                    alt={item.title || 'Gallery asset'}
                    className="w-full h-full object-cover"
                  />
                  {/* Status badge overlay */}
                  <div className="absolute top-1 right-1">
                    <span className={`w-2 h-2 rounded-full block ${
                      item.is_published ? 'bg-emerald-400' : 'bg-amber-400'
                    }`} title={item.is_published ? 'Published' : 'Draft'} />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                    <p className="text-white text-[9px] font-semibold truncate w-full text-left leading-tight">{item.title || 'Untitled'}</p>
                  </div>
                  {/* Selection check */}
                  {selectedItem?.id === item.id && (
                    <div className="absolute top-1 left-1 w-4 h-4 bg-[#193B9D] rounded-full flex items-center justify-center shadow">
                      <Check size={9} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Right Detail / Upload Panel ── */}
      <aside className="w-[240px] shrink-0 bg-slate-50 border-l border-slate-200 flex flex-col overflow-y-auto">
        {selectedItem ? (
          /* Detail Inspector Panel */
          <div className="flex flex-col h-full">
            <div className="p-3 border-b border-slate-200 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Asset Details</span>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-all cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Image Preview */}
            <div className="p-3 border-b border-slate-200">
              <div className="aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={selectedItem.image_url}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Metadata Editor */}
            <div className="p-3 space-y-3 flex-1 overflow-y-auto">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Title</label>
                <input
                  type="text"
                  value={editMeta.title}
                  onChange={(e) => setEditMeta({ ...editMeta, title: e.target.value })}
                  placeholder="Image title"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#193B9D] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Description</label>
                <textarea
                  value={editMeta.description}
                  onChange={(e) => setEditMeta({ ...editMeta, description: e.target.value })}
                  placeholder="Short description"
                  rows={2}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#193B9D] transition-all resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editMeta.tags}
                  onChange={(e) => setEditMeta({ ...editMeta, tags: e.target.value })}
                  placeholder="travel, beach, team"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#193B9D] transition-all"
                />
              </div>

              {/* URL Copy */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Image URL</label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={selectedItem.image_url}
                    readOnly
                    className="flex-1 min-w-0 px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[10px] text-slate-500 truncate"
                  />
                  <button
                    onClick={() => copyUrl(selectedItem.image_url)}
                    className="shrink-0 p-1.5 bg-slate-200 hover:bg-slate-300 border border-slate-200 rounded-lg text-slate-500 transition-all cursor-pointer"
                    title="Copy URL"
                  >
                    <Copy size={11} />
                  </button>
                  <a
                    href={selectedItem.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1.5 bg-slate-200 hover:bg-slate-300 border border-slate-200 rounded-lg text-slate-500 transition-all"
                    title="Open in new tab"
                  >
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 pt-1">
                <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  selectedItem.is_published
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-amber-50 text-amber-600 border border-amber-200'
                }`}>
                  {selectedItem.is_published ? <CheckCircle2 size={9} /> : <AlertCircle size={9} />}
                  {selectedItem.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-3 border-t border-slate-200 space-y-2">
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#193B9D] hover:bg-[#153285] text-white text-xs font-bold rounded-lg transition-all cursor-pointer disabled:opacity-50 shadow-sm shadow-[#193B9D]/15"
              >
                {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                <span>{saving ? 'Saving...' : 'Save Details'}</span>
              </button>
              <button
                onClick={() => handlePublish(selectedItem, !selectedItem.is_published)}
                className={`w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer border ${
                  selectedItem.is_published
                    ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700'
                    : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700'
                }`}
              >
                {selectedItem.is_published ? <EyeOff size={12} /> : <Eye size={12} />}
                <span>{selectedItem.is_published ? 'Unpublish' : 'Publish'}</span>
              </button>
              <button
                onClick={() => handleDelete(selectedItem)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 text-xs font-semibold rounded-lg transition-all cursor-pointer"
              >
                <Trash2 size={12} />
                <span>Delete Asset</span>
              </button>
            </div>
          </div>
        ) : (
          /* Upload Panel */
          <div className="flex flex-col h-full">
            <div className="p-3 border-b border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Upload Image</span>
            </div>

            <div className="p-3 flex-1 flex flex-col gap-3 overflow-y-auto">
              {/* Drop Zone */}
              <div
                ref={dropZoneRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-all p-4 ${
                  isDragging
                    ? 'border-[#193B9D] bg-[#193B9D]/5'
                    : uploadFile
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-300 hover:border-[#193B9D]/50 hover:bg-slate-100 bg-white'
                }`}
                style={{ minHeight: '130px' }}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileInput}
                  className="sr-only"
                />
                {uploadPreview ? (
                  <>
                    <img
                      src={uploadPreview}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded-lg border border-slate-200"
                    />
                    <p className="text-[10px] text-slate-500 truncate w-full text-center">{uploadFile?.name}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadFile(null);
                        setUploadPreview(null);
                      }}
                      className="absolute top-1.5 right-1.5 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-red-500 shadow-sm"
                    >
                      <X size={10} />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload size={22} className={isDragging ? 'text-[#193B9D]' : 'text-slate-400'} />
                    <p className="text-xs text-slate-500 font-medium text-center">
                      {isDragging ? 'Drop to upload' : 'Click or drag image'}
                    </p>
                    <p className="text-[9px] text-slate-400">PNG, JPG, GIF, WEBP supported</p>
                  </>
                )}
              </div>

              {/* Upload Metadata */}
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Title</label>
                  <input
                    type="text"
                    value={uploadMeta.title}
                    onChange={(e) => setUploadMeta({ ...uploadMeta, title: e.target.value })}
                    placeholder="Photo title"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#193B9D] transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Tags</label>
                  <input
                    type="text"
                    value={uploadMeta.tags}
                    onChange={(e) => setUploadMeta({ ...uploadMeta, tags: e.target.value })}
                    placeholder="travel, mice, team"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#193B9D] transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Description</label>
                  <textarea
                    value={uploadMeta.description}
                    onChange={(e) => setUploadMeta({ ...uploadMeta, description: e.target.value })}
                    placeholder="Optional description..."
                    rows={2}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#193B9D] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Upload Status */}
              {uploadStatus === 'success' && (
                <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <p className="text-[10px] text-emerald-700 font-semibold">Image uploaded successfully!</p>
                </div>
              )}
              {uploadStatus === 'error' && (
                <div className="flex items-center gap-2 p-2.5 bg-rose-50 border border-rose-200 rounded-lg">
                  <AlertCircle size={14} className="text-rose-500 shrink-0" />
                  <p className="text-[10px] text-rose-700 font-semibold">Upload failed. Please retry.</p>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="p-3 border-t border-slate-200">
              <button
                onClick={handleUpload}
                disabled={!uploadFile || uploading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#193B9D] hover:bg-[#153285] disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shadow-md shadow-[#193B9D]/15"
              >
                {uploading ? (
                  <><Loader2 size={13} className="animate-spin" /> <span>Uploading...</span></>
                ) : (
                  <><Upload size={13} /> <span>Upload to Gallery</span></>
                )}
              </button>
              <p className="text-[9px] text-slate-400 text-center mt-1.5">Images start as drafts. Publish after upload.</p>
            </div>
          </div>
        )}
      </aside>

    </div>
  );
}
