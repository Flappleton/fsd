// ============================================
// AUTH SLICE - Authentication State (Redux)
// ============================================
// Manages user login/logout and authentication state
// TO CUSTOMIZE: Change user fields if your project needs different user data

import { createSlice } from '@reduxjs/toolkit'

// Get token and user from localStorage (persists across page refreshes)
const getStoredAuth = () => {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  return {
    token: token || null,
    user: userStr ? JSON.parse(userStr) : null
  }
}

const initialState = {
  ...getStoredAuth(),
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // LOGIN - Store user token and info
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.token = action.payload.token
      state.user = action.payload.user
      state.error = null
      // Save to localStorage (persists data)
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
      state.token = null
      state.user = null
    },
    // LOGOUT - Clear user data
    logout: (state) => {
      state.token = null
      state.user = null
      state.error = null
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    // CLEAR ERROR
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions
export default authSlice.reducer

