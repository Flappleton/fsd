// ============================================
// CUSTOM HOOK - useItems
// ============================================
// React Custom Hook - Reusable logic for managing items
// This demonstrates custom hooks (one of your experiments)
// TO CUSTOMIZE: Modify the API calls to match your backend endpoints

import { useEffect } from 'react' // React Hook
import { useDispatch, useSelector } from 'react-redux' // React Hooks
import {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  addItemSuccess,
  updateItemSuccess,
  deleteItemSuccess
} from '../store/slices/itemSlice'
import api from '../utils/api'

function useItems() {
  // React Hook: useDispatch - Dispatch Redux actions
  const dispatch = useDispatch()
  
  // React Hook: useSelector - Get items from Redux store
  const { items, isLoading, error } = useSelector((state) => state.items)

  // React Hook: useEffect - Fetch items when component mounts
  useEffect(() => {
    fetchItems()
  }, [])

  // Fetch all items from API
  const fetchItems = async () => {
    dispatch(fetchItemsStart())
    try {
      const response = await api.get('/items')
      dispatch(fetchItemsSuccess(response.data))
    } catch (err) {
      dispatch(fetchItemsFailure(err.response?.data?.error || 'Failed to fetch items'))
    }
  }

  // Add new item
  const addItem = async (itemData) => {
    try {
      const response = await api.post('/items', itemData)
      dispatch(addItemSuccess(response.data))
      return response.data
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to add item')
    }
  }

  // Update existing item
  const updateItem = async (id, itemData) => {
    try {
      const response = await api.put(`/items/${id}`, itemData)
      dispatch(updateItemSuccess(response.data))
      return response.data
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to update item')
    }
  }

  // Delete item
  const deleteItem = async (id) => {
    try {
      await api.delete(`/items/${id}`)
      dispatch(deleteItemSuccess(id))
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to delete item')
    }
  }

  return {
    items,
    isLoading,
    error,
    fetchItems,
    addItem,
    updateItem,
    deleteItem
  }
}

export default useItems

