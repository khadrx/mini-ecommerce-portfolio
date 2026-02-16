"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cartStore"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

const products = [
  { id: 1, name: "هودي أسود كلاسيك", price: 1200, image: "/images/hoodie-black.jpg" },
  { id: 2, name: "تيشيرت أبيض مطبوع", price: 450, image: "/images/tshirt-white.jpg" },
  { id: 3, name: "جينز أزرق رجالي", price: 1800, image: "/images/jeans-blue.jpg" },
]

export default function Home() {
  const addItem = useCartStore(state => state.addItem)

  return (
    <div className="container mx-auto py-12 px-4" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-xl font-bold text-primary">{product.price} ج.م</p>
            </CardContent>
            <CardFooter className="gap-2">
              <Link href={`/products/${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  عرض التفاصيل
                </Button>
              </Link>
              <Button
                className="flex-1"
                onClick={() => {
                  addItem(product)
                  toast.success("تم إضافة المنتج للسلة!", {
                    description: `${product.name} - الكمية: 1`,
                    action: {
                      label: "عرض السلة",
                      onClick: () => window.location.href = "/cart",
                    },
                  })
                }}
              >
                أضف للسلة
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}