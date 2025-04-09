import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { useCart } from "@/lib/cart-context"

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>() 
  const navigate = useNavigate();
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token")
    if (!isLoggedIn) {
      navigate("/")
      return
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const foundProduct = response.data.find((p: { id: number }) => p.id.toString() === productId)
        if (!foundProduct) {
        //   navigate("/dashboard")
          return
        }
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
      <main className="container mx-auto px-4 py-8">
        <div onClick={() => navigate("/dashboard")} className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to products
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <img
              src={product.image || "/placeholder.svg?height=600&width=600"}
              alt={product.title}
              className="object-contain w-full h-full transition-transform duration-500"
            />
          </div>

          <Card className="p-6 border-none shadow-md">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-2xl font-semibold text-teal-600 mb-4">${product.price.toFixed(2)}</p>

            <div className="h-px bg-gray-200 my-4"></div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="space-y-6">
              <div className="flex items-center">
                <span className="mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button onClick={handleAddToCart} className="w-full bg-teal-600 hover:bg-teal-700" size="lg">
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
