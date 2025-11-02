// ============================================
// ITEM SLICE - Items/Products/Courses State (Redux)
// ============================================
// Manages the main data (items, products, courses, etc.)
// TO CUSTOMIZE: Rename "items" to match your topic (products, courses, posts, etc.)

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],        // List of all items
  selectedItem: null, // Currently selected item
  isLoading: false,
  error: null
}

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // FETCH ITEMS - Load items from API
    fetchItemsStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchItemsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
      state.error = null
    },
    fetchItemsFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // ADD ITEM - Add new item
    addItemSuccess: (state, action) => {
      state.items.push(action.payload)
    },
    // UPDATE ITEM - Modify existing item
    updateItemSuccess: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    // DELETE ITEM - Remove item
    deleteItemSuccess: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    // SELECT ITEM - Set selected item
    selectItem: (state, action) => {
      state.selectedItem = action.payload
    },
    // CLEAR ERROR
    clearError: (state) => {
      state.error = null
    }
  }
})

export const {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  addItemSuccess,
  updateItemSuccess,
  deleteItemSuccess,
  selectItem,
  clearError
} = itemSlice.actions
export default itemSlice.reducer

