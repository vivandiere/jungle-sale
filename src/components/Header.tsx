'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

interface HeaderProps {
  overlay?: boolean
  showCart?: boolean
  showClose?: boolean
  onClose?: () => void
}

export default function Header({ overlay = false, showCart = false, showClose = false, onClose }: HeaderProps) {
  const { count } = useCart()
  if (overlay) {
    // Overlay header for landing page - sits directly on colored sections, stretched to viewport
    return (
      <div className="absolute top-0 left-0 right-0 z-50 py-4 flex justify-center items-center overflow-hidden">
        <Link href="/" className="w-full">
          <h1 className="jungle-title-stretched text-black text-center cursor-pointer">
            JUNGLE SALE
          </h1>
        </Link>
      </div>
    )
  }

  // Fixed header for other pages - also stretched
  return (
    <div className="absolute top-0 left-0 right-0 z-50 py-4 flex justify-center items-center overflow-hidden">
      <Link href="/" className="w-full">
        <h1 className="jungle-title-stretched text-black text-center cursor-pointer">
          JUNGLE SALE
        </h1>
      </Link>
      
      {/* Cart Counter */}
      {showCart && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black font-bold text-lg">
          ({count}) On hold
        </div>
      )}
      
      {/* Close Buttons - X and Close text grouped on left */}
      {showClose && onClose && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <button 
            onClick={onClose}
            className="text-black font-bold text-2xl hover:text-gray-700 transition-colors"
          >
            ×
          </button>
          <button 
            onClick={onClose}
            className="text-black font-bold text-lg hover:text-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}
