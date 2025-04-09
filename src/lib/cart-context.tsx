
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type CartItem = {
  id: number
  name: string
  price: number
  description: string
  image?: string
  category?: string
  rating?: number
  reviews?: number
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem,
        )
      } else {
        return [...prevCart, item]
      }
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
