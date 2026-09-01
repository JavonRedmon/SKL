import { ProductPage } from '@/components/skl-page'
import { getProductBySlug, PRODUCTS } from '@/lib/products'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) notFound()

  return <ProductPage product={product} />
}
