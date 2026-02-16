import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import CartIcon from "@/components/CartIcon"
import { useCartStore } from "@/lib/cartStore"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Logo from "@/components/Logo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OK.SHOP – متجر إلكتروني مصغر",
  description: "متجر إلكتروني بسيط واحترافي – بورتفوليو عبد الرحمن خضر",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white shadow-sm py-4 mb-8">
          <div className="container mx-auto px-4 flex items-center justify-between">
            {/* اللوجو */}
            <Link href="/" className="text-2xl font-bold">
            <Logo className="w-20 h-auto fill-[#231E1E] text-[#231E1E] dark:text-[#B0B0B0]" />
            </Link>

            {/* السلة */}
            <div className="flex items-center gap-6">
              <CartIcon />
            </div>
          </div>
        </header>
        {children}
        
        {/* Footer */}
        <footer className="border-t bg-muted/40 py-6 mt-auto">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            
            <p>
              © {new Date().getFullYear()} OK.Shop | عبد الرحمن خضر (خضر) – Full-Stack Developer
            </p>
            <p className="mt-1">
              مشروع بورتفوليو: متجر إلكتروني مصغر
              {" • "}
              <Link
                href="https://github.com/khadrx/mini-ecommerce-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View on GitHub
              </Link>
            </p>
            <p className="mt-1 text-xs">
              Built with Next.js, Tailwind CSS, shadcn/ui & Zustand
            </p>
          </div>
        </footer>
        
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
