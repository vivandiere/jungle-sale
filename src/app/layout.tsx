import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: 'Jungle Sale - Plants from the Archives',
  description: 'Plants for sale from the Archives in Tottenham. By appointment only.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
