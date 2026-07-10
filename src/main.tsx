import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { AdminProvider } from './context/AdminContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AdminProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AdminProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
