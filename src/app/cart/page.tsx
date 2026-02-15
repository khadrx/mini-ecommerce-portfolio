"use client"

import { useCartStore } from "@/lib/cartStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center min-h-[70vh] flex flex-col items-center justify-center" dir="rtl">
        <h1 className="text-3xl font-bold mb-6">سلة التسوق</h1>
        <p className="text-lg text-muted-foreground mb-8">السلة فارغة حاليًا</p>
        <Link href="/">
          <Button size="lg" className="gap-2">
            <ArrowLeft className="h-5 w-5" />
            تصفح المنتجات
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl" dir="rtl">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">سلة التسوق</h1>
        <span className="text-muted-foreground">({totalItems()} منتج)</span>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {/* قائمة المنتجات */}
        <div className="md:col-span-2 space-y-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex gap-6">
                {/* صورة المنتج */}
                <div className="relative w-28 h-28 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* التفاصيل */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-primary font-bold">{item.price} ج.م</p>

                  <div className="flex items-center gap-6 mt-4">
                    {/* الكمية */}
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                        className="w-14 h-9 text-center border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-0"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>

                    {/* حذف */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* الملخص */}
        <div className="md:col-span-1">
          <Card className="sticky top-6 border shadow-md">
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between text-lg">
                <span>عدد المنتجات</span>
                <span className="font-medium">{totalItems()}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold border-t pt-4">
                <span>المجموع</span>
                <span>{totalPrice()} ج.م</span>
              </div>

              <Button className="w-full py-6 text-lg" disabled={totalItems() === 0}>
                الدفع الآن
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
              >
                تفريغ السلة
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}