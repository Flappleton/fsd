// ============================================
// REDUX STORE - Global State Management
// ============================================
// This manages the app's global state
// TO CUSTOMIZE: Add more slices (authSlice, itemSlice, etc.) as needed

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import itemReducer from './slices/itemSlice'
import themeReducer from './slices/themeSlice' // Dark/Light mode

// Configure Redux store
// Each "slice" manages a part of the state
export const store = configureStore({
  reducer: {
    auth: authReducer,      // Authentication state (user, token, etc.)
    items: itemReducer,     // Items/products/courses state
    theme: themeReducer     // Theme state (dark/light mode)
  }
})

