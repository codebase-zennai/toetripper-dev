'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WebflowClientOnly from '../components/WebflowClientOnly';
import { DETAILED_PACKAGES } from '../../lib/db/packages';

import AdminLogin from './components/AdminLogin';
import PackageList from './components/PackageList';
import PackageEditor from './components/PackageEditor';
import AdminPreviewPane from './components/AdminPreviewPane';

// React-Toastify and SweetAlert2
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Admin state
  const [packages, setPackages] = useState(
    Object.entries(DETAILED_PACKAGES).map(([slug, data]) => ({ slug, ...data }))
  );
  const [editingPackage, setEditingPackage] = useState(null);
  const [selectedPackageSlug, setSelectedPackageSlug] = useState(null);

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
    setSelectedPackageSlug(''); // Hide preview or show empty preview
  };

  const handleEditClick = (pkg) => {
    setEditingPackage({ ...pkg });
    setSelectedPackageSlug(pkg.slug); // automatically select for preview
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
      const updatedPackages = packages.filter((p) => p.slug !== pkg.slug);
      
      // Optimistic Local update
      setPackages(updatedPackages);
      if (selectedPackageSlug === pkg.slug) {
        setSelectedPackageSlug(null);
      }

      // Backend sync
      try {
        const res = await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ packages: updatedPackages })
        });
        
        if (!res.ok) {
          toast.error('Failed to safely delete on server database. Hard refresh to reset the UI cache.');
        } else {
          toast.success(`Package "${pkg.title}" permanently deleted.`);
        }
      } catch(err) {
        console.error(err);
        toast.error('Network Error connecting to server backend');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPackage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    let updatedPackages;
    let createdSlug = null;
    
    if (editingPackage.isNew) {
      createdSlug = editingPackage.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `new-package-${Date.now()}`;
      const newPackage = { ...editingPackage, slug: createdSlug };
      delete newPackage.isNew;
      
      updatedPackages = [newPackage, ...packages];
    } else {
      updatedPackages = packages.map((pkg) => (pkg.slug === editingPackage.slug ? editingPackage : pkg));
    }

    // Update Local UI
    setPackages(updatedPackages);
    if (createdSlug) setSelectedPackageSlug(createdSlug);
    setEditingPackage(null);

    // Save to Backend to Persist across the site
    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packages: updatedPackages })
      });
      
      if (res.ok) {
        toast.success('Package successfully saved to the website!');
      } else {
        toast.error('Failed to sync to website database.');
      }
    } catch(err) {
      console.error(err);
      toast.error('Network Error connecting to server.');
    }
  };

  const handleCancel = () => {
    setEditingPackage(null);
  };

  const previewPackage = editingPackage || packages.find(p => p.slug === selectedPackageSlug);

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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                  {/* Left Column: Editor or List */}
                  <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-8">
                      <h1 className="text-3xl font-bold text-black">Package Management</h1>
                      <div className="flex gap-4">
                        {!editingPackage && (
                          <button
                            onClick={handleAddClick}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium cursor-pointer"
                          >
                            Add Package
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
                    {editingPackage ? (
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
                    )}
                  </div>

                  {/* Right Column: Live Preview */}
                  <div className="lg:col-span-1 sticky top-32">
                    <AdminPreviewPane previewPackage={previewPackage} />
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
