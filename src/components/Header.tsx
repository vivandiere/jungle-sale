'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'
import CartDrawer from './CartDrawer'

interface HeaderProps {
  overlay?: boolean
  showCart?: boolean
  showClose?: boolean
  onClose?: () => void
}

export default function Header({ overlay = false, showCart = false, showClose = false, onClose }: HeaderProps) {
  const { count } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  if (overlay) {
    // Overlay header for landing page - sits directly on colored sections, stretched to viewport
    return (
      <>
        <div className="sticky md:absolute top-0 left-0 right-0 z-50 h-12 md:h-24 flex justify-center items-center overflow-hidden">
          {/* Background that matches the section layout */}
          <div className="absolute inset-0 flex md:flex-row">
            <div className="w-full md:w-1/2 bg-jungle-yellow"></div>
            <div className="hidden md:block md:w-1/2 bg-jungle-orange"></div>
          </div>
          <Link href="/" className="w-full relative z-10 px-16 md:px-0">
            <h1 className="jungle-title-stretched text-black text-center cursor-pointer">
              JUNGLE SALE
            </h1>
          </Link>
        </div>
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </>
    )
  }

  // Fixed header for other pages - also stretched
  return (
    <div className="sticky md:absolute top-0 left-0 right-0 z-50 h-12 md:h-24 flex justify-center items-center overflow-hidden">
      {/* Close Buttons - X and Close text grouped on left */}
      {showClose && onClose && (
        <div className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1 md:gap-2 z-30">
          <button 
            type="button"
            onClick={onClose}
            className="text-black font-jungle-bold text-xl md:text-2xl hover:text-jungle-yellow transition-colors px-2 py-1 cursor-pointer"
          >
            ×
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="text-black font-jungle-bold text-sm md:text-lg hover:text-jungle-yellow transition-colors px-2 py-1 cursor-pointer uppercase"
          >
            Close
          </button>
        </div>
      )}
      
      <Link href="/" className="w-full px-16 md:px-0">
        <h1 className="jungle-title-stretched text-black text-center cursor-pointer">
          JUNGLE SALE
        </h1>
      </Link>
      
      {/* Cart Counter */}
      {showCart && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-black font-jungle-bold text-sm md:text-lg hover:text-jungle-yellow hover:border-jungle-yellow transition-all duration-300 cursor-pointer z-20 uppercase border-2 border-black px-4 py-2"
        >
          ({count}) On hold
        </button>
      )}
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
