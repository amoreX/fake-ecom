import { useState } from "react"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface prod {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export default function ProductCard(product: prod) {
  const [isHovered, setIsHovered] = useState(false)
  const navigate=useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-lg rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div
            className="relative aspect-square sm:w-[150px] sm:h-[150px] overflow-hidden rounded-xl flex-shrink-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={product.image || "/placeholder.svg?height=400&width=400"}
              alt={product.title}
              className={`object-cover w-full h-full transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
            />
            <div onClick={()=>navigate(`/dashboard/product/${product.id}`)} className="absolute inset-0">
              <span className="sr-only">View {product.title}</span>
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="space-y-1 mb-auto">
              <h3 className="font-bold text-lg line-clamp-2">{product.title}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span className="text-yellow-500">★</span>
                <span>{product.rating.rate || "4.0"}</span>
                <span className="text-muted-foreground">|</span>
                <span>{product.rating.count || "0"} reviews</span>
              </div>
              <p className="font-semibold text-teal-600 text-lg mt-1">${product.price.toFixed(2)}</p>
            </div>

            <div className="mt-3">
              <div onClick={()=>navigate(`/dashboard/products/${product.id}`)} className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 rounded-full"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
