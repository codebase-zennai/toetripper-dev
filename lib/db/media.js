/**
 * Database operations for Media
 * 
 * This handles media file metadata storage
 */

// In-memory storage (replace with actual database)
let media = [];
let nextId = 1;

/**
 * Create a new media entry
 */
export async function createMedia(mediaData) {
  const mediaItem = {
    id: `media_${nextId++}`,
    filename: mediaData.filename,
    originalName: mediaData.originalName,
    url: mediaData.url,
    mimeType: mediaData.mimeType,
    size: mediaData.size,
    uploadedBy: mediaData.uploadedBy,
    createdAt: new Date().toISOString(),
  };

  media.push(mediaItem);
  return mediaItem;
}

/**
 * Get all media files
 */
export async function getMedia(filters = {}) {
  let filteredMedia = [...media];

  if (filters.uploadedBy) {
    filteredMedia = filteredMedia.filter(m => m.uploadedBy === filters.uploadedBy);
  }

  if (filters.mimeType) {
    filteredMedia = filteredMedia.filter(m => m.mimeType.startsWith(filters.mimeType));
  }

  // Sort by createdAt (most recent first)
  filteredMedia.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return filteredMedia;
}

/**
 * Get media by ID
 */
export async function getMediaById(id) {
  return media.find(m => m.id === id) || null;
}

/**
 * Delete media
 */
export async function deleteMedia(id) {
  const index = media.findIndex(m => m.id === id);
  
  if (index === -1) {
    throw new Error('Media not found');
  }

  media.splice(index, 1);
  return true;
}
