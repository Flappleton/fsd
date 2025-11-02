// ============================================
// PROTECTED ROUTE COMPONENT - Route Guard
// ============================================
// Prevents access to pages unless user is logged in
// TO CUSTOMIZE: Add role-based protection if needed (admin only, etc.)

import { useSelector } from 'react-redux' // React Hook
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  // React Hook: useSelector - Check if user is authenticated
  const { token } = useSelector((state) => state.auth)

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // If authenticated, show the protected content
  return children
}

export default ProtectedRoute

