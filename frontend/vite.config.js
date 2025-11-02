import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration - Fast build tool for React
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend runs on port 3000
    proxy: {
      // Proxy API requests to backend
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})

