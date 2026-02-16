import { useCartStore } from "@/lib/cartStore" // ده هيشتغل لأن الـonClick client-side
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AddToCartButton from "../../../components/AddToCartButton"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ArrowRight, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { toast } from "sonner" // toast من sonner يشتغل client-side

const products = [
  {
    id: 1,
    name: "هودي أسود كلاسيك",
    price: 1200,
    image: "/images/hoodie-black.jpg",
    description: "هودي دافئ عالي الجودة، خامة قطن 100%، تصميم كلاسيكي مريح للشتاء والخريف."
  },
  {
    id: 2,
    name: "تيشيرت أبيض مطبوع",
    price: 450,
    image: "/images/tshirt-white.jpg",
    description: "تيشيرت قطني ناعم، تصميم عصري مع طبعة فريدة، مثالي للصيف والارتداء اليومي."
  },
  {
    id: 3,
    name: "جينز أزرق رجالي",
    price: 1800,
    image: "/images/jeans-blue.jpg",
    description: "جينز أزرق بقصة كلاسيكية، خامة دنيم متينة، تصميم يناسب جميع المناسبات."
  },
]

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = products.find(p => p.id === Number(id))

  if (!product) {
    notFound()
  }

  // الـonClick هيشتغل client-side بفضل Zustand + toast
  const addItem = useCartStore.getState().addItem // استخدم getState بدل hook في server

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl" dir="rtl">
      <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowRight className="h-5 w-5" />
        العودة للمتجر
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl md:text-4xl font-bold text-primary mb-6">{product.price} ج.م</p>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <AddToCartButton product={product} />

            <Button variant="outline" size="lg" className="flex-1 py-6 text-lg">
              اشترِ الآن
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary">شحن مجاني للطلبات فوق 2000 ج.م</Badge>
            <Badge variant="secondary">إرجاع خلال 14 يوم</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}