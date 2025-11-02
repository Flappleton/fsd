// ============================================
// NAVBAR COMPONENT - Navigation Bar
// ============================================
// Displays navigation links and theme toggle
// TO CUSTOMIZE: Change links, logo text, styling

import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux' // React Hooks
import { logout } from '../store/slices/authSlice'
import { toggleTheme } from '../store/slices/themeSlice'

function Navbar() {
  // React Hook: useSelector - Get auth state from Redux
  const { user, token } = useSelector((state) => state.auth)
  
  // React Hook: useSelector - Get theme from Redux
  const theme = useSelector((state) => state.theme.theme)
  
  // React Hook: useDispatch - Call Redux actions
  const dispatch = useDispatch()
  
  // React Hook: useNavigate - Navigate programmatically
  const navigate = useNavigate()

  // Handle logout
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title - TO CUSTOMIZE: Change this text */}
          <Link to="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
            Template
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Home
            </Link>

            {/* Show Login/Register if not logged in */}
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* Show Dashboard if logged in */}
                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Dashboard
                </Link>
                
                {/* User info */}
                <span className="text-gray-700 dark:text-gray-300">
                  {user?.username} ({user?.role})
                </span>
                
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {/* Moon/Sun icon - changes based on theme */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {theme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

