// ============================================
// DASHBOARD PAGE - Main Content Page
// ============================================
// Protected page - users see this after login
// TO CUSTOMIZE: This is where you'll modify content for your topic
// Change "items" to "products", "courses", etc. based on your exam topic

import { useState } from 'react' // React Hook
import { useSelector } from 'react-redux' // React Hook
import useItems from '../hooks/useItems' // Custom Hook

function Dashboard() {
  // React Hook: useSelector - Get current user
  const { user } = useSelector((state) => state.auth)
  
  // Custom Hook: useItems - Manage items (products, courses, etc.)
  const { items, isLoading, error, addItem, updateItem, deleteItem } = useItems()

  // React Hook: useState - Form state for adding/editing
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', status: 'active' })

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingItem) {
        // Update existing item
        await updateItem(editingItem.id, formData)
      } else {
        // Add new item
        await addItem(formData)
      }
      // Reset form
      setFormData({ title: '', description: '', status: 'active' })
      setShowForm(false)
      setEditingItem(null)
    } catch (err) {
      alert(err.message)
    }
  }

  // Start editing an item
  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({ title: item.title, description: item.description, status: item.status })
    setShowForm(true)
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id)
      } catch (err) {
        alert(err.message)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome, {user?.username}! You are logged in as <span className="font-semibold">{user?.role}</span>
        </p>
      </div>

      {/* Add Item Button */}
      <div className="mb-6">
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingItem(null)
            setFormData({ title: '', description: '', status: 'active' })
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          {showForm ? 'Cancel' : 'Add New Item'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Title {/* TO CUSTOMIZE: Change "Title" to "Product Name", "Course Title", etc. */}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Description {/* TO CUSTOMIZE: Change label as needed */}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Status {/* TO CUSTOMIZE: Change to "Stock", "Category", etc. */}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              {editingItem ? 'Update' : 'Add'} Item
            </button>
          </form>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Items List */}
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-300">Loading items...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-300">No items yet. Add one to get started!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.status === 'active'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}>
                  {item.status}
                </span>
                <div className="flex space-x-2">
                  {/* Edit button - Only admin or creator can edit */}
                  {(user?.role === 'admin' || item.createdBy === user?.username) && (
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  {/* Delete button - Only admin can delete */}
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Created by: {item.createdBy}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard

