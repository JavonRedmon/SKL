import { ProductPage } from '@/components/skl-page'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ProductPage slug={slug} />
}
