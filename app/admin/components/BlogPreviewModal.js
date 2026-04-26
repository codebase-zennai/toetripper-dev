'use client';

import RichTextDisplay from '../../components/RichTextDisplay';

export default function BlogPreviewModal({ blog, onClose }) {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/75 flex flex-col">
      <div className="w-full bg-amber-300 text-black text-sm font-semibold py-2.5 px-6 text-center">
        This is a preview of your blog post.
      </div>

      <div className="flex items-center justify-end p-4 bg-white border-b border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium cursor-pointer"
        >
          Close Preview
        </button>
      </div>

      <div className="overflow-y-auto bg-white flex-1">
        <section className="section">
          <div className="w-layout-blockcontainer container padding-13-5rem w-container">
            <div className="blog-wrapper">
              <div className="badge-post">
                <h5 className="no-wrap font-black">{blog.category || 'Travel'}</h5>
              </div>
              <h4>{blog.title || 'Untitled Blog Post'}</h4>
              <p className="max-width-30rem">{blog.excerpt || 'Add an excerpt to preview it here.'}</p>
              <div className="blog-block">
                <div className="avatar-wrapper">
                  {blog.authorAvatar ? (
                    <img width="Auto" height="Auto" alt={blog.authorName} src={blog.authorAvatar} loading="eager" />
                  ) : null}
                </div>
                <h5>{blog.authorName || 'Toe Tripper'}</h5>
              </div>
            </div>

            {blog.heroImage ? (
              <>
                <div className="space-2rem" />
                <div className="blog-image-wrapper">
                  <img
                    src={blog.heroImage}
                    loading="lazy"
                    alt={blog.title || 'Blog hero image'}
                    className="image-absolute"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
              </>
            ) : null}

            <div className="space-4rem" />
            <RichTextDisplay
              content={blog.contentHtml || '<p>No content yet. Start writing in the editor.</p>'}
              className="blog-post w-richtext"
            />
          </div>
        </section>
      </div>
    </div>
  );
}