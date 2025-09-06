'use client'

import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, count, removeItem, updateQuantity, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">On Hold ({count})</h2>
          <button 
            onClick={onClose}
            className="text-black hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">Your cart is empty</div>
                <p className="text-gray-500">Add some plants to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                    {/* Plant Image */}
                    <div className="w-16 h-16 relative flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    
                    {/* Plant Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-black text-sm italic mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{item.size} • {item.height}</p>
                      <p className="font-bold text-black">{formatPrice(item.price)}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-white">
              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-black">Total:</span>
                <span className="text-2xl font-bold text-black">{formatPrice(total)}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-black text-white py-3 px-4 rounded font-bold hover:bg-gray-800 transition-colors">
                  Request Quote
                </button>
                <button 
                  onClick={clearCart}
                  className="w-full border border-gray-300 text-gray-600 py-2 px-4 rounded font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              {/* Note */}
              <p className="text-xs text-gray-500 mt-4 text-center">
                Plants are held for 24 hours. Contact for pickup arrangements.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
