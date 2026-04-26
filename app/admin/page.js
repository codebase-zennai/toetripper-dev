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
import { slugify } from '../../lib/utils/slugify';

// React-Toastify and SweetAlert2
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const ADMIN_TABS = [
  { id: 'packages', label: 'Packages' },
  { id: 'destinations', label: 'Destinations' },
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('packages');

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
          // Remove from local state
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
        // Refresh the list from database
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

    if (!editingDestination.name || !slugToUse) {
      toast.error('Destination name is required.');
      return;
    }

    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingDestination,
          slug: slugToUse,
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
          <div className="text-lg text-gray-500">Loading content from database...</div>
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
    if (activeTab === 'blogs') {
      if (!previewBlog) {
        return <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-500">Select a blog post to preview it.</div>;
      }

      return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {previewBlog.heroImage ? (
            <img src={previewBlog.heroImage} alt={previewBlog.title} className="w-full h-48 object-cover" />
          ) : null}
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 flex-wrap text-xs uppercase tracking-wide text-gray-500">
              <span>{previewBlog.status}</span>
              {previewBlog.category ? <span>{previewBlog.category}</span> : null}
            </div>
            <h3 className="text-2xl font-bold text-black">{previewBlog.title || 'Untitled blog post'}</h3>
            <p className="text-sm text-gray-600">{previewBlog.excerpt || 'Add an excerpt to see the preview summary.'}</p>
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: previewBlog.contentHtml || '<p>No content yet.</p>' }} />
          </div>
        </div>
      );
    }

    if (activeTab === 'destinations') {
      if (!previewDestination) {
        return <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-500">Select a destination to preview it.</div>;
      }

      return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {previewDestination.heroImage ? (
            <img src={previewDestination.heroImage} alt={previewDestination.name} className="w-full h-48 object-cover" />
          ) : null}
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 flex-wrap text-xs uppercase tracking-wide text-gray-500">
              <span>{previewDestination.status}</span>
              {previewDestination.showInTrending ? <span>Trending</span> : null}
              {previewDestination.badge ? <span>{previewDestination.badge}</span> : null}
            </div>
            <h3 className="text-2xl font-bold text-black">{previewDestination.name || 'Untitled destination'}</h3>
            <p className="text-sm text-gray-600">{previewDestination.tagline || 'Add a tagline to see the preview summary.'}</p>
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: previewDestination.contentHtml || '<p>No content yet.</p>' }} />
          </div>
        </div>
      );
    }

    return <AdminPreviewPane previewPackage={previewPackage} />;
  };

  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
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
              <div>
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-3">

                  {/* Left Column: Editor or List */}
                  <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h1 className="text-3xl font-bold text-black">Content Admin</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage packages and destinations from one place.</p>
                      </div>
                      <div className="flex gap-4">
                        {!isEditing && (
                          <button
                            onClick={handleAddClick}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium cursor-pointer"
                          >
                            {activeTab === 'packages' ? 'Add Package' : 'Add Destination'}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setIsLoggedIn(false);
                            toast.info('Logged out successfully.');
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium cursor-pointer bg-white"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-6 flex-wrap">
                      {ADMIN_TABS.map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            setActiveTab(tab.id);
                            setEditingPackage(null);
                            setEditingBlog(null);
                            setEditingDestination(null);
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                            activeTab === tab.id
                              ? 'bg-black text-white'
                              : 'bg-white border border-gray-300 text-gray-700'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                    {renderTabBody()}
                  </div>

                  {/* Right Column: Live Preview */}
                  <div className="lg:col-span-1 sticky top-32">
                    {renderSecondaryPreview()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
