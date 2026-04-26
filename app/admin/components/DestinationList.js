'use client';

export default function DestinationList({
  destinations,
  selectedDestinationSlug,
  setSelectedDestinationSlug,
  handleEditClick,
  handleDeleteClick,
  handleToggleTrending,
  togglingSlug,
}) {
  if (destinations.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
        No destinations yet. Add one to control the trending section.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {destinations.map((destination) => {
        const isSelected = selectedDestinationSlug === destination.slug;
        return (
          <div
            key={destination.slug}
            className={`bg-white border rounded-xl p-5 transition-colors ${
              isSelected ? 'border-black shadow-sm' : 'border-gray-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setSelectedDestinationSlug(destination.slug)}
              className="w-full text-left cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {destination.status}
                    </span>
                    {destination.showInTrending && (
                      <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                        Trending
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-black">{destination.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">/{destination.slug}</p>
                  <p className="text-sm text-gray-600 mt-3 line-clamp-2">{destination.excerpt || 'No excerpt added yet.'}</p>
                </div>
                {destination.cardImage ? (
                  <img
                    src={destination.cardImage}
                    alt={destination.name}
                    className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                  />
                ) : null}
              </div>
            </button>
            <div className="flex gap-3 mt-4 items-center flex-wrap">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={Boolean(destination.showInTrending)}
                  onChange={(e) => handleToggleTrending(destination, e.target.checked)}
                  disabled={togglingSlug === destination.slug}
                  className="h-4 w-4"
                />
                Trending Destinations
              </label>
              <button
                type="button"
                onClick={() => handleEditClick(destination)}
                className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium cursor-pointer"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteClick(destination)}
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