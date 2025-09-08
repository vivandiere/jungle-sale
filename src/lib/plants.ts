// Plant data types
export interface Plant {
  commonName: string
  latinName: string
  slug: string
  description: string
  imageUrls: string[]
  imagePreview: string
  tags: string
  priceS: number
  priceM: number
  priceL: number
  stockS: number
  stockM: number
  stockL: number
  sizeSName?: string
  sizeMName?: string
  sizeLName?: string
  sizeSHeight?: string
  sizeMHeight?: string
  sizeLHeight?: string
  displayOrder: number
}

// Google Sheets CSV URL - convert the sharing URL to CSV export
const SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1d7CylnrWYubl7lLuA6n2SQ6UIF9mC3UeF8p2kuoLaLo/export?format=csv&gid=1869056405'

// Parse CSV row into Plant object
function parseCSVRow(row: string[]): Plant | null {
  if (row.length < 19 || !row[0] || !row[1] || !row[2]) {
    return null // Skip empty or incomplete rows
  }

  return {
    commonName: row[0]?.trim() || '',
    latinName: row[1]?.trim() || '',
    slug: row[2]?.trim() || '',
    description: row[3]?.trim() || '',
    imageUrls: row[4] && row[4].trim() && row[4] !== '' ? row[4].split(',').map(url => url.trim()).filter(url => url.startsWith('http')) : [],
    imagePreview: row[5]?.trim() || '',
    tags: row[6]?.trim() || '',
    priceS: parseFloat(row[7]) || 0,
    priceM: parseFloat(row[8]) || 0,
    priceL: parseFloat(row[9]) || 0,
    stockS: parseInt(row[10]) || 0,
    stockM: parseInt(row[11]) || 0,
    stockL: parseInt(row[12]) || 0,
    sizeSName: row[13]?.trim() || '',
    sizeMName: row[14]?.trim() || '',
    sizeLName: row[15]?.trim() || '',
    sizeSHeight: row[16]?.trim() || '',
    sizeMHeight: row[17]?.trim() || '',
    sizeLHeight: row[18]?.trim() || '',
    displayOrder: parseInt(row[19]) || 0
  }
}

// Simple CSV parser that handles quoted fields
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"'
        i++ // Skip next quote
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current)
  return result
}

// Fetch plants from local JSON file
export async function fetchPlants(): Promise<Plant[]> {
  try {
    console.log('🗂️ Loading plants from local JSON file...')
    
    // Import the JSON data directly
    const plantsData = await import('../data/plants.json')
    const plants: Plant[] = plantsData.default || plantsData
    
    console.log('✅ Loaded', plants.length, 'plants from JSON')
    console.log('🔗 Plant slugs:', plants.map(p => p.slug))
    
    // Sort by display order
    const sortedPlants = plants.sort((a, b) => a.displayOrder - b.displayOrder)
    
    console.log('📋 Plants ready for use:', sortedPlants)
    return sortedPlants
  } catch (error) {
    console.error('❌ Error loading local plants JSON:', error)
    // Ultimate fallback to hardcoded mock data
    console.log('🔄 Using fallback mock plants...')
    return getMockPlants()
  }
}

// Fallback mock data based on your actual Google Sheets
function getMockPlants(): Plant[] {
  const plants = [
    {
      commonName: "Swiss Cheese Plant",
      latinName: "Monstera deliciosa",
      slug: "monstera-deliciosa",
      description: "Large, glossy leaves with distinctive splits and holes. Perfect statement plant for any room.",
      imageUrls: ["/images/plants/monstera-deliciosa/large.jpg"],
      imagePreview: "🌿 Monstera",
      tags: "statement", 
      priceS: 25,
      priceM: 35,
      priceL: 0, // No large size in your sheet
      stockS: 5,
      stockM: 5,
      stockL: 0,
      sizeSName: "Small",
      sizeMName: "Medium",
      sizeLName: "Large",
      sizeSHeight: "0.5-1m",
      sizeMHeight: "~1m",
      sizeLHeight: "~2m",
      displayOrder: 1
    },
    {
      commonName: "Fiddle Leaf Fig", 
      latinName: "Ficus lyrata",
      slug: "fiddle-leaf-fig",
      description: "Elegant tree with large, violin-shaped leaves. Adds height and drama to any space.",
      imageUrls: ["/images/plants/fiddle-leaf-fig/large.jpg"],
      imagePreview: "🌱 Fiddle Leaf",
      tags: "statement",
      priceS: 45,
      priceM: 65,
      priceL: 0, // No large size in your sheet
      stockS: 5,
      stockM: 5, 
      stockL: 0,
      sizeSName: "Small",
      sizeMName: "Medium", 
      sizeLName: "Large",
      sizeSHeight: "0.5-1m",
      sizeMHeight: "~1.5m",
      sizeLHeight: "~2.5m",
      displayOrder: 2
    }
  ]
  
  console.log('🏭 Mock plants created:', plants.length)
  plants.forEach((plant, index) => {
    console.log(`🌱 Mock plant ${index}:`, plant)
    console.log(`🔗 Mock plant ${index} slug: "${plant.slug}" (${plant.commonName})`)
  })
  
  console.log('🚀 Returning mock plants array:', plants)
  return plants
}

// Get single plant by slug
export async function getPlantBySlug(slug: string): Promise<Plant | null> {
  const plants = await fetchPlants()
  return plants.find(plant => plant.slug === slug) || null
}

// Helper function to get plant sizes with pricing
export function getPlantSizes(plant: Plant) {
  const sizes = []
  
  if (plant.stockS > 0) {
    sizes.push({
      size: plant.sizeSName || 'Small',
      height: plant.sizeSHeight || '0.5-1m',
      price: plant.priceS,
      stock: plant.stockS
    })
  }
  
  if (plant.stockM > 0) {
    sizes.push({
      size: plant.sizeMName || 'Medium', 
      height: plant.sizeMHeight || '~1m',
      price: plant.priceM,
      stock: plant.stockM
    })
  }
  
  if (plant.stockL > 0) {
    sizes.push({
      size: plant.sizeLName || 'Large',
      height: plant.sizeLHeight || '~2m', 
      price: plant.priceL,
      stock: plant.stockL
    })
  }
  
  return sizes
}

// Get plant image URL (fallback to local images)
export function getPlantImage(plant: Plant): string {
  // If we have image URLs from sheets, use first one
  if (plant.imageUrls && plant.imageUrls.length > 0 && plant.imageUrls[0] !== '') {
    return plant.imageUrls[0]
  }
  
  // Fallback to local images
  return `/images/plants/${plant.slug}/large.jpg`
}

// Helper function to generate URLs for your current local images
export function generateLocalImageUrls(baseUrl: string = '') {
  const plants = [
    'monstera-deliciosa',
    'fiddle-leaf-fig',
    'swiss-cheese-plant'
  ]
  
  plants.forEach(slug => {
    console.log(`${slug}:`)
    console.log(`  Small: ${baseUrl}/images/plants/${slug}/small.jpg`)
    console.log(`  Medium: ${baseUrl}/images/plants/${slug}/medium.jpg`) 
    console.log(`  Large: ${baseUrl}/images/plants/${slug}/large.jpg`)
    console.log('---')
  })
}
