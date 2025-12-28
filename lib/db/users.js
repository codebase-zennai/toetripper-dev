/**
 * Database operations for Users
 * 
 * This is a simple in-memory implementation for demonstration.
 * In production, use proper authentication (NextAuth, Auth0, Clerk, etc.)
 */

import bcrypt from 'bcryptjs';

// In-memory storage (replace with actual database)
let users = [];
let nextId = 1;

/**
 * Create a new user
 */
export async function createUser(userData) {
  // Check if email already exists
  if (users.some(u => u.email === userData.email)) {
    throw new Error('Email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = {
    id: `user_${nextId++}`,
    email: userData.email,
    name: userData.name,
    password: hashedPassword,
    role: userData.role || 'editor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(user);

  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email) {
  return users.find(u => u.email === email) || null;
}

/**
 * Get user by ID
 */
export async function getUserById(id) {
  const user = users.find(u => u.id === id);
  if (!user) return null;

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Verify user credentials
 */
export async function verifyUser(email, password) {
  const user = await getUserByEmail(email);
  
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Update user
 */
export async function updateUser(id, updates) {
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) {
    throw new Error('User not found');
  }

  // If password is being updated, hash it
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  const { password, ...userWithoutPassword } = users[index];
  return userWithoutPassword;
}

/**
 * Initialize with demo admin user
 */
export async function initializeDemoUser() {
  if (users.length === 0) {
    await createUser({
      email: 'admin@example.com',
      name: 'Admin User',
      password: 'admin123',
      role: 'admin',
    });
  }
}
