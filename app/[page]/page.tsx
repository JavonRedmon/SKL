import { SKLRoutePage } from '@/components/skl-page'

export function generateStaticParams() {
  return ['shop', 'new-drop', 'about', 'lookbook', 'support'].map(page => ({ page }))
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params
  return <SKLRoutePage page={page} />
}
