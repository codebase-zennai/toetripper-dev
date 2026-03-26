import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const { packages } = await request.json();

    const newDetailedPackages = {};
    packages.forEach(pkg => {
      const { slug, ...data } = pkg;
      newDetailedPackages[slug] = data;
    });

    const fileContent = `/**
 * Detailed package data for individual package pages
 */

export const DETAILED_PACKAGES = ${JSON.stringify(newDetailedPackages, null, 2)};

export function getPackageBySlug(slug) {
  return DETAILED_PACKAGES[slug] || null;
}

export function getAllPackageSlugs() {
  return Object.keys(DETAILED_PACKAGES);
}
`;

    const dbPath = path.join(process.cwd(), 'lib', 'db', 'packages.js');
    await writeFile(dbPath, fileContent, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving packages:', error);
    return NextResponse.json({ error: 'Save failed', details: error.message }, { status: 500 });
  }
}
