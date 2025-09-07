'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import Header from '@/components/Header'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if cart is empty or below minimum
  useEffect(() => {
    if (mounted && (items.length === 0 || total < 30)) {
      router.push('/shop')
    }
  }, [items.length, total, mounted, router])

  // Create cart summary for Calendly
  const cartSummary = items.map(item => 
    `${item.name} (${item.size}) x${item.quantity} - £${(item.price * item.quantity).toFixed(0)}`
  ).join('\n')

  const orderTotal = `£${total.toFixed(0)}`

  // Build Calendly URL with prefilled data
  const encodedCartSummary = encodeURIComponent(cartSummary)
  const encodedOrderTotal = encodeURIComponent(orderTotal)
  
  const calendlyUrl = `https://calendly.com/georgiet-info/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=000000&a1=${encodedCartSummary}&a2=${encodedOrderTotal}`

  useEffect(() => {
    if (mounted) {
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
          
          // Redirect to confirmation page
          router.push('/confirmation')
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
  }, [mounted, clearCart, router])

  const handleClose = () => {
    router.push('/shop')
  }

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  if (items.length === 0 || total < 30) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-jungle-yellow relative">
      <Header showClose={true} onClose={handleClose} />
      
      <div className="px-8 pb-8 pt-4 md:pt-28">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-jungle-black italic text-black mb-4">
              Book Your Pickup Slot
            </h1>
            <p className="text-lg font-jungle-body text-black">
              Complete your order by booking a pickup appointment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-jungle-orange p-6 border-2 border-black sticky top-32">
                <h3 className="font-jungle-heavy text-black mb-4 uppercase text-lg">
                  Your Order
                </h3>
                
                <div className="space-y-3 mb-6">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-jungle-bold text-black text-sm italic">{item.name}</p>
                        <p className="font-jungle-body text-black text-xs">
                          {item.size} • {item.height} • Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-jungle-bold text-black text-sm">
                        £{(item.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t-2 border-black pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-jungle-heavy text-black uppercase">Total:</span>
                    <span className="text-xl font-jungle-black text-black">{orderTotal}</span>
                  </div>
                </div>

                <div className="mt-6 text-xs font-jungle-body text-black text-center">
                  Plants held for 7 days • Pickup required to confirm
                </div>
              </div>
            </div>

            {/* Calendly Embed */}
            <div className="lg:col-span-2">
              <div className="bg-white border-2 border-black">
                <div 
                  className="calendly-inline-widget"
                  data-url={calendlyUrl}
                  style={{ minWidth: '320px', height: '700px' }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
