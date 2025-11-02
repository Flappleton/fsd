// ============================================
// MAIN ENTRY POINT - React Application
// ============================================
// This file starts your React app
// DO NOT MODIFY unless you know what you're doing

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux' // Redux Provider - wraps entire app
import { BrowserRouter } from 'react-router-dom' // For routing/navigation
import App from './App.jsx'
import { store } from './store/store' // Redux store
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Redux Provider - Makes store available to all components */}
    <Provider store={store}>
      {/* BrowserRouter - Enables navigation between pages */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

