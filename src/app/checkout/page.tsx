"use client"

import { useCartStore } from "@/lib/cartStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    setIsSubmitting(true)

    // محاكاة عملية الدفع (3 ثواني تأخير عشان يحس إنها حقيقية)
    setTimeout(() => {
      toast.success("تم إتمام الطلب بنجاح!", {
        description: `سيتم التواصل معك قريبًا على ${formData.phone}`,
        action: {
          label: "عرض الطلبات",
          onClick: () => window.location.href = "/cart", // أو صفحة طلبات مستقبلية
        },
      })

      clearCart() // تفريغ السلة
      setIsSubmitting(false)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center min-h-[70vh] flex flex-col items-center justify-center" dir="rtl">
        <h1 className="text-3xl font-bold mb-6">إتمام الطلب</h1>
        <p className="text-lg text-muted-foreground mb-8">السلة فارغة، لا يوجد طلب لإتمامه</p>
        <Link href="/">
          <Button size="lg">العودة للمتجر</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl" dir="rtl">
      <h1 className="text-4xl font-bold text-center mb-10">إتمام الطلب</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* ملخص الطلب */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold">{item.price * item.quantity} ج.م</p>
                </div>
              ))}

              <div className="flex justify-between text-xl font-bold pt-4 border-t">
                <span>المجموع الكلي</span>
                <span>{totalPrice()} ج.م</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* نموذج بيانات العميل */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>بيانات الشحن</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">العنوان الكامل *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "جاري معالجة الطلب..." : "إتمام الطلب"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}