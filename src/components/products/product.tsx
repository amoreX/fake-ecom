import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { useCart } from "@/lib/cart-context"

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showFullDescription, setShowFullDescription] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token")
    if (!isLoggedIn) {
      navigate("/")
      return
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products")
        const foundProduct = response.data.find(
          (p: { id: number }) => p.id.toString() === productId
        )
        if (!foundProduct) return
        setProduct(foundProduct)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, navigate])

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity })
    }
  }

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[80vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-4 md:mb-6 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to products
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Image Container */}
          <div className="w-fit mx-auto max-w-xs sm:max-w-sm md:max-w-full aspect-square overflow-hidden rounded-xl">
            <img
              src={product.image || "/placeholder.svg?height=600&width=600"}
              alt={product.title}
              className="object-contain w-full h-full transition-transform duration-500"
            />
          </div>

          {/* Text & Card Info */}
          <Card className="p-4 sm:p-5 md:p-6 border-none shadow-md">
            <div className="text-xl sm:text-xl md:text-2xl font-bold ">
              {product.title}
            </div>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-teal-600 ">
              ${product.price.toFixed(2)}
            </p>

            <div className="h-px bg-gray-200 "></div>

            <div className="text-sm sm:text-base text-gray-700 ">
              <p
                className={`${
                  showFullDescription ? "" : "line-clamp-2"
                } transition-all`}
              >
                {product.description}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium mt-1"
              >
                {showFullDescription ? "Show Less" : "More"}
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center flex-wrap sm:flex-nowrap">
                <span className="mr-4 text-sm md:text-base">Quantity:</span>
                <div className="flex items-center border rounded-md mt-2 sm:mt-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 sm:w-12 text-center text-sm md:text-base">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-teal-600 hover:bg-teal-700"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

