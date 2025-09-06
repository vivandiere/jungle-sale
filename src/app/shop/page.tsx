'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Image from 'next/image'
import { fetchPlants, getPlantImage, type Plant } from '@/lib/plants'
import { useEffect, useState } from 'react'

export default function Shop() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPlants() {
      try {
        setLoading(true)
        const plantData = await fetchPlants()
        setPlants(plantData)
        setError(null)
      } catch (err) {
        setError('Failed to load plants')
        console.error('Error loading plants:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPlants()
  }, [])

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
      <div className="px-8 pb-8 pt-32">
        {loading && (
          <div className="text-center text-black text-xl">Loading plants...</div>
        )}
        
        {error && (
          <div className="text-center text-black text-xl">Error: {error}</div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="p-4">
                  <div className="text-sm text-black/80 mb-1">{plant.commonName}</div>
                  <h3 className="text-xl font-bold text-black mb-2 italic">
                    {plant.latinName}
                  </h3>
                  <div className="text-lg font-bold text-black">
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
