import Link from 'next/link'
import Header from '@/components/Header'

export default function Wholesale() {
  return (
    <div className="min-h-screen bg-jungle-yellow relative">
      <Header />
      
      <div className="px-8 max-w-4xl mx-auto text-center flex flex-col justify-center min-h-screen pt-4 md:pt-24">
        <div className="mb-12">
          <h2 className="text-4xl font-jungle-black italic text-black mb-8">WHOLESALE & EVENTS</h2>
          <div className="text-xl text-black leading-relaxed mb-8">
            Plants for sale from the Archives in Tottenham<br/>
            🪴 N15 / by appointment 💚 plant hire available<br/>
            🪴 plant styling/ consultations/ installations
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
          <button className="bg-black text-jungle-yellow px-3 py-3 text-xs md:text-sm font-jungle-bold hover:bg-jungle-orange hover:text-black transition-colors border-4 border-black uppercase w-full md:w-64 text-center whitespace-nowrap">
            Get wholesale pricelist
          </button>
          
          <button className="bg-jungle-yellow text-black px-3 py-3 text-xs md:text-sm font-jungle-bold hover:bg-jungle-orange hover:text-black transition-colors border-4 border-black uppercase w-full md:w-64 text-center whitespace-nowrap">
            Email us for enquiries
          </button>
        </div>
      </div>
    </div>
  )
}