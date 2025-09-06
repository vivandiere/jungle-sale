import Link from 'next/link'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <Header overlay={true} />
      
      {/* Top Section - Wholesale & Events (Yellow) */}
      <Link href="/wholesale" className="w-full md:w-1/2 h-[50vh] md:h-screen bg-jungle-yellow flex flex-col justify-center items-center p-6 md:p-12 cursor-pointer">
        {/* Wholesale Hero Image - Horizontally Centered */}
        <div className="w-full max-w-xl mb-4 md:mb-8 relative aspect-[4/5] overflow-hidden mx-auto">
          <Image
            src="/images/wholesale-hero.jpg"
            alt="Orange speaker equipment setup"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-jungle-black italic text-black">WHOLESALE & EVENTS</h2>
        </div>
      </Link>

      {/* Bottom Section - Studio Shop (Orange) */}
      <Link href="/shop" className="w-full md:w-1/2 h-[50vh] md:h-screen bg-jungle-orange flex flex-col justify-center items-center p-6 md:p-12 cursor-pointer">
        {/* Studio Shop Hero Image - Horizontally Centered */}
        <div className="w-full max-w-xl mb-4 md:mb-8 relative aspect-[4/5] overflow-hidden mx-auto">
          <Image
            src="/images/studio-hero.jpg"
            alt="Plant shelving and studio setup"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-jungle-black italic text-black">STUDIO SHOP</h2>
        </div>
      </Link>
    </div>
  )
}
