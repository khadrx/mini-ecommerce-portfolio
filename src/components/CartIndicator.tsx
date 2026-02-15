"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cartStore"

export default function CartIndicator() {
  const total = useCartStore(state => state.totalItems())

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="h-6 w-6" />
      {total > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {total}
        </Badge>
      )}
    </Link>
  )
}
