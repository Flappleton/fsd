// ============================================
// API UTILITY - Axios Configuration
// ============================================
// Handles all HTTP requests to the backend
// Automatically adds JWT token to requests
// TO CUSTOMIZE: Change base URL if your backend runs on different port

import axios from 'axios'

// Create axios instance
// TO CUSTOMIZE: Update VITE_API_URL in .env file for production
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:3001/api', // Backend API URL
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Interceptor - Add JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth and redirect
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

