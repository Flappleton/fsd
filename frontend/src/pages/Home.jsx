// ============================================
// HOME PAGE - Landing Page
// ============================================
// First page users see
// TO CUSTOMIZE: Change content, add images, modify styling

import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Template
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          A flexible template for your exam project
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border-2 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {/* Feature 1 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Responsive Design
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Built with Tailwind CSS for beautiful, responsive layouts on all devices.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            React Hooks
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Demonstrates useEffect, useContext, and custom hooks throughout the application.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            State Management
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Redux Toolkit for managing complex application state efficiently.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            RESTful APIs
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Secure, production-ready API endpoints ready for Postman testing.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            JWT Authentication
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Secure authentication with JWT tokens and role-based access control.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Dark Mode
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Theme switching with persistent preferences stored in localStorage.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home

