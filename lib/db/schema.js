/**
 * Database Schema for CMS
 * 
 * This schema can be implemented with any database (MongoDB, PostgreSQL, MySQL)
 * For this implementation, we'll use a JSON-based approach that can be adapted
 */

export const PageSchema = {
  id: "string (uuid)",
  title: "string (required)",
  slug: "string (required, unique)",
  content: "json (structured content from editor)",
  seoTitle: "string (optional)",
  seoDescription: "string (optional)",
  seoKeywords: "array of strings (optional)",
  status: "enum: 'draft' | 'published'",
  featured_image: "string (url, optional)",
  author_id: "string (references User)",
  created_at: "timestamp",
  updated_at: "timestamp",
  published_at: "timestamp (nullable)",
  version: "number (for versioning)",
};

export const UserSchema = {
  id: "string (uuid)",
  email: "string (required, unique)",
  name: "string (required)",
  password: "string (hashed)",
  role: "enum: 'admin' | 'editor' | 'viewer'",
  created_at: "timestamp",
  updated_at: "timestamp",
};

export const MediaSchema = {
  id: "string (uuid)",
  filename: "string (required)",
  original_name: "string (required)",
  url: "string (required)",
  mime_type: "string (required)",
  size: "number (bytes)",
  uploaded_by: "string (references User)",
  created_at: "timestamp",
};

export const PageVersionSchema = {
  id: "string (uuid)",
  page_id: "string (references Page)",
  content: "json (snapshot of content)",
  version: "number",
  created_by: "string (references User)",
  created_at: "timestamp",
};

/**
 * SQL Schema (PostgreSQL Example)
 */
export const SQL_SCHEMA = `
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content JSONB NOT NULL,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT[],
  status VARCHAR(50) DEFAULT 'draft',
  featured_image TEXT,
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP,
  version INTEGER DEFAULT 1
);

-- Create index on slug for faster lookups
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_status ON pages(status);

-- Media table
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size INTEGER NOT NULL,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Page versions table (for version control)
CREATE TABLE page_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  content JSONB NOT NULL,
  version INTEGER NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_page_versions_page_id ON page_versions(page_id);
`;

/**
 * MongoDB Schema (Mongoose Example)
 */
export const MONGODB_SCHEMA = `
const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: Object, required: true },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  featuredImage: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  version: { type: Number, default: 1 }
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'editor' }
}, { timestamps: true });

const MediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  url: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
`;
