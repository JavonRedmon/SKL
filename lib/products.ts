export const SKL_ASSETS = {
  back: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000164081f79479ce30e50600af-FVpUj6OQcV0ib7QJYMoS5IqWAnxAng.png',
  backAngle: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000000e6481f79e089ea25e06a4b4-GVmTTuzcSI105dusSu4HnxmOU9C0Ac.png',
  front: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000004bd881f792f5ddf681596146-yEXvhUe1ocplAFZT1uVSkw96JiGUel.png',
  frontAlt: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000048081f7855f1ea2b1e35c90-1pQ6QOpXP5PCjtxz42enP85NFBQwbx.png',
} as const

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'One Size'

export type Product = Readonly<{
  id: string
  slug: string
  name: string
  priceCents: number
  category: string
  color: string
  detail: string
  description: string
  image: string
  alternateImage: string
  galleryImage: string
  homeCardImage?: string
  sizes: readonly ProductSize[]
  homeFeatured?: boolean
  shopFeatured?: boolean
}>

export const PRODUCTS: readonly Product[] = [
  {
    id: 'hoodie',
    slug: 'seek-life-hoodie',
    name: 'Seek Life Hoodie',
    priceCents: 12000,
    category: 'Hoodies',
    color: 'Black',
    detail: 'Heavyweight fleece / Black',
    description: 'Heavyweight cotton fleece with an oversized fit and original SEEK LIFE artwork across the body.',
    image: SKL_ASSETS.front,
    alternateImage: SKL_ASSETS.back,
    galleryImage: SKL_ASSETS.backAngle,
    homeCardImage: '/images/skl/hoodie.png',
    sizes: ['S', 'M', 'L', 'XL'],
    homeFeatured: true,
    shopFeatured: true,
  },
  {
    id: 'long-sleeve',
    slug: 'seek-life-long-sleeve',
    name: 'Seek Life Long Sleeve',
    priceCents: 7800,
    category: 'Long Sleeves',
    color: 'Black',
    detail: '240gsm cotton / Black',
    description: 'A substantial cotton long sleeve designed as a simple everyday layer for constant movement.',
    image: '/images/skl/hero.png',
    alternateImage: '/images/skl/lifestyle.png',
    galleryImage: '/images/skl/hoodie.png',
    sizes: ['S', 'M', 'L', 'XL'],
    homeFeatured: true,
  },
  {
    id: 'tee',
    slug: 'motion-study-tee',
    name: 'Motion Study Tee',
    priceCents: 6400,
    category: 'Shirts',
    color: 'Charcoal',
    detail: 'Boxy fit / Charcoal',
    description: 'A boxy everyday tee in heavyweight cotton, cut for room through the body and easy movement.',
    image: '/images/skl/lifestyle.png',
    alternateImage: '/images/skl/hero.png',
    galleryImage: '/images/skl/hoodie.png',
    sizes: ['S', 'M', 'L', 'XL'],
    homeFeatured: true,
  },
  {
    id: 'cap',
    slug: 'seek-life-cap',
    name: 'Seek Life Cap',
    priceCents: 4200,
    category: 'Accessories',
    color: 'Black',
    detail: 'Unstructured / Black',
    description: 'An unstructured everyday cap finished in black with understated SKL detailing.',
    image: '/images/skl/hoodie.png',
    alternateImage: '/images/skl/lifestyle.png',
    galleryImage: '/images/skl/hero.png',
    sizes: ['One Size'],
    homeFeatured: true,
  },
  {
    id: 'hoodie-back',
    slug: 'seek-life-hoodie-back',
    name: 'Seek Life Hoodie / Back Print',
    priceCents: 12000,
    category: 'Hoodies',
    color: 'Black',
    detail: 'Black / Heavyweight fleece',
    description: 'Heavyweight cotton fleece with an oversized fit and original SEEK LIFE artwork across the back.',
    image: SKL_ASSETS.back,
    alternateImage: SKL_ASSETS.backAngle,
    galleryImage: SKL_ASSETS.front,
    sizes: ['S', 'M', 'L', 'XL'],
    shopFeatured: true,
  },
  {
    id: 'mark-hoodie',
    slug: 'skl-mark-hoodie',
    name: 'SKL Mark Hoodie',
    priceCents: 12000,
    category: 'Hoodies',
    color: 'Black',
    detail: 'Black / Heavyweight fleece',
    description: 'A heavyweight oversized hoodie finished with the restrained SKL mark at the chest.',
    image: SKL_ASSETS.frontAlt,
    alternateImage: SKL_ASSETS.front,
    galleryImage: SKL_ASSETS.backAngle,
    sizes: ['S', 'M', 'L', 'XL'],
    shopFeatured: true,
  },
]

export const HOME_PRODUCTS = PRODUCTS.filter((product) => product.homeFeatured)
export const SHOP_PRODUCTS = PRODUCTS.filter((product) => product.shopFeatured)

export function getProductById(id: string) {
  return PRODUCTS.find((product) => product.id === id)
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug)
}

export function getDefaultSize(product: Product): ProductSize {
  return product.sizes.includes('M') ? 'M' : product.sizes[0]
}

export function formatPrice(priceCents: number, compact = false) {
  const amount = (priceCents / 100).toFixed(2)
  return compact ? `$${amount.replace(/\.00$/, '')}` : `$${amount}`
}
