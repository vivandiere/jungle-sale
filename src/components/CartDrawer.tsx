'use client'

import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, count, removeItem, updateQuantity, clearCart } = useCart()
  const router = useRouter()
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
              <div className={`fixed top-0 right-0 h-screen w-96 bg-jungle-orange shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
              }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-black">
                  <h2 className="text-2xl font-jungle-black text-black uppercase">On Hold ({count})</h2>
          <button 
            onClick={onClose}
            className="text-black hover:text-black text-2xl font-jungle-bold"
          >
            ×
          </button>
        </div>

                {/* Cart Content */}
                <div className="flex flex-col h-full max-h-screen">
          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 pb-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-black text-lg mb-4">Your cart is empty</div>
                <p className="text-black">Add some plants to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 border-2 border-black">
                    {/* Plant Image */}
                    <div className="w-16 h-20 relative flex-shrink-0 overflow-hidden aspect-[4/5]">
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
                              <h3 className="font-jungle-heavy text-black text-sm italic mb-1">{item.name}</h3>
                      <p className="text-sm text-black mb-1">{item.size} • {item.height}</p>
                      <p className="font-jungle-bold text-black">{formatPrice(item.price)}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-jungle-orange"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-black">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-jungle-orange"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-black hover:text-black p-1"
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
            <div className="border-t-2 border-black p-6 pb-8 bg-jungle-orange">
              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-jungle-heavy text-black uppercase">Total:</span>
                <span className="text-2xl font-jungle-black text-black">{formatPrice(total)}</span>
              </div>
              
              {/* Minimum Order Notice */}
              {total < 30 && (
                <div className="mb-3">
                  <p className="text-sm font-jungle-body text-black text-center leading-relaxed">
                    Minimum order £30 • Add £{(30 - total).toFixed(0)} more
                  </p>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="space-y-3">
                        <button 
                          onClick={() => {
                            if (total >= 30) {
                              router.push('/checkout')
                            }
                          }}
                          className={`w-full py-3 px-4 font-jungle-bold transition-colors uppercase ${
                            total >= 30 
                              ? 'bg-black text-jungle-orange hover:bg-jungle-yellow hover:text-black' 
                              : 'bg-black/50 text-jungle-orange/50 cursor-not-allowed'
                          }`}
                          disabled={total < 30}
                        >
                          Book pickup slot
                        </button>
                <button 
                  onClick={clearCart}
                  className="w-full border-2 border-black text-black py-2 px-4 font-jungle-bold hover:bg-black hover:text-jungle-orange transition-colors uppercase"
                >
                  Clear All
                </button>
              </div>
              
              {/* Note */}
              <p className="text-xs text-black mt-4 text-center">
                £30 minimum order • Plants held for 7 days • Book pickup to confirm
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
