import { NextResponse } from 'next/server';
import { verifyUser } from '@/lib/db/users';
import { initializeDemoUser } from '@/lib/db/users';

// Initialize demo user on first load
initializeDemoUser();

/**
 * POST /api/auth/login
 * Authenticate a user
 */
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Verify credentials
    const user = await verifyUser(email, password);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // In production, use proper JWT tokens or session management
    // For demo purposes, we'll return the user data
    return NextResponse.json({
      success: true,
      data: {
        user,
        token: `demo_token_${user.id}`, // Replace with real JWT
      },
      message: 'Login successful',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
