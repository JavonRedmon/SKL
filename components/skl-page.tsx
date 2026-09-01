'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronDown, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import {
  formatPrice,
  getDefaultSize,
  getProductById,
  SHOP_PRODUCTS,
  SKL_ASSETS,
  type Product,
  type ProductSize,
} from '@/lib/products'

function SiteHeader() {
  const { cartCount } = useCart()

  return (
    <header className="border-b border-white/10 px-5 py-5 md:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <Link href="/" className="font-mono text-xl font-bold tracking-[-0.12em]">
          SKL<span className="text-white/30">®</span>
        </Link>
        <nav className="hidden gap-7 text-[10px] uppercase tracking-[0.18em] text-white/55 md:flex">
          <Link href="/shop">Shop</Link>
          <Link href="/new-drop">New Drop</Link>
          <Link href="/about">About</Link>
          <Link href="/lookbook">Lookbook</Link>
          <Link href="/support">Support</Link>
        </nav>
        <Link href="/cart" aria-label={`Shopping bag with ${cartCount} items`} className="relative">
          <ShoppingBag size={18} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex size-3.5 items-center justify-center rounded-full bg-white text-[8px] font-bold text-black">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <Image
          src={product.alternateImage}
          alt=""
          fill
          className="object-cover opacity-0 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.18em] text-white/55">{product.category}</span>
      </div>
      <div className="flex justify-between gap-3 py-4">
        <div>
          <h2 className="text-sm">{product.name}</h2>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-white/40">{product.detail}</p>
        </div>
        <span className="font-mono text-xs text-white/70">{formatPrice(product.priceCents)}</span>
      </div>
    </Link>
  )
}

function Shell({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-28">
        <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-white/40">{eyebrow}</p>
        <h1 className="max-w-5xl text-6xl font-semibold leading-[0.84] tracking-[-0.09em] md:text-9xl">{title}</h1>
        {children}
      </main>
    </div>
  )
}

export function SKLRoutePage({ page }: { page: string }) {
  if (page === 'shop') {
    return (
      <Shell eyebrow="The collection / 001" title="SHOP SKL">
        <div className="mt-16 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5">
          {SHOP_PRODUCTS.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </Shell>
    )
  }

  if (page === 'new-drop') {
    return (
      <Shell eyebrow="Release 001 / 2026" title={<>THE LATEST<br />DROP</>}>
        <div className="mt-16 grid gap-6 md:grid-cols-[1.15fr_.85fr]">
          <div className="relative aspect-[4/5] overflow-hidden"><Image src={SKL_ASSETS.back} alt="SKL Seek Life hoodie back print" fill className="object-cover grayscale" sizes="60vw" /></div>
          <div className="flex flex-col justify-end gap-7 border-t border-white/15 py-8 md:border-l md:border-t-0 md:pl-10"><p className="max-w-sm text-sm leading-7 text-white/60">A first study in movement, purpose, and the space between where you are and where you are going.</p><Link href="/shop" className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]">Shop collection <ArrowRight size={15} /></Link></div>
        </div>
      </Shell>
    )
  }

  if (page === 'about') {
    return (
      <Shell eyebrow="The point of view" title={<>SEEK<br />LIFE.</>}>
        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-20"><div className="relative aspect-[4/5] overflow-hidden"><Image src={SKL_ASSETS.frontAlt} alt="SKL front logo hoodie" fill className="object-cover grayscale" sizes="50vw" /></div><div className="flex flex-col justify-center"><p className="max-w-md text-2xl leading-tight tracking-tight md:text-4xl">SKL is a reminder to stay awake to the life in front of you.</p><p className="mt-8 max-w-sm text-sm leading-7 text-white/55">Movement. Curiosity. Faith. Purpose. Experience. We make considered uniforms for people who refuse to let life pass them by.</p></div></div>
      </Shell>
    )
  }

  if (page === 'lookbook') {
    return (
      <Shell eyebrow="Field notes / 001" title="LOOKBOOK">
        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4"><div className="relative col-span-2 aspect-[4/5] md:row-span-2"><Image src={SKL_ASSETS.backAngle} alt="SKL hoodie angled product view" fill className="object-cover grayscale" sizes="50vw" /></div><div className="relative aspect-square"><Image src={SKL_ASSETS.front} alt="SKL front hoodie detail" fill className="object-cover grayscale" sizes="25vw" /></div><div className="relative aspect-square"><Image src={SKL_ASSETS.back} alt="SKL rear hoodie detail" fill className="object-cover grayscale" sizes="25vw" /></div></div>
      </Shell>
    )
  }

  if (page === 'support') {
    return (
      <Shell eyebrow="Customer care" title={<>HOW CAN<br />WE HELP?</>}>
        <div className="mt-16 grid gap-3 md:grid-cols-3">{['Track my order', 'Shipping', 'Returns & exchanges', 'Size guide', 'Contact us', 'FAQ'].map((item) => <Link key={item} href={`/support/${item.toLowerCase().replaceAll(' ', '-')}`} className="flex items-center justify-between border border-white/15 p-5 text-sm transition-colors hover:bg-white hover:text-black"><span>{item}</span><ArrowRight size={15} /></Link>)}</div>
      </Shell>
    )
  }

  return (
    <Shell eyebrow="SKL / 2026" title="PAGE NOT FOUND">
      <Link href="/" className="mt-10 inline-flex items-center gap-3 text-[10px] uppercase tracking-widest"><ArrowLeft size={15} /> Return home</Link>
    </Shell>
  )
}

export function ProductPage({ product }: { product: Product }) {
  const [size, setSize] = useState<ProductSize>(getDefaultSize(product))
  const [addedSize, setAddedSize] = useState<ProductSize | null>(null)
  const { addItem } = useCart()

  const selectSize = (selectedSize: ProductSize) => {
    setSize(selectedSize)
    setAddedSize(null)
  }

  const addToBag = () => {
    addItem(product.id, size)
    setAddedSize(size)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-20">
        <Link href="/shop" className="mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/45"><ArrowLeft size={14} /> Back to shop</Link>
        <div className="grid gap-8 md:grid-cols-[1.15fr_.85fr] md:gap-16">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[4/5] overflow-hidden bg-charcoal"><Image src={product.image} alt={`${product.name} front view`} fill className="object-cover grayscale" priority sizes="70vw" /></div>
            <div className="relative aspect-square overflow-hidden bg-charcoal"><Image src={product.alternateImage} alt={`${product.name} alternate view`} fill className="object-cover grayscale" sizes="35vw" /></div>
            <div className="relative aspect-square overflow-hidden bg-charcoal"><Image src={product.galleryImage} alt={`${product.name} detail view`} fill className="object-cover grayscale" sizes="35vw" /></div>
          </div>
          <div className="flex flex-col justify-center md:sticky md:top-10 md:h-fit">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">SKL / 001</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.07em] md:text-7xl">{product.name}</h1>
            <p className="mt-6 font-mono text-sm">{formatPrice(product.priceCents)}</p>
            <p className="mt-7 max-w-sm text-sm leading-7 text-white/55">{product.description}</p>
            <div className="mt-10">
              <p className="mb-3 text-[10px] uppercase tracking-widest text-white/45">Select size</p>
              <div className="flex gap-2">{product.sizes.map((item) => <button key={item} onClick={() => selectSize(item)} className={`border px-5 py-3 text-[10px] ${size === item ? 'border-white bg-white text-black' : 'border-white/20'}`}>{item}</button>)}</div>
            </div>
            <button onClick={addToBag} className="mt-8 w-full bg-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black">{addedSize === size ? `Added / Size ${size}` : 'Add to bag'}</button>
            <div className="mt-10 divide-y divide-white/15 border-y border-white/15">{['Details', 'Fit & sizing', 'Materials', 'Shipping & returns', 'Care instructions'].map((item) => <details key={item} className="group py-4"><summary className="flex cursor-pointer list-none justify-between text-xs uppercase tracking-widest"><span>{item}</span><ChevronDown size={15} className="transition-transform group-open:rotate-180" /></summary><p className="mt-4 max-w-md text-sm leading-6 text-white/50">Designed for everyday movement. Please allow 2–4 business days for processing.</p></details>)}</div>
          </div>
        </div>
      </main>
    </div>
  )
}

function CartQuantity({ lineKey, quantity, productName }: { lineKey: string; quantity: number; productName: string }) {
  const { updateQuantity } = useCart()

  return (
    <div className="flex w-fit items-center border border-white/20">
      <button onClick={() => updateQuantity(lineKey, quantity - 1)} className="p-3 text-white/55 transition-colors hover:text-white" aria-label={`Decrease quantity of ${productName}`}><Minus size={12} /></button>
      <span className="min-w-8 text-center font-mono text-xs" aria-label={`Quantity ${quantity}`}>{quantity}</span>
      <button onClick={() => updateQuantity(lineKey, quantity + 1)} className="p-3 text-white/55 transition-colors hover:text-white" aria-label={`Increase quantity of ${productName}`}><Plus size={12} /></button>
    </div>
  )
}

export function CartPage() {
  const { lines, cartCount, subtotalCents, hasHydrated, removeItem } = useCart()

  return (
    <Shell eyebrow="Your selection" title="YOUR BAG">
      {!hasHydrated ? (
        <div className="mt-16 border-y border-white/15 py-8"><p className="text-sm text-white/55">Loading your bag…</p></div>
      ) : lines.length === 0 ? (
        <div className="mt-16 border-y border-white/15 py-8">
          <p className="text-sm text-white/55">Your bag is empty.</p>
          <Link href="/shop" className="mt-8 inline-flex items-center gap-3 bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-black">Continue shopping <ArrowRight size={15} /></Link>
        </div>
      ) : (
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
          <div className="divide-y divide-white/15 border-y border-white/15">
            {lines.map((line) => {
              const product = getProductById(line.productId)
              if (!product) return null

              return (
                <article key={line.key} className="grid grid-cols-[112px_1fr] gap-5 py-6 sm:grid-cols-[160px_1fr] sm:gap-8 sm:py-8">
                  <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-charcoal"><Image src={product.image} alt={product.name} fill className="object-cover grayscale" sizes="(max-width: 640px) 112px, 160px" /></Link>
                  <div className="flex min-w-0 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div><p className="text-[9px] uppercase tracking-[0.2em] text-white/35">{product.category}</p><Link href={`/product/${product.slug}`} className="mt-2 block text-sm sm:text-base">{product.name}</Link><p className="mt-2 text-[10px] uppercase tracking-widest text-white/45">{product.color} / Size {line.size}</p></div>
                      <button onClick={() => removeItem(line.key)} className="text-white/40 transition-colors hover:text-white" aria-label={`Remove ${product.name}, size ${line.size}`}><X size={16} /></button>
                    </div>
                    <div className="mt-auto flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-end">
                      <CartQuantity lineKey={line.key} quantity={line.quantity} productName={product.name} />
                      <div className="text-left sm:text-right"><p className="font-mono text-xs">{formatPrice(product.priceCents * line.quantity)}</p>{line.quantity > 1 && <p className="mt-1 text-[9px] uppercase tracking-widest text-white/35">{formatPrice(product.priceCents)} each</p>}</div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          <aside className="h-fit border-y border-white/15 py-7 lg:sticky lg:top-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Bag summary / {cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
            <div className="mt-8 flex items-center justify-between text-sm"><span>Subtotal</span><span className="font-mono">{formatPrice(subtotalCents)}</span></div>
            <p className="mt-4 text-xs leading-5 text-white/40">Shipping and taxes will be calculated when checkout is added.</p>
            <Link href="/shop" className="mt-8 flex w-full items-center justify-center gap-3 border border-white/30 py-4 text-[10px] font-bold uppercase tracking-widest">Continue shopping <ArrowRight size={15} /></Link>
          </aside>
        </div>
      )}
    </Shell>
  )
}

export default SKLRoutePage
