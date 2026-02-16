import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  // رقم طلب وهمي (في الواقع هيجي من الـbackend)
  const orderNumber = Math.floor(Math.random() * 1000000) + 100000

  return (
    <div className="container mx-auto py-16 px-4 text-center min-h-[70vh] flex flex-col items-center justify-center" dir="rtl">
      <CheckCircle2 className="h-24 w-24 text-green-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">تم إتمام الطلب بنجاح!</h1>
      <p className="text-xl text-muted-foreground mb-8">
        شكرًا لثقتك فينا
      </p>
      <p className="text-lg mb-10">
        رقم الطلب: <span className="font-bold text-primary">#{orderNumber}</span>
      </p>
      <p className="text-muted-foreground mb-12">
        سيتم التواصل معك قريبًا لتأكيد التفاصيل والشحن
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button size="lg" className="min-w-[200px]">
            العودة للمتجر
          </Button>
        </Link>
        <Link href="/cart">
          <Button variant="outline" size="lg" className="min-w-[200px]">
            عرض السلة
          </Button>
        </Link>
      </div>
    </div>
  )
}