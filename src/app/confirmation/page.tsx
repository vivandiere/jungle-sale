'use client'

import Link from 'next/link'
import Header from '@/components/Header'

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-jungle-yellow relative">
      <Header />
      
      <div className="px-8 pb-8 pt-4 md:pt-28">
        <div className="max-w-2xl mx-auto text-center">
          
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-jungle-black italic text-black mb-6">
              Booking Confirmed!
            </h1>
            
            <div className="bg-jungle-orange p-8 border-2 border-black mb-8">
              <p className="text-xl font-jungle-bold text-black mb-4">
                🌱 Your pickup appointment is confirmed
              </p>
              <p className="font-jungle-body text-black leading-relaxed">
                Check your email for appointment details and calendar invite. 
                Your plants are now held for 7 days.
              </p>
            </div>

            <div className="space-y-4 text-black">
              <h3 className="font-jungle-heavy text-lg uppercase">What's Next?</h3>
              <div className="font-jungle-body text-left space-y-2 max-w-md mx-auto">
                <p>📧 <strong>Check your email</strong> for appointment confirmation</p>
                <p>📅 <strong>Add to calendar</strong> using the calendar invite</p>
                <p>🏪 <strong>Visit our studio</strong> at your appointed time</p>
                <p>💚 <strong>Collect your plants</strong> and pay on pickup</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Link 
                href="/shop"
                className="inline-block bg-black text-jungle-yellow px-8 py-4 font-jungle-bold hover:bg-jungle-orange hover:text-black transition-colors border-4 border-black uppercase"
              >
                Continue Shopping
              </Link>
              
              <p className="text-sm font-jungle-body text-black">
                Questions? Contact us via WhatsApp for immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
