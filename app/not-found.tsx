import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <Link href="/" className="font-mono text-xl font-bold tracking-[-0.12em]">
            SKL<span className="text-white/30">®</span>
          </Link>
          <Link href="/shop" className="text-[10px] uppercase tracking-[0.18em] text-white/55">Shop</Link>
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-28">
        <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-white/40">SKL / 404</p>
        <h1 className="max-w-5xl text-6xl font-semibold leading-[0.84] tracking-[-0.09em] md:text-9xl">PAGE NOT FOUND</h1>
        <Link href="/" className="mt-10 inline-flex items-center gap-3 text-[10px] uppercase tracking-widest"><ArrowLeft size={15} /> Return home</Link>
      </main>
    </div>
  )
}
