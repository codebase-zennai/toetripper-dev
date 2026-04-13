import { useEffect, useState } from 'react';
import RichTextEditor from './RichTextEditor';
import { parseCategoryTags, formatCategoryTags } from '../../../lib/utils/categoryTags';

export default function PackageEditor({ editingPackage, handleInputChange, handleSave, handleCancel }) {
  if (!editingPackage) return null;

  const CATEGORY_OPTIONS = [
    'Adventure',
    'Beach',
    'Cultural',
    'Wellness',
    'Family',
    'Honeymoon',
    'Luxury',
    'Corporate',
    'Wildlife',
    'Pilgrimage',
  ];

  const [enableAdditionalInfo, setEnableAdditionalInfo] = useState(false);
  const [categoryTags, setCategoryTags] = useState([]);
  const [customCategoryInput, setCustomCategoryInput] = useState('');

  useEffect(() => {
    setEnableAdditionalInfo(false);
  }, [editingPackage?.slug]);

  useEffect(() => {
    setCategoryTags(parseCategoryTags(editingPackage?.category));
    setCustomCategoryInput('');
  }, [editingPackage?.slug, editingPackage?.category]);

  const syncCategoryTags = (nextTags) => {
    const uniqueTags = Array.from(new Set(nextTags.map((tag) => tag.trim()).filter(Boolean)));
    setCategoryTags(uniqueTags);
    handleInputChange({ target: { name: 'category', value: uniqueTags.join(', ') } });
  };

  const handleAddCategoryTag = (tag) => {
    if (!tag?.trim()) return;
    syncCategoryTags([...categoryTags, tag]);
  };

  const handleRemoveCategoryTag = (tagToRemove) => {
    syncCategoryTags(categoryTags.filter((tag) => tag !== tagToRemove));
  };

  const toMultilineText = (value) => {
    if (!Array.isArray(value)) return '';
    return value.join('\n');
  };

  const toItineraryText = (value) => {
    if (!Array.isArray(value)) return '';
    return value
      .map((item) => `${item?.day ?? ''}|${item?.title ?? ''}|${item?.description ?? ''}`)
      .join('\n');
  };

  const parseMultilineText = (value) => {
    return value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  };

  const parseItineraryText = (value) => {
    return value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const [dayRaw, titleRaw, ...descriptionRawParts] = line.split('|');
        const parsedDay = Number(dayRaw?.trim());
        return {
          day: Number.isFinite(parsedDay) && parsedDay > 0 ? parsedDay : index + 1,
          title: (titleRaw || '').trim(),
          description: descriptionRawParts.join('|').trim(),
        };
      })
      .filter((item) => item.title || item.description);
  };

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
            <div className="space-y-2">
              <select
                value=""
                onChange={(e) => handleAddCategoryTag(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="" disabled>Add from general categories</option>
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customCategoryInput}
                  onChange={(e) => setCustomCategoryInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Add custom category and press Add"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleAddCategoryTag(customCategoryInput);
                    setCustomCategoryInput('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm font-medium cursor-pointer"
                >
                  Add
                </button>
              </div>

              <input
                type="text"
                name="category"
                value={formatCategoryTags(categoryTags)}
                onChange={(e) => syncCategoryTags(parseCategoryTags(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Categories (comma separated)"
              />

              {categoryTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {categoryTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleRemoveCategoryTag(tag)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 cursor-pointer"
                      title="Click to remove"
                    >
                      {tag}
                      <span aria-hidden="true">x</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <div className="flex items-center gap-4">
              {editingPackage.imageSrc && (
                <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
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
          <RichTextEditor
            value={editingPackage.description || ''}
            onChange={(value) => handleInputChange({ target: { name: 'description', value } })}
            placeholder="Write the short package description..."
          />
        </div>

        <div className="border border-gray-200 rounded-lg p-4 md:p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-black">Additional Details</h3>
              <p className="text-sm text-gray-500 mt-1">Enable this section to enter full package information shown on package detail pages.</p>
            </div>
            <label className="inline-flex items-center gap-3 cursor-pointer select-none">
              <span className="text-sm font-medium text-gray-700">Turn on</span>
              <button
                type="button"
                role="switch"
                aria-checked={enableAdditionalInfo}
                onClick={() => setEnableAdditionalInfo((prev) => !prev)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enableAdditionalInfo ? 'bg-black' : 'bg-gray-300'}`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${enableAdditionalInfo ? 'translate-x-5' : 'translate-x-1'}`}
                />
              </button>
            </label>
          </div>

          {!enableAdditionalInfo ? (
            <div className="rounded-md bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-600">
              Additional details are turned off by default.
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                <RichTextEditor
                  value={editingPackage.fullDescription || ''}
                  onChange={(value) => handleInputChange({ target: { name: 'fullDescription', value } })}
                  placeholder="Write the detailed package description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cost (INR)</label>
                  <input
                    type="number"
                    name="cost"
                    value={editingPackage.cost ?? ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. 35000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    name="duration"
                    value={editingPackage.duration ?? ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. 6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Type</label>
                  <input
                    type="text"
                    name="travelType"
                    value={editingPackage.travelType || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Domestic"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Best Time</label>
                  <input
                    type="text"
                    name="bestTime"
                    value={editingPackage.bestTime || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. October to March"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <input
                    type="text"
                    name="difficulty"
                    value={editingPackage.difficulty || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Easy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                  <input
                    type="text"
                    name="groupSize"
                    value={editingPackage.groupSize || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. 2-20 people"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={editingPackage.status || 'published'}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Highlights</label>
                <textarea
                  value={toMultilineText(editingPackage.highlights)}
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: 'highlights',
                        value: parseMultilineText(e.target.value),
                      },
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={'One highlight per line\nLocal guided experiences\nPremium stay options'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Itinerary</label>
                <textarea
                  value={toItineraryText(editingPackage.itinerary)}
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: 'itinerary',
                        value: parseItineraryText(e.target.value),
                      },
                    })
                  }
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={'Format: day|title|description\n1|Arrival|Airport pickup and hotel check-in\n2|City Tour|Guided old city walk'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Included</label>
                  <textarea
                    value={toMultilineText(editingPackage.included)}
                    onChange={(e) =>
                      handleInputChange({
                        target: {
                          name: 'included',
                          value: parseMultilineText(e.target.value),
                        },
                      })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={'One item per line\nHotel stay\nBreakfast'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excluded</label>
                  <textarea
                    value={toMultilineText(editingPackage.excluded)}
                    onChange={(e) =>
                      handleInputChange({
                        target: {
                          name: 'excluded',
                          value: parseMultilineText(e.target.value),
                        },
                      })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder={'One item per line\nFlights\nPersonal expenses'}
                  />
                </div>
              </div>
            </div>
          )}
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
