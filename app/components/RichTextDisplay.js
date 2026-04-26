'use client';

export default function RichTextDisplay({ content, className = '' }) {
  if (!content) return null;

  return (
    <div
      className={`prose prose-sm max-w-none ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
