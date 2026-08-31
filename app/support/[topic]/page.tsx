import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function Page({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const title = topic.replaceAll('-', ' ').toUpperCase()
  return <main className="min-h-screen bg-black px-5 py-10 text-white md:px-10 md:py-20"><Link href="/support" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/45"><ArrowLeft size={14} /> Support hub</Link><div className="mx-auto max-w-3xl py-28"><p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-white/40">Customer care / SKL</p><h1 className="text-6xl font-semibold leading-[0.84] tracking-[-0.09em] md:text-9xl">{title}</h1><p className="mt-12 max-w-md text-sm leading-7 text-white/55">This SKL support guide is ready for your final policy details. For now, contact support@skl.example and our team will help you keep moving.</p></div></main>
}
