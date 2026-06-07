'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WebflowClientOnly from '../components/WebflowClientOnly';

import AdminLogin from './components/AdminLogin';
import PackageList from './components/PackageList';
import PackageEditor from './components/PackageEditor';
import AdminPreviewPane from './components/AdminPreviewPane';
import BlogList from './components/BlogList';
import BlogEditor from './components/BlogEditor';
import DestinationList from './components/DestinationList';
import DestinationEditor from './components/DestinationEditor';
import TestimonialManager from './components/TestimonialManager';
import GalleryManager from './components/GalleryManager';
import { slugify } from '../../lib/utils/slugify';

// Lucide Icons
import { 
  FolderArchive, 
  MapPin, 
  MessageSquare, 
  Image as ImageIcon, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  LayoutDashboard, 
  UserCheck, 
  Plus 
} from 'lucide-react';

// React-Toastify and SweetAlert2
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const ADMIN_TABS = [
  { id: 'packages', label: 'Packages', icon: FolderArchive },
  { id: 'destinations', label: 'Destinations', icon: MapPin },
  { id: 'testimonials', label: 'Stories', icon: MessageSquare },
  { id: 'gallery', label: 'Photo Booth', icon: ImageIcon },
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('packages');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Admin state
  const [packages, setPackages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingDestination, setEditingDestination] = useState(null);
  const [selectedPackageSlug, setSelectedPackageSlug] = useState(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState(null);
  const [selectedDestinationSlug, setSelectedDestinationSlug] = useState(null);
  const [togglingTrendingSlug, setTogglingTrendingSlug] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      void Promise.all([fetchPackages(), fetchDestinations()]);
    }
  }, [isLoggedIn]);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/packages?status=all');
      const data = await res.json();
      if (data.success) {
        setPackages(data.data);
      } else {
        toast.error('Failed to fetch packages from database.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error fetching packages.');
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs?status=all');
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      } else {
        toast.error('Failed to fetch blogs from database.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error fetching blogs.');
    }
  };

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/destinations?status=all');
      const data = await res.json();
      if (data.success) {
        setDestinations(data.data);
      } else {
        toast.error('Failed to fetch destinations from database.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error fetching destinations.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === '1234' && password === '1234') {
      setIsLoggedIn(true);
      setError('');
      toast.success('Welcome back to the Admin Panel!');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleAddClick = () => {
    if (activeTab === 'packages') {
      setEditingPackage({
        isNew: true,
        slug: '',
        title: 'New Package',
        destination: '',
        category: '',
        travelType: 'Domestic',
        getYourGuideLink: '',
        imageSrc: null,
        description: '',
        cost: 0,
        duration: 0,
      });
      setSelectedPackageSlug('');
      return;
    }

    setEditingDestination({
      isNew: true,
      slug: '',
      name: '',
      country: '',
      tagline: '',
      badge: '',
      heroImage: '',
      cardImage: '',
      excerpt: '',
      readTime: '',
      contentHtml: '',
      status: 'draft',
      showInTrending: true,
      sortOrder: 0,
      linkType: 'blog',
      instagramUrl: '',
    });
    setSelectedDestinationSlug('');
  };

  const handleEditClick = (pkg) => {
    setEditingPackage({ ...pkg });
    setSelectedPackageSlug(pkg.slug);
  };

  const handleBlogEditClick = (blog) => {
    setEditingBlog({ ...blog });
    setSelectedBlogSlug(blog.slug);
  };

  const handleDestinationEditClick = (destination) => {
    setEditingDestination({ ...destination });
    setSelectedDestinationSlug(destination.slug);
  };

  const handleDeleteClick = async (pkg) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to permanently delete "${pkg.title}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#000',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch('/api/packages', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug: pkg.slug })
        });

        if (res.ok) {
          setPackages(prev => prev.filter(p => p.slug !== pkg.slug));
          if (selectedPackageSlug === pkg.slug) {
            setSelectedPackageSlug(null);
          }
          toast.success(`Package "${pkg.title}" permanently deleted.`);
        } else {
          toast.error('Failed to delete package from database.');
        }
      } catch (err) {
        console.error(err);
        toast.error('Network Error connecting to server backend');
      }
    }
  };

  const handleBlogDeleteClick = async (blog) => {
    const result = await Swal.fire({
      title: 'Delete blog post?',
      text: `You are about to permanently delete "${blog.title}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#000',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch('/api/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: blog.slug }),
      });

      if (!res.ok) {
        toast.error('Failed to delete blog post.');
        return;
      }

      setBlogs((prev) => prev.filter((item) => item.slug !== blog.slug));
      if (selectedBlogSlug === blog.slug) {
        setSelectedBlogSlug(null);
      }
      toast.success(`Blog post "${blog.title}" deleted.`);
    } catch (err) {
      console.error(err);
      toast.error('Network error deleting blog post.');
    }
  };

  const handleDestinationDeleteClick = async (destination) => {
    const result = await Swal.fire({
      title: 'Delete destination?',
      text: `You are about to permanently delete "${destination.name}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#000',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch('/api/destinations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: destination.slug }),
      });

      if (!res.ok) {
        toast.error('Failed to delete destination.');
        return;
      }

      setDestinations((prev) => prev.filter((item) => item.slug !== destination.slug));
      if (selectedDestinationSlug === destination.slug) {
        setSelectedDestinationSlug(null);
      }
      toast.success(`Destination "${destination.name}" deleted.`);
    } catch (err) {
      console.error(err);
      toast.error('Network error deleting destination.');
    }
  };

  const handleToggleDestinationTrending = async (destination, nextValue) => {
    setTogglingTrendingSlug(destination.slug);

    const previousDestinations = destinations;
    setDestinations((prev) =>
      prev.map((item) =>
        item.slug === destination.slug ? { ...item, showInTrending: nextValue } : item
      )
    );

    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...destination,
          showInTrending: nextValue,
        }),
      });

      if (!res.ok) {
        setDestinations(previousDestinations);
        toast.error('Failed to update trending toggle.');
        return;
      }

      toast.success(nextValue ? 'Added to trending destinations.' : 'Removed from trending destinations.');
    } catch (error) {
      console.error(error);
      setDestinations(previousDestinations);
      toast.error('Network error while updating trending toggle.');
    } finally {
      setTogglingTrendingSlug(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingPackage((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBlogInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingBlog((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const setBlogField = (name, value) => {
    setEditingBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDestinationInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingDestination((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    let slugToUse = editingPackage.slug;

    if (editingPackage.isNew) {
      slugToUse = editingPackage.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `new-package-${Date.now()}`;
    }

    const packagePayload = {
      slug: slugToUse,
      title: editingPackage.title,
      description: editingPackage.description,
      fullDescription: editingPackage.fullDescription || '',
      imageSrc: editingPackage.imageSrc,
      destination: editingPackage.destination,
      cost: editingPackage.cost,
      duration: editingPackage.duration,
      category: editingPackage.category,
      travelType: editingPackage.travelType || 'Domestic',
      getYourGuideLink: editingPackage.getYourGuideLink || '',
      bestTime: editingPackage.bestTime || '',
      difficulty: editingPackage.difficulty || 'Easy',
      groupSize: editingPackage.groupSize || '',
      highlights: editingPackage.highlights || [],
      itinerary: editingPackage.itinerary || [],
      included: editingPackage.included || [],
      excluded: editingPackage.excluded || [],
      status: editingPackage.status || 'published',
    };

    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packagePayload)
      });

      if (res.ok) {
        toast.success('Package successfully saved to the database!');
        setEditingPackage(null);
        await fetchPackages();
        setSelectedPackageSlug(slugToUse);
      } else {
        const errorData = await res.json();
        toast.error(`Failed to save: ${errorData.details || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Network Error connecting to server.');
    }
  };

  const handleSaveBlog = async () => {
    const slugToUse = editingBlog.slug || slugify(editingBlog.title);

    if (!editingBlog.title || !slugToUse) {
      toast.error('Blog title is required.');
      return;
    }

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingBlog,
          slug: slugToUse,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(`Failed to save blog: ${errorData.details || errorData.error || 'Unknown error'}`);
        return;
      }

      toast.success('Blog saved successfully.');
      setEditingBlog(null);
      await fetchBlogs();
      setSelectedBlogSlug(slugToUse);
    } catch (err) {
      console.error(err);
      toast.error('Network error saving blog.');
    }
  };

  const handleSaveDestination = async () => {
    const slugToUse = editingDestination.slug || slugify(editingDestination.name);
    const destinationLinkType = editingDestination.linkType === 'instagram' ? 'instagram' : 'blog';
    const instagramUrl = (editingDestination.instagramUrl || '').trim();

    if (!editingDestination.name || !slugToUse) {
      toast.error('Destination name is required.');
      return;
    }

    if (destinationLinkType === 'instagram' && !instagramUrl) {
      toast.error('Instagram URL is required when link type is Instagram.');
      return;
    }

    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingDestination,
          slug: slugToUse,
          linkType: destinationLinkType,
          instagramUrl,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(`Failed to save destination: ${errorData.details || errorData.error || 'Unknown error'}`);
        return;
      }

      toast.success('Destination saved successfully.');
      setEditingDestination(null);
      await fetchDestinations();
      setSelectedDestinationSlug(slugToUse);
    } catch (err) {
      console.error(err);
      toast.error('Network error saving destination.');
    }
  };

  const handleCancel = () => {
    setEditingPackage(null);
    setEditingBlog(null);
    setEditingDestination(null);
  };

  const previewPackage = editingPackage || packages.find(p => p.slug === selectedPackageSlug);
  const previewBlog = editingBlog || blogs.find((blog) => blog.slug === selectedBlogSlug);
  const previewDestination = editingDestination || destinations.find((destination) => destination.slug === selectedDestinationSlug);

  const isEditing = Boolean(editingPackage || editingBlog || editingDestination);

  const renderTabBody = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="spinner"></div>
          <div className="text-sm text-slate-400 ml-3">Loading content from database...</div>
        </div>
      );
    }

    if (activeTab === 'packages') {
      return editingPackage ? (
        <PackageEditor
          editingPackage={editingPackage}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      ) : (
        <PackageList
          packages={packages}
          selectedPackageSlug={selectedPackageSlug}
          setSelectedPackageSlug={setSelectedPackageSlug}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      );
    }

    if (activeTab === 'testimonials') {
      return <TestimonialManager />;
    }

    if (activeTab === 'gallery') {
      return <GalleryManager />;
    }

    return editingDestination ? (
      <DestinationEditor
        editingDestination={editingDestination}
        handleInputChange={handleDestinationInputChange}
        handleContentChange={(value) => setEditingDestination((prev) => ({ ...prev, contentHtml: value }))}
        handleSave={handleSaveDestination}
        handleCancel={handleCancel}
      />
    ) : (
      <DestinationList
        destinations={destinations}
        selectedDestinationSlug={selectedDestinationSlug}
        setSelectedDestinationSlug={setSelectedDestinationSlug}
        handleEditClick={handleDestinationEditClick}
        handleDeleteClick={handleDestinationDeleteClick}
        handleToggleTrending={handleToggleDestinationTrending}
        togglingSlug={togglingTrendingSlug}
      />
    );
  };

  const renderSecondaryPreview = () => {
    if (activeTab === 'testimonials' || activeTab === 'gallery') {
      return null;
    }

    if (activeTab === 'blogs') {
      if (!previewBlog) {
        return <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm text-slate-400">Select a blog post to preview it.</div>;
      }

      return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          {previewBlog.heroImage ? (
            <img src={previewBlog.heroImage} alt={previewBlog.title} className="w-full h-48 object-cover border-b border-slate-100" />
          ) : null}
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2 flex-wrap text-[10px] uppercase tracking-wide text-slate-400">
              <span className="px-2 py-0.5 bg-slate-100 rounded">{previewBlog.status}</span>
              {previewBlog.category ? <span className="px-2 py-0.5 bg-slate-100 rounded">{previewBlog.category}</span> : null}
            </div>
            <h3 className="text-base font-bold text-slate-900">{previewBlog.title || 'Untitled blog post'}</h3>
            <p className="text-xs text-slate-400">{previewBlog.excerpt || 'Add an excerpt to see the preview summary.'}</p>
            <div className="prose prose-sm max-w-none text-xs text-slate-500" dangerouslySetInnerHTML={{ __html: previewBlog.contentHtml || '<p>No content yet.</p>' }} />
          </div>
        </div>
      );
    }

    if (activeTab === 'destinations') {
      if (!previewDestination) {
        return <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm text-slate-400">Select a destination to preview.</div>;
      }

      return (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          {previewDestination.heroImage ? (
            <img src={previewDestination.heroImage} alt={previewDestination.name} className="w-full h-48 object-cover border-b border-slate-100" />
          ) : null}
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2 flex-wrap text-[10px] uppercase tracking-wide text-slate-400">
              <span className="px-2 py-0.5 bg-slate-100 rounded">{previewDestination.status}</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded">{previewDestination.linkType || 'blog'}</span>
              {previewDestination.showInTrending ? <span className="px-2 py-0.5 bg-[#F4A300]/10 text-[#F4A300] rounded font-bold">Trending</span> : null}
            </div>
            <h3 className="text-base font-bold text-slate-900">{previewDestination.name || 'Untitled destination'}</h3>
            <p className="text-xs text-slate-400">{previewDestination.tagline || 'Add a tagline to see the preview summary.'}</p>
            {previewDestination.linkType === 'instagram' ? (
              <p className="text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded border border-slate-200 break-all">
                IG Redirect: {previewDestination.instagramUrl || 'No IG link.'}
              </p>
            ) : (
              <div className="prose prose-sm max-w-none text-xs text-slate-500" dangerouslySetInnerHTML={{ __html: previewDestination.contentHtml || '<p>No content yet.</p>' }} />
            )}
          </div>
        </div>
      );
    }

    return <AdminPreviewPane previewPackage={previewPackage} />;
  };

  const currentTabLabel = ADMIN_TABS.find(t => t.id === activeTab)?.label || 'Console';

  return (
    <WebflowClientOnly>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
        {!isLoggedIn ? (
          <AdminLogin
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            error={error}
            handleLogin={handleLogin}
          />
        ) : (
          <>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              theme="light"
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            {/* Premium Admin Header Navbar - Light Theme */}
            <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between z-20 shrink-0 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-[#193B9D] rounded-lg flex items-center justify-center font-bold text-sm tracking-widest text-white shadow-md shadow-[#193B9D]/20">
                  TT
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-tight text-slate-900">Toe Tripper</h1>
                  <p className="text-[10px] text-[#F4A300] uppercase tracking-widest font-semibold">Admin Console</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500 font-medium">
                  <UserCheck size={14} className="text-[#193B9D]" />
                  <span>Logged in as Administrator</span>
                </div>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    toast.info('Logged out successfully.');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-lg transition-all text-xs font-semibold cursor-pointer"
                >
                  <LogOut size={13} />
                  <span>Sign Out</span>
                </button>
              </div>
            </header>

            {/* Dashboard Workspace */}
            <div className="flex flex-1 overflow-hidden">
              
              {/* Left Collapsible Sidebar - Light Theme */}
              <aside 
                className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between select-none shrink-0 shadow-sm ${
                  sidebarCollapsed ? 'w-[70px]' : 'w-[240px]'
                }`}
              >
                <div className="py-6 px-3 space-y-1">
                  <p className={`text-[9px] uppercase font-bold tracking-widest text-slate-400 px-3 mb-3 transition-opacity ${
                    sidebarCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
                  }`}>
                    Data Entities
                  </p>
                  
                  {ADMIN_TABS.map((tab) => {
                    const IconComp = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.id);
                          setEditingPackage(null);
                          setEditingBlog(null);
                          setEditingDestination(null);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-[#193B9D] text-white shadow-md shadow-[#193B9D]/20' 
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                        title={sidebarCollapsed ? tab.label : undefined}
                      >
                        <IconComp size={17} className={isActive ? 'text-[#F4A300]' : 'text-slate-400'} />
                        {!sidebarCollapsed && <span>{tab.label}</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Sidebar Collapse Toggle Button */}
                <div className="p-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="w-full flex items-center justify-center p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
                  >
                    {sidebarCollapsed ? <ChevronRight size={16} /> : (
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <ChevronLeft size={16} />
                        <span>Collapse</span>
                      </div>
                    )}
                  </button>
                </div>
              </aside>

              {/* Main Workspace Frame - Light Theme */}
              <main className="flex-1 overflow-y-auto bg-slate-50 p-6 sm:p-8 flex flex-col gap-6">
                
                {/* Entity Control Header */}
                <div className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{currentTabLabel} Management</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Add, update, or delete {activeTab} information in the system database.</p>
                  </div>
                  
                  {!isEditing && (activeTab === 'packages' || activeTab === 'destinations') && (
                    <button
                      onClick={handleAddClick}
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#193B9D] hover:bg-[#153285] text-white rounded-xl transition-all text-xs font-bold shadow-md shadow-[#193B9D]/20 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>{activeTab === 'packages' ? 'Add Package' : 'Add Destination'}</span>
                    </button>
                  )}
                </div>

                {/* Two-Column Grid Workspace */}
                <div className="grid grid-cols-1 gap-6 items-start lg:grid-cols-3">
                  
                  {/* Left Management Workspace */}
                  <div className={`space-y-6 ${
                    (activeTab === 'testimonials' || activeTab === 'gallery') 
                      ? 'lg:col-span-3' 
                      : 'lg:col-span-2'
                  }`}>
                    <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm min-h-[300px] ${
                      activeTab === 'gallery' ? 'p-0 overflow-hidden' : 'p-6'
                    }`}>
                      {renderTabBody()}
                    </div>
                  </div>

                  {/* Right Live Preview Column */}
                  {!(activeTab === 'testimonials' || activeTab === 'gallery') && (
                    <div className="lg:col-span-1 sticky top-6">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2.5">Live Preview</div>
                      {renderSecondaryPreview()}
                    </div>
                  )}

                </div>

              </main>

            </div>
          </>
        )}
      </div>
    </WebflowClientOnly>
  );
}
