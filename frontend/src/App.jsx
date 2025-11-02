// ============================================
// MAIN APP COMPONENT - Routes and Layout
// ============================================
// This is the main component that handles routing
// TO CUSTOMIZE: Add more routes/pages as needed

import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux' // React Hook - access Redux state
import { useEffect } from 'react' // React Hook - run code on mount/update

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  // React Hook: useSelector - Get theme from Redux store
  const theme = useSelector((state) => state.theme.theme)

  // React Hook: useEffect - Apply theme class when theme changes or on mount
  useEffect(() => {
    // Add 'dark' class to HTML element for Tailwind dark mode
    // This runs on mount and whenever theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme]) // Run when 'theme' changes or component mounts

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Navbar appears on all pages */}
      <Navbar />
      
      {/* Routes - Different pages of your app */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Route - Requires login */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App

