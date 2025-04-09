import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, Menu, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"

export default function Navbar() {
  const navigate = useNavigate()
  const { cart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const cartItemsCount = mounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div onClick={() => navigate("/dashboard")} className="font-bold text-xl text-teal-600">
          ElegantShop
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <div onClick={() => navigate("/dashboard")} className="text-sm font-medium hover:text-teal-600 transition-colors cursor-pointer">
              Home
            </div>
            <div onClick={() => navigate("/dashboard/cart")} className="text-sm font-medium hover:text-teal-600 transition-colors cursor-pointer">
              Cart
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <div onClick={() => navigate("/dashboard/cart")} className="relative cursor-pointer">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {cartItemsCount}
                </span>
              )}
            </div>

            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[250px] sm:w-[300px] p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-lg">Menu</span>
              {/* Close button handled automatically, so no extra trigger needed */}
            </div>

            <nav className="flex flex-col gap-4">
              <div onClick={() => navigate("/dashboard")} className="text-sm font-medium hover:text-teal-600 transition-colors cursor-pointer">
                Home
              </div>
              <div onClick={() => navigate("/dashboard/cart")} className="text-sm font-medium hover:text-teal-600 transition-colors cursor-pointer flex items-center justify-between">
                Cart
                {cartItemsCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </nav>

            <div className="mt-auto pt-6 border-t">
              <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
