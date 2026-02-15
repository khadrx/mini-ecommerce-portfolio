"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cartStore"
import Link from "next/link"
import Image from "next/image"

const products = [
  { id: 1, name: "هودي أسود كلاسيك", price: 1200, image: "/hoodie-black.jpg" },
  { id: 2, name: "تيشيرت أبيض مطبوع", price: 450, image: "/tshirt-white.jpg" },
  { id: 3, name: "جينز أزرق رجالي", price: 1800, image: "/jeans-blue.jpg" },
  // أضف 4–6 منتجات تانيين
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
                onClick={() => addItem(product)}
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