"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

import ProductCard from "@/components/products/product-card"

// Update the Product interface to match the type used in ProductCard
interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function Home() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [products, setProducts] = useState<Product[]>([]) // Fetch products from API
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token")
    if (!isLoggedIn) {
      navigate("/")
    } else {
      // Fetch products from the API
      const fetchProducts = async () => {
        try {
          const response = await axios.get<Product[]>("https://fakestoreapi.com/products")
          setProducts(response.data)
          setFilteredProducts(response.data)
        } catch (error) {
          console.error("Error fetching products:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchProducts()
    }
  }, [navigate])

  // Filter products based on search and category
  useEffect(() => {
    let result = products

    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (category !== "all") {
      result = result.filter((product) => product.category === category)
    }

    setFilteredProducts(result)
  }, [searchQuery, category, products])

  const categories = ["all", ...new Set(products.map((product) => product.category))]

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Our Products</h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Skeleton className="h-[150px] w-full sm:w-[150px] rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-2/4" />
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-10 w-full mt-3" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
