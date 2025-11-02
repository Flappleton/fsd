// Tailwind CSS Configuration
// This controls styling for your entire app
// TO CUSTOMIZE: Change colors, fonts, spacing, etc. here
export default {
  // Enable dark mode using class strategy (required for theme toggle)
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // TO CUSTOMIZE COLORS: Add your brand colors here
      // Example: primary: { 50: '#...', 100: '#...' }
    },
  },
  plugins: [],
}

