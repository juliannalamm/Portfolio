import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.css';    // Import fonts first so they load globally
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
