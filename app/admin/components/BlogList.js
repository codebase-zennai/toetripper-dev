'use client';

export default function BlogList({
  blogs,
  selectedBlogSlug,
  setSelectedBlogSlug,
  handleEditClick,
  handleDeleteClick,
}) {
  if (blogs.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
        No blogs yet. Add your first post.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => {
        const isSelected = selectedBlogSlug === blog.slug;
        return (
          <div
            key={blog.slug}
            className={`bg-white border rounded-xl p-5 transition-colors ${
              isSelected ? 'border-black shadow-sm' : 'border-gray-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setSelectedBlogSlug(blog.slug)}
              className="w-full text-left cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {blog.status}
                    </span>
                    {blog.featured && (
                      <span className="text-xs font-semibold uppercase tracking-wide text-green-700">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-black">{blog.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">/{blog.slug}</p>
                  <p className="text-sm text-gray-600 mt-3 line-clamp-2">{blog.excerpt || 'No excerpt added yet.'}</p>
                </div>
                {blog.heroImage ? (
                  <img
                    src={blog.heroImage}
                    alt={blog.title}
                    className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                  />
                ) : null}
              </div>
            </button>
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => handleEditClick(blog)}
                className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium cursor-pointer"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteClick(blog)}
                className="px-4 py-2 border border-red-200 text-red-600 rounded-md text-sm font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}