'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { getPlantSizes, getPlantImage, type Plant } from '@/lib/plants'
import Toast from '@/components/Toast'

// Direct mock plants data
const mockPlantsData: Plant[] = [
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

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const router = useRouter()
  const { addItem } = useCart()

  // Direct plant lookup - no async needed
  const plant = mockPlantsData.find(p => p.slug === params.slug)
  const loading = false
  const error = plant ? null : 'Plant not found'

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
