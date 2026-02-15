"use client"

import { useCartStore } from "@/lib/cartStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const products = [
  { id: 1, name: "هودي أسود كلاسيك", price: 1200, image: "/hoodie-black.jpg", description: "هودي دافئ عالي الجودة، خامة قطن 100%، تصميم كلاسيكي مريح للشتاء والخريف." },
  { id: 2, name: "تيشيرت أبيض مطبوع", price: 450, image: "/tshirt-white.jpg", description: "تيشيرت قطني ناعم، طباعة عالية الجودة، مثالي للصيف والاستخدام اليومي." },
  { id: 3, name: "جينز أزرق رجالي", price: 1800, image: "/jeans-blue.jpg", description: "جينز أصلي، قصة slim fit، مريح ومتين، يناسب كل الأوقات." },
  // أضف باقي المنتجات هنا بنفس الطريقة
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === Number(params.id))
  const addItem = useCartStore(state => state.addItem)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl" dir="rtl">
      <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-5 w-5" />
        العودة للمتجر
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* صورة المنتج */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-muted shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* التفاصيل */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mb-6">{product.price} ج.م</p>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1 py-6 text-lg"
              onClick={() => {
                addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
              }}
            >
              أضف للسلة
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="flex-1 py-6 text-lg"
            >
              اشترِ الآن
            </Button>
          </div>

          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">شحن مجاني للطلبات فوق 2000 ج.م</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">إرجاع خلال 14 يوم</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}