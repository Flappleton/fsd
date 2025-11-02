// ============================================
// THEME SLICE - Dark/Light Mode (Redux)
// ============================================
// Manages theme state (dark mode / light mode)
// TO CUSTOMIZE: Add more theme options if needed

import { createSlice } from '@reduxjs/toolkit'

// Get saved theme from localStorage (persists user preference)
const getStoredTheme = () => {
  return localStorage.getItem('theme') || 'light'
}

const initialState = {
  theme: getStoredTheme() // 'light' or 'dark'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // TOGGLE THEME - Switch between light and dark
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      // Save to localStorage
      localStorage.setItem('theme', state.theme)
    },
    // SET THEME - Set specific theme
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    }
  }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer

