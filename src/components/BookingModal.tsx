'use client'

import React, { useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { items, total, clearCart } = useCart()

  // Create cart summary for Calendly
  const cartSummary = items.map(item => 
    `${item.name} (${item.size}) x${item.quantity} - £${(item.price * item.quantity).toFixed(0)}`
  ).join('\n')

  const orderTotal = `£${total.toFixed(0)}`

  // Build Calendly URL with prefilled data
  const encodedCartSummary = encodeURIComponent(cartSummary)
  const encodedOrderTotal = encodeURIComponent(orderTotal)
  
  const calendlyUrl = `https://calendly.com/georgiet-info/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=c85614&primary_color=000000&embed_domain=${typeof window !== 'undefined' ? window.location.hostname : ''}&embed_type=Inline&a1=${encodedCartSummary}&a2=${encodedOrderTotal}`

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // Load Calendly widget script
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.head.appendChild(script)

      // Listen for Calendly events
      const handleCalendlyEvent = (e: MessageEvent) => {
        if (e.data.event && e.data.event === 'calendly.event_scheduled') {
          // Appointment booked successfully
          console.log('Calendly appointment scheduled:', e.data)
          
          // Clear the cart
          clearCart()
          
          // Close the modal after a short delay
          setTimeout(() => {
            onClose()
          }, 2000)
        }
      }

      window.addEventListener('message', handleCalendlyEvent)

      return () => {
        // Cleanup
        window.removeEventListener('message', handleCalendlyEvent)
        const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')
        if (existingScript) {
          document.head.removeChild(existingScript)
        }
      }
    }
  }, [isOpen, clearCart, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[90vh] overflow-hidden relative">
          {/* Header */}
          <div className="bg-jungle-orange p-4 border-b-2 border-black flex justify-between items-center">
            <div>
              <h2 className="text-xl font-jungle-heavy text-black uppercase">Book Your Pickup Slot</h2>
              <p className="text-sm font-jungle-body text-black">Total: {orderTotal}</p>
            </div>
            <button
              onClick={onClose}
              className="text-black hover:text-black text-2xl font-jungle-bold"
            >
              ×
            </button>
          </div>

          {/* Cart Summary */}
          <div className="bg-jungle-yellow p-4 border-b-2 border-black">
            <h3 className="font-jungle-bold text-black mb-2 uppercase">Your Plants:</h3>
            <div className="text-sm font-jungle-body text-black space-y-1">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name} ({item.size}) x{item.quantity}</span>
                  <span>£{(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendly Embed */}
          <div className="flex-1 h-full min-h-[500px]">
            <div 
              className="calendly-inline-widget h-full"
              data-url={calendlyUrl}
              style={{ minWidth: '320px', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
