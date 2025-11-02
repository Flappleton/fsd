// ============================================
// BACKEND SERVER - MOCK API WITH JWT AUTH
// ============================================
// This file contains all the API endpoints (RESTful APIs)
// You can test these endpoints using Postman
// 
// TO CUSTOMIZE FOR YOUR TOPIC:
// 1. Change the data structure (currently "items" - can be products, courses, etc.)
// 2. Modify the fields in the data objects
// 3. Update the route names if needed
// ============================================

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; // Backend runs on port 3001 (or from .env)

// ============================================
// MIDDLEWARE - Processes requests before they reach routes
// ============================================
// CORS configuration - Allow frontend to connect
// TO CUSTOMIZE: Update CORS_ORIGIN in .env for production
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
})); 
app.use(express.json()); // Parses JSON requests

// ============================================
// MOCK DATABASE - Replace with your topic's data structure
// ============================================
// CURRENT STRUCTURE: Generic "items" (can be products, courses, posts, etc.)
// TO CHANGE: Modify the fields below to match your topic
// Example: If e-commerce, change "title" to "productName", "description" to "productDescription", etc.
let items = [
  { id: 1, title: 'Item 1', description: 'Description for item 1', status: 'active', createdBy: 'admin' },
  { id: 2, title: 'Item 2', description: 'Description for item 2', status: 'active', createdBy: 'user' },
  { id: 3, title: 'Item 3', description: 'Description for item 3', status: 'inactive', createdBy: 'admin' }
];

// MOCK USERS DATABASE - Stores user accounts (no real database, just arrays)
// TO CUSTOMIZE: Add/remove default users, change roles
// ROLES: 'admin' can do everything, 'user' has limited access
// NOTE: Passwords are pre-hashed with bcrypt. Default passwords:
//   admin: admin123
//   user: user123
let users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123', // Will be hashed on server start
    role: 'admin' // ADMIN ROLE - full access
  },
  {
    id: 2,
    username: 'user',
    email: 'user@example.com',
    password: 'user123', // Will be hashed on server start
    role: 'user' // USER ROLE - limited access
  }
];

// Initialize default users with hashed passwords
// This ensures passwords are properly hashed on server start
async function initializeUsers() {
  // Hash passwords for default users
  users[0].password = await bcrypt.hash('admin123', 10);
  users[1].password = await bcrypt.hash('user123', 10);
}

// JWT SECRET KEY - Used to sign/verify tokens
// Load from environment variable (set in .env file)
// In production, ALWAYS use a strong secret key!
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ============================================
// HELPER FUNCTION - Verifies JWT token
// ============================================
// This middleware checks if the user is authenticated
const authenticateToken = (req, res, next) => {
  // Get token from request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add user info to request
    next(); // Continue to the route
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// REGISTER - Create new user account
// POST /api/auth/register
// Body: { username, email, password }
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password (bcrypt - security best practice)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      role: 'user' // Default role is 'user'
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// LOGIN - Authenticate existing user
// POST /api/auth/login
// Body: { email, password }
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ============================================
// PROTECTED ROUTES - Require authentication
// ============================================

// GET ALL ITEMS - Anyone authenticated can view
// GET /api/items
app.get('/api/items', authenticateToken, (req, res) => {
  // Returns all items
  res.json(items);
});

// GET SINGLE ITEM - Get item by ID
// GET /api/items/:id
app.get('/api/items/:id', authenticateToken, (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// CREATE ITEM - Add new item (any authenticated user)
// POST /api/items
// Body: { title, description, status }
app.post('/api/items', authenticateToken, (req, res) => {
  const { title, description, status } = req.body;

  // Validation
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const newItem = {
    id: items.length + 1,
    title,
    description,
    status: status || 'active',
    createdBy: req.user.username // Current logged-in user
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// UPDATE ITEM - Modify existing item
// PUT /api/items/:id
// Body: { title, description, status }
// ROLE CHECK: Only admin or item creator can update
app.put('/api/items/:id', authenticateToken, (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const item = items[itemIndex];
  
  // ROLE-BASED ACCESS: Check if user is admin or creator
  if (req.user.role !== 'admin' && item.createdBy !== req.user.username) {
    return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
  }

  // Update item fields
  const { title, description, status } = req.body;
  items[itemIndex] = {
    ...item,
    title: title || item.title,
    description: description || item.description,
    status: status || item.status
  };

  res.json(items[itemIndex]);
});

// DELETE ITEM - Remove item
// DELETE /api/items/:id
// ROLE CHECK: Only admin can delete
app.delete('/api/items/:id', authenticateToken, (req, res) => {
  // ROLE-BASED ACCESS: Only admin can delete
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }

  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items.splice(itemIndex, 1);
  res.json({ message: 'Item deleted successfully' });
});

// ============================================
// SERVER STARTUP
// ============================================
// Initialize users with hashed passwords, then start server
initializeUsers().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
    console.log(`📝 Test endpoints with Postman at http://localhost:${PORT}/api/`);
    console.log(`\n🔐 Default users:`);
    console.log(`   Admin: admin@example.com / admin123`);
    console.log(`   User: user@example.com / user123`);
  });
}).catch(err => {
  console.error('❌ Failed to initialize server:', err);
  process.exit(1);
});

