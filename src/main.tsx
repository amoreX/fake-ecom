import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './lib/cart-context.tsx'
import { ToastProvider } from "@/components/ui/toast"
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ToastProvider>
  </StrictMode>,
)
