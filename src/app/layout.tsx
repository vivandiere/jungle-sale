import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: 'Jungle Sale - Premium Plant Studio',
  description: 'Your premium plant studio for wholesale, events, and retail plants. Based in Tottenham, London.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white font-jungle-body">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
