"use client"

import { useCartStore } from "@/lib/cartStore"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function CartIcon() {
  const totalItems = useCartStore(state => state.totalItems())

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {totalItems}
        </Badge>
      )}
    </Link>
  )
}