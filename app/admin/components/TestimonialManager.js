import { useState, useEffect } from 'react';
import { 
  Instagram, 
  Linkedin, 
  Star, 
  Trash2, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  X, 
  Link2, 
  MessageSquare, 
  Share2, 
  Globe, 
  ShieldCheck, 
  User, 
  Sparkles,
  AlertCircle,
  ExternalLink,
  Loader2,
  Edit2
} from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function getEmbedUrl(url) {
  if (!url) return null;
  
  // Instagram parsing
  const instaMatch = url.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/i);
  if (instaMatch) {
    return `https://www.instagram.com/p/${instaMatch[1]}/embed`;
  }
  
  // LinkedIn parsing
  const linkedinMatch = url.match(/linkedin\.com\/posts\/[a-zA-Z0-9_-]+(?:-|_)(\d+)/i) || 
                        url.match(/linkedin\.com\/posts\/activity-(\d+)/i) ||
                        url.match(/linkedin\.com\/feed\/update\/urn:li:activity:(\d+)/i) ||
                        url.match(/linkedin\.com\/feed\/update\/urn:li:share:(\d+)/i);
  if (linkedinMatch) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:share/${linkedinMatch[1]}`;
  }
  
  if (url.includes('instagram.com/p/') || url.includes('instagram.com/reel/') || url.includes('linkedin.com/embed')) {
    return url;
  }
  
  return null;
}

export default function TestimonialManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('direct'); // 'direct' or 'social'
  const [editingItem, setEditingItem] = useState(null);
  
  // Form State
  const [form, setForm] = useState({ 
    name: '', 
    destination: '', // Will hold location for 'direct' or post URL for 'social'
    rating: 5, 
    message: '', 
    image_url: '' 
  });
  
  // Accordion State
  const [isSocialExpanded, setIsSocialExpanded] = useState(true);
  const [isDirectExpanded, setIsDirectExpanded] = useState(true);

  // Card Preview State (Track which social cards have their live preview iframe toggled open)
  const [previewToggles, setPreviewToggles] = useState({});

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials?status=all');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    void fetchItems(); 
  }, []);

  const handlePublish = async (id, next) => {
    try {
      const res = await fetch('/api/testimonials', { 
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ id, is_published: next }) 
      });
      if (res.ok) {
        toast.success(next ? 'Testimonial published!' : 'Testimonial unpublished!');
        await fetchItems();
      } else {
        toast.error('Failed to update testimonial status.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating status.');
    }
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the testimonial from "${name}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#000',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch('/api/testimonials', { 
          method: 'DELETE', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ id }) 
        });
        if (res.ok) {
          toast.success('Testimonial permanently deleted.');
          await fetchItems();
        } else {
          toast.error('Failed to delete testimonial.');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error deleting testimonial.');
      }
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormType(getEmbedUrl(item.destination) !== null ? 'social' : 'direct');
    setForm({
      name: item.name,
      destination: item.destination || '',
      rating: item.rating || 5,
      message: item.message || '',
      image_url: item.image_url || ''
    });
    setShowForm(true);
  };

  const handleCreateClick = () => {
    setEditingItem(null);
    setFormType('direct');
    setForm({ name: '', destination: '', rating: 5, message: '', image_url: '' });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Name is required.');
      return;
    }
    if (formType === 'social' && !form.destination.trim()) {
      toast.error('Social Post URL is required.');
      return;
    }
    if (formType === 'social' && !getEmbedUrl(form.destination)) {
      toast.error('Invalid Instagram or LinkedIn URL. Please provide a valid post link.');
      return;
    }
    if (formType === 'direct' && !form.message.trim()) {
      toast.error('Review message is required.');
      return;
    }

    try {
      const payload = {
        name: form.name,
        destination: form.destination,
        rating: formType === 'social' ? 5 : Number(form.rating),
        message: formType === 'social' 
          ? (form.message.trim() || `Social share post: ${form.destination}`) 
          : form.message,
        image_url: form.image_url || null
      };

      let res;
      if (editingItem) {
        res = await fetch('/api/testimonials', { 
          method: 'PATCH', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ id: editingItem.id, ...payload }) 
        });
      } else {
        res = await fetch('/api/testimonials', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(payload) 
        });
      }

      if (res.ok) {
        toast.success(editingItem ? 'Testimonial successfully updated!' : 'New testimonial successfully added!');
        setForm({ name: '', destination: '', rating: 5, message: '', image_url: '' });
        setEditingItem(null);
        setShowForm(false);
        await fetchItems();
      } else {
        const errData = await res.json();
        toast.error(`Failed to save testimonial: ${errData.error || 'Server error'}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error saving testimonial.');
    }
  };

  const togglePreview = (id) => {
    setPreviewToggles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Split items into categories
  const socialTestimonials = items.filter(t => getEmbedUrl(t.destination) !== null);
  const directTestimonials = items.filter(t => getEmbedUrl(t.destination) === null);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner Control */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="text-[#F4A300]" size={18} />
          <span>Testimonial Manager</span>
        </h3>
        
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer bg-[#193B9D] hover:bg-[#153285] text-white shadow-md shadow-[#193B9D]/15"
        >
          <Plus size={14} />
          <span>Create Story</span>
        </button>
      </div>

      {/* Modal Popup for Add/Edit Testimonial */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl border border-slate-200 w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Sparkles className="text-[#F4A300]" size={18} />
                <h4 className="text-sm font-bold text-slate-900">
                  {editingItem ? 'Edit Testimonial' : 'Create New Testimonial'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form Scroll Area */}
            <div className="overflow-y-auto p-6 flex-1 text-left">
              <form onSubmit={handleSave} className="space-y-5">
                
                {/* Form Type Selector */}
                <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-fit">
                  <button
                    type="button"
                    onClick={() => {
                      setFormType('direct');
                      setForm(prev => ({ ...prev, destination: '' }));
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      formType === 'direct' 
                        ? 'bg-[#193B9D] text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Direct Story
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormType('social');
                      setForm(prev => ({ ...prev, destination: '' }));
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      formType === 'social' 
                        ? 'bg-[#193B9D] text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Social Embed
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Reviewer Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Reviewer Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                        <User size={14} />
                      </span>
                      <input 
                        type="text"
                        required
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        placeholder="e.g. Sarah Jenkins" 
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#193B9D] focus:ring-2 focus:ring-[#193B9D]/10 text-sm text-slate-800 placeholder-slate-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Destination / Link URL */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      {formType === 'social' ? 'Social Post Link (Instagram / LinkedIn)' : 'Location / Destination'}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                        {formType === 'social' ? <Link2 size={14} /> : <Globe size={14} />}
                      </span>
                      <input 
                        type={formType === 'social' ? 'url' : 'text'}
                        required
                        value={form.destination} 
                        onChange={(e) => setForm({ ...form, destination: e.target.value })} 
                        placeholder={formType === 'social' ? 'https://www.instagram.com/p/...' : 'e.g. Swiss Alps'} 
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#193B9D] focus:ring-2 focus:ring-[#193B9D]/10 text-sm text-slate-800 placeholder-slate-400 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Experience Rating */}
                  {formType === 'direct' && (
                    <div className="space-y-1.5 md:col-span-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Experience Rating</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                          <Star size={14} className="text-[#F4A300]" />
                        </span>
                        <select 
                          value={form.rating} 
                          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} 
                          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#193B9D] text-sm text-slate-800 appearance-none cursor-pointer transition-all"
                        >
                          {[5, 4, 3, 2, 1].map(r => (
                            <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Image URL */}
                  <div className={`space-y-1.5 ${formType === 'social' ? 'md:col-span-3' : 'md:col-span-2'}`}>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Avatar Image URL (Optional)</label>
                    <input 
                      type="url"
                      value={form.image_url} 
                      onChange={(e) => setForm({ ...form, image_url: e.target.value })} 
                      placeholder="https://images.unsplash.com/photo-..." 
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#193B9D] focus:ring-2 focus:ring-[#193B9D]/10 text-sm text-slate-800 placeholder-slate-400 transition-all"
                    />
                  </div>
                </div>

                {/* Review Content / Message */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {formType === 'social' ? 'Notes / Fallback Message (Optional)' : 'Review Message'}
                  </label>
                  <textarea 
                    required={formType === 'direct'}
                    value={form.message} 
                    onChange={(e) => setForm({ ...form, message: e.target.value })} 
                    placeholder={formType === 'social' ? 'Add notes or custom description about this embed...' : 'Describe the client experience and journey feedback...'} 
                    rows="4"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#193B9D] focus:ring-2 focus:ring-[#193B9D]/10 text-sm text-slate-800 placeholder-slate-400 transition-all resize-none"
                  />
                </div>

                {/* Modal Footer Actions */}
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-[#193B9D] hover:bg-[#153285] text-white text-xs font-bold rounded-xl shadow-md shadow-[#193B9D]/15 transition-all cursor-pointer"
                  >
                    {editingItem ? 'Save Changes' : 'Create Testimonial'}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* Testimonials List Workspaces */}
      <div className="space-y-4">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <Loader2 className="animate-spin text-[#193B9D]" size={28} />
            <p className="text-xs text-slate-400">Syncing with database...</p>
          </div>
        ) : (
          <>
            
            {/* Accordion 1: Social Media Testimonials */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setIsSocialExpanded(!isSocialExpanded)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-all text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#193B9D]/10 border border-[#193B9D]/15 rounded-xl text-[#193B9D]">
                    <Share2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Social Feed Testimonials</h4>
                    <p className="text-[10px] text-slate-400">Instagram & LinkedIn post embeds</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-md text-[10px] font-bold text-slate-500">
                      {socialTestimonials.length} Total
                    </span>
                    <span className="px-2 py-0.5 bg-[#193B9D]/10 border border-[#193B9D]/15 rounded-md text-[10px] font-bold text-[#193B9D]">
                      {socialTestimonials.filter(t => t.is_published).length} Published
                    </span>
                  </div>
                  {isSocialExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </button>

              {isSocialExpanded && (
                <div className="p-4 border-t border-slate-200 bg-slate-50">
                  {socialTestimonials.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <AlertCircle size={28} className="text-slate-300 mb-2" />
                      <p className="text-xs text-slate-400">No social testimonials in system.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {socialTestimonials.map((testimonial) => {
                        const embedUrl = getEmbedUrl(testimonial.destination);
                        const isInsta = testimonial.destination.includes('instagram.com');
                        const isLivePreviewOpen = Boolean(previewToggles[testimonial.id]);

                        return (
                          <div 
                            key={testimonial.id}
                            className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-[#193B9D]/30 hover:shadow-sm transition-all gap-4"
                          >
                            <div className="space-y-3">
                              {/* Card Header Info */}
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2.5">
                                  {testimonial.image_url ? (
                                    <img 
                                      src={testimonial.image_url} 
                                      alt={testimonial.name} 
                                      className="h-8 w-8 rounded-full object-cover border border-white/10"
                                    />
                                  ) : (
                                    <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                      {testimonial.name.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                                  <div>
                                    <h5 className="text-xs font-bold text-slate-900">{testimonial.name}</h5>
                                    <span className="inline-flex items-center gap-1 mt-0.5 text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                                      {isInsta ? (
                                        <span className="text-pink-500 flex items-center gap-0.5">
                                          <Instagram size={10} /> Instagram
                                        </span>
                                      ) : (
                                        <span className="text-blue-400 flex items-center gap-0.5">
                                          <Linkedin size={10} /> LinkedIn
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                </div>

                                <a 
                                  href={testimonial.destination}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-400 hover:text-slate-900 p-1 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all"
                                  title="Open original post"
                                >
                                  <ExternalLink size={12} />
                                </a>
                              </div>

                              {/* Embed Preview Toggle */}
                              {embedUrl ? (
                                <div className="space-y-2">
                                  <button
                                    type="button"
                                    onClick={() => togglePreview(testimonial.id)}
                                    className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-500 transition-all cursor-pointer"
                                  >
                                    <span>{isLivePreviewOpen ? 'Hide Live Preview' : 'Show Live Preview'}</span>
                                  </button>

                                  {isLivePreviewOpen && (
                                    <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                                      <iframe
                                        src={embedUrl}
                                        width="100%"
                                        height="380"
                                        frameBorder="0"
                                        scrolling="no"
                                        allowtransparency="true"
                                        allow="encrypted-media"
                                        title={`Verify Social Embed for ${testimonial.name}`}
                                        loading="lazy"
                                      />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-[10px]">
                                  Error: Unable to parse URL embed signature.
                                </div>
                              )}

                              {/* Testimonial Optional Message */}
                              {testimonial.message && (
                                <p className="text-[11px] text-slate-500 italic line-clamp-3">
                                  "{testimonial.message}"
                                </p>
                              )}
                            </div>

                            {/* Card Footer Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                              <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                testimonial.is_published 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-gray-500/10 text-gray-400 border border-white/5'
                              }`}>
                                {testimonial.is_published ? 'Published' : 'Draft'}
                              </span>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditClick(testimonial)}
                                  className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 rounded-lg transition-all cursor-pointer"
                                  title="Edit Story"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  onClick={() => handlePublish(testimonial.id, !testimonial.is_published)}
                                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                    testimonial.is_published
                                      ? 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-500'
                                      : 'bg-[#193B9D]/10 border-[#193B9D]/20 hover:bg-[#193B9D]/20 text-[#193B9D]'
                                  }`}
                                  title={testimonial.is_published ? 'Unpublish Story' : 'Publish Story'}
                                >
                                  {testimonial.is_published ? <EyeOff size={13} /> : <Eye size={13} />}
                                </button>
                                <button
                                  onClick={() => handleDelete(testimonial.id, testimonial.name)}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-500 rounded-lg transition-all cursor-pointer"
                                  title="Delete Story"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 2: Direct Stories (Direct Reviews) */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setIsDirectExpanded(!isDirectExpanded)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-all text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#193B9D]/10 border border-[#193B9D]/15 rounded-xl text-[#193B9D]">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Direct Client Stories</h4>
                    <p className="text-[10px] text-slate-400">Reviews & direct feedback submissions</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-md text-[10px] font-bold text-slate-500">
                      {directTestimonials.length} Total
                    </span>
                    <span className="px-2 py-0.5 bg-[#193B9D]/10 border border-[#193B9D]/15 rounded-md text-[10px] font-bold text-[#193B9D]">
                      {directTestimonials.filter(t => t.is_published).length} Published
                    </span>
                  </div>
                  {isDirectExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </button>

              {isDirectExpanded && (
                <div className="p-4 border-t border-slate-200 bg-slate-50">
                  {directTestimonials.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <AlertCircle size={28} className="text-slate-300 mb-2" />
                      <p className="text-xs text-slate-400">No direct reviews in system.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {directTestimonials.map((testimonial) => {
                        return (
                          <div 
                            key={testimonial.id}
                            className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-[#193B9D]/30 hover:shadow-sm transition-all gap-4"
                          >
                            <div className="space-y-2">
                              {/* Stars & Verification badge */}
                              <div className="flex justify-between items-center">
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={12} 
                                      fill={i < (testimonial.rating || 5) ? 'var(--secondary, #F4A300)' : 'transparent'} 
                                      color={i < (testimonial.rating || 5) ? 'var(--secondary, #F4A300)' : '#666'} 
                                    />
                                  ))}
                                </div>
                                <ShieldCheck className="text-emerald-400" size={16} />
                              </div>

                              {/* Review text */}
                              <p className="text-xs text-slate-700 italic line-clamp-4">
                                "{testimonial.message}"
                              </p>

                              {/* Client Details */}
                              <div className="flex items-center gap-2.5 pt-2">
                                {testimonial.image_url ? (
                                  <img 
                                    src={testimonial.image_url} 
                                    alt={testimonial.name} 
                                    className="h-8 w-8 rounded-full object-cover border border-white/10"
                                  />
                                ) : (
                                  <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                    {testimonial.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <h5 className="text-xs font-bold text-slate-900">{testimonial.name}</h5>
                                  {testimonial.destination && (
                                    <span className="text-[10px] text-slate-400 block">
                                      {testimonial.destination}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                              <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                testimonial.is_published 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-gray-500/10 text-gray-400 border border-white/5'
                              }`}>
                                {testimonial.is_published ? 'Published' : 'Draft'}
                              </span>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditClick(testimonial)}
                                  className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 rounded-lg transition-all cursor-pointer"
                                  title="Edit Story"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  onClick={() => handlePublish(testimonial.id, !testimonial.is_published)}
                                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                    testimonial.is_published
                                      ? 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-500'
                                      : 'bg-[#193B9D]/10 border-[#193B9D]/20 hover:bg-[#193B9D]/20 text-[#193B9D]'
                                  }`}
                                  title={testimonial.is_published ? 'Unpublish Story' : 'Publish Story'}
                                >
                                  {testimonial.is_published ? <EyeOff size={13} /> : <Eye size={13} />}
                                </button>
                                <button
                                  onClick={() => handleDelete(testimonial.id, testimonial.name)}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-500 rounded-lg transition-all cursor-pointer"
                                  title="Delete Story"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

          </>
        )}
      </div>

    </div>
  );
}
