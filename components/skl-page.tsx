'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown, ShoppingBag } from 'lucide-react'

const assets = {
  back: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000164081f79479ce30e50600af-FVpUj6OQcV0ib7QJYMoS5IqWAnxAng.png',
  backAngle: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000000e6481f79e089ea25e06a4b4-GVmTTuzcSI105dusSu4HnxmOU9C0Ac.png',
  front: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_000000004bd881f792f5ddf681596146-yEXvhUe1ocplAFZT1uVSkw96JiGUel.png',
  frontAlt: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000048081f7855f1ea2b1e35c90-1pQ6QOpXP5PCjtxz42enP85NFBQwbx.png',
}

const products = [
  { slug: 'seek-life-hoodie', name: 'Seek Life Hoodie', price: '$120.00', category: 'Hoodies', image: assets.front, alternate: assets.back },
  { slug: 'seek-life-hoodie-back', name: 'Seek Life Hoodie / Back Print', price: '$120.00', category: 'Hoodies', image: assets.back, alternate: assets.backAngle },
  { slug: 'skl-mark-hoodie', name: 'SKL Mark Hoodie', price: '$120.00', category: 'Hoodies', image: assets.frontAlt, alternate: assets.front },
]

function SiteHeader() {
  return <header className="border-b border-white/10 px-5 py-5 md:px-10"><div className="mx-auto flex max-w-[1440px] items-center justify-between"><Link href="/" className="font-mono text-xl font-bold tracking-[-0.12em]">SKL<span className="text-white/30">®</span></Link><nav className="hidden gap-7 text-[10px] uppercase tracking-[0.18em] text-white/55 md:flex"><Link href="/shop">Shop</Link><Link href="/new-drop">New Drop</Link><Link href="/about">About</Link><Link href="/lookbook">Lookbook</Link><Link href="/support">Support</Link></nav><Link href="/cart" aria-label="Shopping bag"><ShoppingBag size={18} strokeWidth={1.5} /></Link></div></header>
}

function ProductCard({ product }: { product: typeof products[number] }) {
  const [hovered, setHovered] = useState(false)
  return <Link href={`/product/${product.slug}`} className="group block" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}><div className="relative aspect-[4/5] overflow-hidden bg-charcoal"><Image src={hovered ? product.alternate : product.image} alt={product.name} fill className="object-cover grayscale transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 33vw" /><span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.18em] text-white/55">{product.category}</span></div><div className="flex justify-between gap-3 py-4"><div><h2 className="text-sm">{product.name}</h2><p className="mt-1 text-[10px] uppercase tracking-widest text-white/40">Black / Heavyweight fleece</p></div><span className="font-mono text-xs text-white/70">{product.price}</span></div></Link>
}

function Shell({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) { return <div className="min-h-screen bg-black text-white"><SiteHeader /><main className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-28"><p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-white/40">{eyebrow}</p><h1 className="max-w-5xl text-6xl font-semibold leading-[0.84] tracking-[-0.09em] md:text-9xl">{title}</h1>{children}</main></div> }

export function SKLRoutePage({ page }: { page: string }) {
  if (page === 'shop') return <Shell eyebrow="The collection / 001" title="SHOP SKL"><div className="mt-16 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5">{products.map(p => <ProductCard key={p.slug} product={p} />)}</div></Shell>
  if (page === 'new-drop') return <Shell eyebrow="Release 001 / 2026" title={<>THE LATEST<br />DROP</>}><div className="mt-16 grid gap-6 md:grid-cols-[1.15fr_.85fr]"><div className="relative aspect-[4/5] overflow-hidden"><Image src={assets.back} alt="SKL Seek Life hoodie back print" fill className="object-cover grayscale" sizes="60vw" /></div><div className="flex flex-col justify-end gap-7 border-t border-white/15 py-8 md:border-t-0 md:border-l md:pl-10"><p className="max-w-sm text-sm leading-7 text-white/60">A first study in movement, purpose, and the space between where you are and where you are going.</p><Link href="/shop" className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]">Shop collection <ArrowRight size={15} /></Link></div></div></Shell>
  if (page === 'about') return <Shell eyebrow="The point of view" title={<>SEEK<br />LIFE.</>}><div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-20"><div className="relative aspect-[4/5] overflow-hidden"><Image src={assets.frontAlt} alt="SKL front logo hoodie" fill className="object-cover grayscale" sizes="50vw" /></div><div className="flex flex-col justify-center"><p className="max-w-md text-2xl leading-tight tracking-tight md:text-4xl">SKL is a reminder to stay awake to the life in front of you.</p><p className="mt-8 max-w-sm text-sm leading-7 text-white/55">Movement. Curiosity. Faith. Purpose. Experience. We make considered uniforms for people who refuse to let life pass them by.</p></div></div></Shell>
  if (page === 'lookbook') return <Shell eyebrow="Field notes / 001" title="LOOKBOOK"><div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4"><div className="relative col-span-2 aspect-[4/5] md:row-span-2"><Image src={assets.backAngle} alt="SKL hoodie angled product view" fill className="object-cover grayscale" sizes="50vw" /></div><div className="relative aspect-square"><Image src={assets.front} alt="SKL front hoodie detail" fill className="object-cover grayscale" sizes="25vw" /></div><div className="relative aspect-square"><Image src={assets.back} alt="SKL rear hoodie detail" fill className="object-cover grayscale" sizes="25vw" /></div></div></Shell>
  if (page === 'support') return <Shell eyebrow="Customer care" title={<>HOW CAN<br />WE HELP?</>}><div className="mt-16 grid gap-3 md:grid-cols-3">{['Track my order','Shipping','Returns & exchanges','Size guide','Contact us','FAQ'].map(item => <Link key={item} href={`/support/${item.toLowerCase().replaceAll(' ', '-')}`} className="flex items-center justify-between border border-white/15 p-5 text-sm transition-colors hover:bg-white hover:text-black"><span>{item}</span><ArrowRight size={15} /></Link>)}</div></Shell>
  return <Shell eyebrow="SKL / 2026" title="PAGE NOT FOUND"><Link href="/" className="mt-10 inline-flex items-center gap-3 text-[10px] uppercase tracking-widest"><ArrowLeft size={15} /> Return home</Link></Shell>
}

export function ProductPage({ slug }: { slug: string }) {
  const product = products.find(p => p.slug === slug) ?? products[0]
  const [size, setSize] = useState('M')
  const [added, setAdded] = useState(false)
  return <div className="min-h-screen bg-black text-white"><SiteHeader /><main className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-20"><Link href="/shop" className="mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/45"><ArrowLeft size={14} /> Back to shop</Link><div className="grid gap-8 md:grid-cols-[1.15fr_.85fr] md:gap-16"><div className="grid grid-cols-2 gap-3"><div className="relative col-span-2 aspect-[4/5] overflow-hidden bg-charcoal"><Image src={product.image} alt={`${product.name} front view`} fill className="object-cover grayscale" priority sizes="70vw" /></div><div className="relative aspect-square overflow-hidden bg-charcoal"><Image src={product.alternate} alt={`${product.name} alternate view`} fill className="object-cover grayscale" sizes="35vw" /></div><div className="relative aspect-square overflow-hidden bg-charcoal"><Image src={assets.backAngle} alt={`${product.name} side view`} fill className="object-cover grayscale" sizes="35vw" /></div></div><div className="flex flex-col justify-center md:sticky md:top-10 md:h-fit"><p className="text-[10px] uppercase tracking-[0.25em] text-white/40">SKL / 001</p><h1 className="mt-4 text-5xl font-semibold tracking-[-0.07em] md:text-7xl">{product.name}</h1><p className="mt-6 font-mono text-sm">{product.price}</p><p className="mt-7 max-w-sm text-sm leading-7 text-white/55">Heavyweight cotton fleece with an oversized fit and original SEEK LIFE artwork across the body.</p><div className="mt-10"><p className="mb-3 text-[10px] uppercase tracking-widest text-white/45">Select size</p><div className="flex gap-2">{['S','M','L','XL'].map(item => <button key={item} onClick={() => setSize(item)} className={`border px-5 py-3 text-[10px] ${size === item ? 'border-white bg-white text-black' : 'border-white/20'}`}>{item}</button>)}</div></div><button onClick={() => setAdded(true)} className="mt-8 w-full bg-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black">{added ? `Added / Size ${size}` : 'Add to bag'}</button><div className="mt-10 divide-y divide-white/15 border-y border-white/15">{['Details','Fit & sizing','Materials','Shipping & returns','Care instructions'].map(item => <details key={item} className="group py-4"><summary className="flex cursor-pointer list-none justify-between text-xs uppercase tracking-widest"><span>{item}</span><ChevronDown size={15} className="transition-transform group-open:rotate-180" /></summary><p className="mt-4 max-w-md text-sm leading-6 text-white/50">Designed for everyday movement. Please allow 2–4 business days for processing.</p></details>)}</div></div></div></main></div>
}

export function CartPage() { return <Shell eyebrow="Your selection" title="YOUR BAG"><div className="mt-16 border-y border-white/15 py-8"><p className="text-sm text-white/55">Your bag is ready for the next piece of the journey.</p><Link href="/shop" className="mt-8 inline-flex items-center gap-3 bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black">Continue shopping <ArrowRight size={15} /></Link></div></Shell> }

export default SKLRoutePage
