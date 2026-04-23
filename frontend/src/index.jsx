import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Toaster } from 'sonner'
import brandLogo from '@/assets/images/Logo.png'

let faviconLink = document.querySelector("link[rel='icon']")
if (!faviconLink) {
  faviconLink = document.createElement('link')
  faviconLink.rel = 'icon'
  faviconLink.type = 'image/png'
  document.head.appendChild(faviconLink)
}
faviconLink.href = brandLogo

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  </React.StrictMode>,
)