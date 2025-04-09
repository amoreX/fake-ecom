import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


import { useCart } from "@/lib/cart-context"
import { motion, AnimatePresence } from "framer-motion"

export default function Cart() {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token")
    if (!isLoggedIn) {
      navigate("/")
    }
  }, [])

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const total = subtotal + shipping

  const handleCheckout = () => {
    setShowSuccess(true)

    // Clear cart after 4 seconds
    setTimeout(() => {
      setShowSuccess(false)
      clearCart()
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto px-4 py-8">
        {/* <div className="text-3xl sm:text-3xl font-bold mb-8">Your Cart</div> */}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.length === 0 ? (
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-4">Add some products to your cart to continue shopping</p>
                    <Button onClick={() => navigate("/dashboard")} className="bg-teal-600 hover:bg-teal-700">
                      Browse Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Cart Items ({cart.length})</CardTitle>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-4">
                    {cart.map((item) => (
                      <li key={item.id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row gap-4">
                        <div className="relative h-[150px] w-[150px] rounded-xl overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                          <img
                            src={item.image || "/placeholder.svg?height=150&width=150"}
                            alt={item.title}
                            className="object-contain w-full h-full transition-transform duration-500"
                          />
                        </div>

                        <div className="flex-1 flex flex-col">
                          <div className="space-y-1 mb-auto">
                            <h3 className="font-bold text-lg line-clamp-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.category || "Uncategorized"}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <span className="text-yellow-500">★</span>
                              <span>4.5</span>
                              <span className="text-muted-foreground">|</span>
                              <span>120 reviews</span>
                            </div>
                            <p className="font-bold text-teal-600 text-lg mt-1">${item.price.toFixed(2)}</p>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="h-9 w-9 rounded-full"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-9 w-9 rounded-full"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors sm:ml-auto flex items-center gap-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="text-sm">Remove</span>
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="border-none shadow-md sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  size="lg"
                  disabled={cart.length === 0}
                >
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-100 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50"
          >
            <span className="font-medium">Order placed successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
