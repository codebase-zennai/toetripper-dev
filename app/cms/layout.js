'use client';

import { AuthProvider } from '@/lib/auth/AuthContext';

export default function CMSLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
