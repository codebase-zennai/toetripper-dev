'use client';

import { useState, useEffect, useRef } from 'react';

export default function MediaLibraryPage() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/cms/media');
      const data = await res.json();

      if (data.success) {
        setMediaFiles(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching media:', error);
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch('/api/cms/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSelectedFile(null);
        fileInputRef.current.value = '';
        fetchMedia();
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const copyUrl = (url) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    alert('URL copied to clipboard!');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Media</h3>
        <div className="flex items-center space-x-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {selectedFile && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
            </p>
          </div>
        )}
        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          All Media ({mediaFiles.length})
        </h3>
        
        {mediaFiles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No media files yet. Upload your first image!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaFiles.map((media) => (
              <div
                key={media.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image Preview */}
                <div className="aspect-square bg-gray-100 relative">
                  <img
                    src={media.url}
                    alt={media.originalName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* File Info */}
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-900 truncate mb-1">
                    {media.originalName}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {formatFileSize(media.size)}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => copyUrl(media.url)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Copy URL
                    </button>
                    <a
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-600 hover:text-gray-800"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">📘 How to Use</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Upload images to use in your pages</li>
          <li>• Click "Copy URL" to get the image URL</li>
          <li>• Paste the URL in the page editor's image tool</li>
          <li>• Or use it as a featured image for your pages</li>
        </ul>
      </div>
    </div>
  );
}
