'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { getPlantSizes, getPlantImage, fetchPlants, type Plant } from '@/lib/plants'
import Toast from '@/components/Toast'


interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [plant, setPlant] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { addItem } = useCart()

  useEffect(() => {
    async function loadPlant() {
      try {
        setLoading(true)
        console.log('🔍 Loading plant with slug:', params.slug)
        const plants = await fetchPlants()
        console.log('📋 Fetched plants:', plants.length, 'plants')
        console.log('🌱 Available slugs:', plants.map(p => p.slug))
        
        console.log('🔍 Detailed slug comparison:')
        plants.forEach((plant, index) => {
          console.log(`Plant ${index} object:`, plant)
          console.log(`Plant ${index} slug property:`, plant.slug)
          console.log(`Plant ${index}: "${plant.slug}" === "${params.slug}" ? ${plant.slug === params.slug}`)
          console.log(`Plant ${index} slug length: ${plant.slug ? plant.slug.length : 'undefined'}, param slug length: ${params.slug.length}`)
        })
        
        const foundPlant = plants.find(p => p.slug === params.slug)
        console.log('🎯 Found plant:', foundPlant ? foundPlant.commonName : 'NOT FOUND')
        
        if (foundPlant) {
          setPlant(foundPlant)
        } else {
          console.error('❌ Plant not found. Looking for slug:', params.slug)
          console.error('❌ Available slugs:', plants.map(p => p.slug))
          setError('Plant not found')
        }
      } catch (err) {
        setError('Failed to load plant')
        console.error('💥 Error loading plant:', err)
      } finally {
        setLoading(false)
      }
    }
    
    loadPlant()
  }, [params.slug])

  const handleClose = () => {
    router.push('/shop')
  }

  const handleAddToCart = (sizeOption: ReturnType<typeof getPlantSizes>[0]) => {
    if (!plant) return
    
    const cartItem = {
      id: `${plant.slug}-${sizeOption.size.toLowerCase()}`,
      slug: plant.slug,
      name: plant.latinName,
      size: sizeOption.size,
      height: sizeOption.height,
      price: sizeOption.price,
      priceDisplay: `£${sizeOption.price}`,
      image: getPlantImage(plant)
    }
    
    addItem(cartItem)
    setSelectedSize(sizeOption.size)
    
    // Show toast notification
    setToastMessage(`Added ${plant.commonName} (${sizeOption.size}) to Hold basket!`)
    setShowToast(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-jungle-orange relative">
        <Header showClose={true} onClose={handleClose} showCart={true} />
        <div className="px-8 pb-8 pt-32 text-center">
          <div className="text-black text-xl">Loading plant...</div>
        </div>
      </div>
    )
  }

  if (error || !plant) {
    return (
      <div className="min-h-screen bg-jungle-orange relative">
        <Header showClose={true} onClose={handleClose} showCart={true} />
        <div className="px-8 pb-8 pt-32 text-center">
          <div className="text-black text-xl">Error: {error || 'Plant not found'}</div>
        </div>
      </div>
    )
  }

  const availableSizes = getPlantSizes(plant)

  return (
    <div className="min-h-screen bg-jungle-orange relative">
      <Header showClose={true} onClose={handleClose} showCart={true} />
      <Toast 
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      
      {/* Product Content */}
      <div className="px-8 pb-8 pt-4 md:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">
          {/* Product Image */}
          <div className="h-[60vh] md:h-[70vh] lg:h-[80vh] relative overflow-hidden">
            <Image
              src={getPlantImage(plant)}
              alt={plant.latinName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Details */}
          <div className="text-black">
            <div className="mb-4">
              <div className="text-lg font-jungle-body text-black/80 mb-2">{plant.commonName}</div>
              <h1 className="text-4xl font-jungle-black italic mb-4">{plant.latinName}</h1>
              <p className="text-lg font-jungle-body leading-relaxed mb-8">{plant.description}</p>
            </div>

            {/* Size Options */}
            <div className="space-y-4">
              {availableSizes.length === 0 ? (
                <div className="text-center text-black text-xl">Out of stock</div>
              ) : (
                availableSizes.map((sizeOption, index) => (
                <div 
                  key={index}
                  className="border-2 border-black text-black flex flex-col md:flex-row md:items-center md:justify-between p-3 md:p-4 cursor-pointer gap-3 md:gap-4"
                  onClick={() => setSelectedSize(sizeOption.size)}
                >
                  <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <span className="font-jungle-heavy text-sm md:text-base">{sizeOption.size}</span>
                    <span className="font-jungle-body text-sm md:text-base">{sizeOption.height}</span>
                    <span className="font-jungle-heavy text-sm md:text-base">£{sizeOption.price}</span>
                    <span className="text-xs md:text-sm font-jungle-body text-black/60">({sizeOption.stock} available)</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(sizeOption)
                    }}
                    className="bg-black text-jungle-orange px-4 py-2 md:px-6 md:py-2 font-jungle-bold hover:bg-jungle-yellow hover:text-black transition-colors uppercase text-sm md:text-base self-start md:self-auto"
                    disabled={sizeOption.stock === 0}
                  >
                    {sizeOption.stock === 0 ? 'Out of Stock' : 'Add +'}
                  </button>
                </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
