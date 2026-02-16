"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cartStore"
import { toast } from "sonner"

type Props = {
    product: {
        id: number
        name: string
        price: number
        image: string
    }
}

export default function AddToCartButton({ product }: Props) {
    const addItem = useCartStore((s) => s.addItem)

    return (
        <Button
            size="lg"
            className="flex-1 py-6 text-lg gap-2"
            onClick={() => {
                addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
                toast.success("تم إضافة المنتج للسلة!", {
                    description: `${product.name} - الكمية: 1`,
                })
            }}
        >
            <ShoppingCart className="h-5 w-5" />
            أضف للسلة
        </Button>
    )
}
