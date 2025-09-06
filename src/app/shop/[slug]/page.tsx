'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { getPlantBySlug, getPlantSizes, getPlantImage, type Plant } from '@/lib/plants'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [plant, setPlant] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { addItem } = useCart()

  useEffect(() => {
    async function loadPlant() {
      try {
        setLoading(true)
        const plantData = await getPlantBySlug(params.slug)
        if (!plantData) {
          setError('Plant not found')
        } else {
          setPlant(plantData)
          setError(null)
        }
      } catch (err) {
        setError('Failed to load plant')
        console.error('Error loading plant:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPlant()
  }, [params.slug])

  const handleClose = () => {
    router.back()
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
      
      {/* Product Content */}
      <div className="px-8 pb-8 pt-32">
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
              <div className="text-lg text-black/80 mb-2">{plant.commonName}</div>
              <h1 className="text-4xl font-bold italic mb-4">{plant.latinName}</h1>
              <p className="text-lg leading-relaxed mb-8">{plant.description}</p>
            </div>

            {/* Size Options */}
            <div className="space-y-4">
              {availableSizes.length === 0 ? (
                <div className="text-center text-black text-xl">Out of stock</div>
              ) : (
                availableSizes.map((sizeOption, index) => (
                <div 
                  key={index}
                  className="border-2 border-black text-black flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => setSelectedSize(sizeOption.size)}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-bold">{sizeOption.size}</span>
                    <span>{sizeOption.height}</span>
                    <span className="font-bold">£{sizeOption.price}</span>
                    <span className="text-sm text-black/60">({sizeOption.stock} available)</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(sizeOption)
                    }}
                    className="bg-black text-jungle-orange px-6 py-2 font-bold hover:bg-gray-800 transition-colors"
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
