// Import React library - needed for all React apps
import React from 'react'
// Import createRoot - new way to render React apps (React 18+)
import { createRoot } from 'react-dom/client'
// Import main App component - the root of our application
import App from './App'
// Import global CSS styles
import './index.css'

// ENTRY POINT: This is where the React app starts
// Get the HTML element with id="root" from index.html
// Create a React root and render the App component into it
createRoot(document.getElementById('root')).render(
  // StrictMode helps find potential problems in development
  // It doesn't affect production build
  <React.StrictMode>
    <App />  {/* Main application component */}
  </React.StrictMode>
)
