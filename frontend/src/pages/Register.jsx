// ============================================
// REGISTER PAGE - User Registration
// ============================================
// New users create account here
// TO CUSTOMIZE: Change form fields, validation, styling

import { useState } from 'react' // React Hook
import { useDispatch, useSelector } from 'react-redux' // React Hooks
import { useNavigate, Link } from 'react-router-dom' // React Hook
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice'
import api from '../utils/api'

function Register() {
  // React Hook: useState - Manage form input state
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // React Hook: useDispatch - Dispatch Redux actions
  const dispatch = useDispatch()
  
  // React Hook: useSelector - Get loading/error state
  const { isLoading, error } = useSelector((state) => state.auth)
  
  // React Hook: useNavigate - Navigate after registration
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate passwords match
    if (password !== confirmPassword) {
      dispatch(loginFailure('Passwords do not match'))
      return
    }

    // Validate password length
    if (password.length < 6) {
      dispatch(loginFailure('Password must be at least 6 characters'))
      return
    }

    dispatch(loginStart())

    try {
      // Call register API
      const response = await api.post('/auth/register', {
        username,
        email,
        password
      })

      // Dispatch success action (stores token and user)
      dispatch(loginSuccess({
        token: response.data.token,
        user: response.data.user
      }))

      // Redirect to dashboard
      navigate('/dashboard')
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.error || 'Registration failed'))
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Register
        </h2>

        {/* Display error message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="Choose a username"
            />
          </div>

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
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="At least 6 characters"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              placeholder="Confirm your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 dark:text-green-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register

