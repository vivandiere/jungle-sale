'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Image from 'next/image'
import { getPlantImage, type Plant } from '@/lib/plants'
import { useState } from 'react'

// Simple mock data directly in component to test
const mockPlantsSimple = [
  {
    commonName: "Swiss Cheese Plant",
    latinName: "Monstera deliciosa",
    slug: "monstera-deliciosa",
    description: "Large, glossy leaves with distinctive splits and holes. Perfect statement plant for any room.",
    imageUrls: ["/images/plants/monstera-deliciosa/large.jpg"],
    imagePreview: "🌿 Monstera",
    tags: "large",
    priceS: 15,
    priceM: 25,
    priceL: 35,
    stockS: 5,
    stockM: 5,
    stockL: 5,
    displayOrder: 1
  },
  {
    commonName: "Fiddle Leaf Fig",
    latinName: "Ficus lyrata",
    slug: "fiddle-leaf-fig",
    description: "Elegant tree with large, violin-shaped leaves. Adds height and drama to any space.",
    imageUrls: ["/images/plants/fiddle-leaf-fig/medium.jpg"],
    imagePreview: "🎻 Fiddle Leaf",
    tags: "large",
    priceS: 10,
    priceM: 20,
    priceL: 20,
    stockS: 2,
    stockM: 2,
    stockL: 2,
    displayOrder: 2
  }
]

export default function Shop() {
  const [plants] = useState<Plant[]>(mockPlantsSimple)
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  const formatPriceRange = (plant: Plant) => {
    const prices = []
    if (plant.stockS > 0) prices.push(plant.priceS)
    if (plant.stockM > 0) prices.push(plant.priceM)
    if (plant.stockL > 0) prices.push(plant.priceL)
    
    if (prices.length === 0) return 'Out of stock'
    if (prices.length === 1) return `£${prices[0]}`
    
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    return min === max ? `£${min}` : `£${min}—£${max}`
  }

  return (
    <div className="min-h-screen bg-jungle-orange relative">
      <Header showCart={true} />
      
      {/* Plant Grid */}
      <div className="px-8 pb-8 pt-4 md:pt-28">
        {loading && (
          <div className="text-center text-black text-xl">Loading plants...</div>
        )}
        
        {error && (
          <div className="text-center text-black text-xl">Error: {error}</div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {plants.map((plant) => (
            <Link 
              key={plant.slug}
              href={`/shop/${plant.slug}`}
              className="group"
            >
              <div className="overflow-hidden">
                {/* Plant Image */}
                <div className="aspect-[2/3] relative overflow-hidden">
                  <Image
                    src={getPlantImage(plant)}
                    alt={plant.latinName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                
                {/* Plant Info */}
                <div className="p-3 md:p-4">
                  <div className="text-xs md:text-sm font-jungle-body text-black/80 mb-1">{plant.commonName}</div>
                  <h3 className="text-sm md:text-xl font-jungle-heavy text-black mb-2 italic">
                    {plant.latinName}
                  </h3>
                  <div className="text-sm md:text-lg font-jungle-bold text-black">
                    {formatPriceRange(plant)}
                  </div>
                </div>
              </div>
            </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
