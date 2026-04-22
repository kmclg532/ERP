import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const bootTheme = localStorage.getItem('userTheme') || 'light'
document.documentElement.setAttribute('data-theme', bootTheme)
// document.body.classList.add('font-sans', 'antialiased')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
