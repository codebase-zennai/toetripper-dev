'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import ProtectedRoute from '@/lib/auth/ProtectedRoute';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/cms/dashboard', icon: '📊' },
    { name: 'Pages', href: '/cms/pages', icon: '📄' },
    { name: 'Media', href: '/cms/media', icon: '🖼️' },
  ];

  const isActive = (href) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
              <h1 className="text-xl font-bold">CMS Admin</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User info & logout */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {navigation.find((item) => isActive(item.href))?.name || 'CMS'}
                </h2>
                <Link
                  href="/"
                  target="_blank"
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  View Site →
                </Link>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
