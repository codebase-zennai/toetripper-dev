export default function PackageEditor({ editingPackage, handleInputChange, handleSave, handleCancel }) {
  if (!editingPackage) return null;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-6">Edit Package: {editingPackage.title}</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={editingPackage.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. Mountain Escape"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              name="destination"
              value={editingPackage.destination}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. Himachal Pradesh"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={editingPackage.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. Adventure, Beach"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <div className="flex items-center gap-4">
              {editingPackage.imageSrc && (
                <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                  <img src={editingPackage.imageSrc} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Show immediate local preview first
                      const localUrl = URL.createObjectURL(file);
                      handleInputChange({
                        target: { name: 'imageSrc', value: localUrl }
                      });

                      try {
                        const formData = new FormData();
                        formData.append('file', file);
                        
                        // Infer a workable package name slug for the folder
                        const slug = editingPackage.slug || 
                                     editingPackage.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 
                                     'new-package';
                        
                        formData.append('packageSlug', slug);
                        
                        const res = await fetch('/api/upload', {
                          method: 'POST',
                          body: formData,
                        });
                        
                        if (res.ok) {
                          const data = await res.json();
                          if (data.success) {
                            // Update src to the actual saved local server path 
                            // i.e., /assets/packagename/imagename.jpg
                            handleInputChange({
                              target: { name: 'imageSrc', value: data.url }
                            });
                          }
                        } else {
                          console.error('Upload failed with status', res.status);
                        }
                      } catch (err) {
                        console.error('File upload error', err);
                      }
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer"
                />
                <p className="mt-1 text-xs text-gray-500">Pick an image from your computer to preview and upload it automatically.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <textarea
            name="description"
            value={editingPackage.description}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g. Curated mountain stays, scenic drives, and slow-travel moments built for recharge."
          />
        </div>

        <div className="flex gap-3 pt-4 border-t mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium cursor-pointer"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
