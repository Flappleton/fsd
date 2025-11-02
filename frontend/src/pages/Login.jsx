// ============================================
// LOGIN PAGE - User Authentication
// ============================================
// Users log in here
// TO CUSTOMIZE: Change form fields, validation, styling

import { useState } from 'react' // React Hook - for form state
import { useDispatch, useSelector } from 'react-redux' // React Hooks
import { useNavigate, Link } from 'react-router-dom' // React Hook
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'
import api from '../utils/api'

function Login() {
  // React Hook: useState - Manage form input state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // React Hook: useDispatch - Dispatch Redux actions
  const dispatch = useDispatch()
  
  // React Hook: useSelector - Get loading/error state
  const { isLoading, error } = useSelector((state) => state.auth)
  
  // React Hook: useNavigate - Navigate after login
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Dispatch login start action
    dispatch(loginStart())

    try {
      // Call login API
      const response = await api.post('/auth/login', { email, password })
      
      // Dispatch success action (stores token in Redux and localStorage)
      dispatch(loginSuccess({
        token: response.data.token,
        user: response.data.user
      }))

      // Redirect to dashboard
      navigate('/dashboard')
    } catch (err) {
      // Dispatch failure action (stores error message)
      dispatch(loginFailure(err.response?.data?.error || 'Login failed'))
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Login
        </h2>

        {/* Display error message if login fails */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="your@email.com"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Link to Register */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-600 dark:text-green-400 hover:underline">
            Register here
          </Link>
        </p>

        {/* Test Credentials Hint */}
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-400">
          <p className="font-semibold mb-2">Test Credentials:</p>
          <p>Admin: admin@example.com / admin123</p>
          <p>User: user@example.com / user123</p>
        </div>
      </div>
    </div>
  )
}

export default Login

