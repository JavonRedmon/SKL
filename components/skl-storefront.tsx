'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowDownRight, ArrowRight, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import {
  formatPrice,
  getDefaultSize,
  getProductById,
  HOME_PRODUCTS,
  type Product,
  type ProductSize,
} from '@/lib/products'

function Logo() {
  return (
    <Link href="/#top" className="font-mono text-xl font-bold tracking-[-0.12em]" aria-label="SKL home">
      SKL<span className="text-white/30">®</span>
    </Link>
  )
}

function Navbar({ onCart, onSearch }: { onCart: () => void; onSearch: () => void }) {
  const [open, setOpen] = useState(false)
  const { cartCount } = useCart()
  const nav = ['Shop', 'New Drop', 'About', 'Lookbook', 'Support']
  const routes: Record<string, string> = {
    Shop: '/shop',
    'New Drop': '/new-drop',
    About: '/about',
    Lookbook: '/lookbook',
    Support: '/support',
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 transition-all duration-500">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
          <Logo />
          <nav className="hidden items-center gap-7 text-[10px] font-medium uppercase tracking-[0.18em] text-white/65 md:flex">
            {nav.map((item) => (
              <Link key={item} href={routes[item]} className="transition-colors hover:text-white">
                {item}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-white/80">
            <button onClick={onSearch} aria-label="Search" className="transition-colors hover:text-white">
              <Search size={17} strokeWidth={1.5} />
            </button>
            <button aria-label="Account" className="hidden transition-colors hover:text-white sm:block">
              <User size={17} strokeWidth={1.5} />
            </button>
            <button onClick={onCart} aria-label={`Shopping bag with ${cartCount} items`} className="relative transition-colors hover:text-white">
              <ShoppingBag size={17} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex size-3.5 items-center justify-center rounded-full bg-white text-[8px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setOpen((current) => !current)} aria-label="Toggle menu" className="md:hidden">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-30 flex flex-col justify-end bg-black/95 px-6 pb-12 pt-24 md:hidden">
          <div className="flex flex-col gap-5 text-4xl font-semibold tracking-[-0.05em]">
            {['Home', ...nav].map((item) => (
              <Link onClick={() => setOpen(false)} key={item} href={item === 'Home' ? '/' : routes[item]}>
                {item}
              </Link>
            ))}
          </div>
          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-white/40">Seek life / 2026</p>
        </div>
      )}
    </>
  )
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  const cardImage = product.homeCardImage ?? product.image

  return (
    <article className="group">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
            <Image
              src={cardImage}
              alt={product.name}
              fill
              className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.18em] text-white/55">
              {product.category}
            </span>
          </div>
        </Link>
        <button
          onClick={() => onAdd(product)}
          className="absolute bottom-3 right-3 translate-y-0 bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-black opacity-100 transition-all md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          Quick add
        </button>
      </div>
      <div className="flex items-start justify-between gap-3 py-4">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-medium">SKL {product.name}</h3>
          </Link>
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40">{product.detail}</p>
        </div>
        <span className="font-mono text-xs text-white/70">{formatPrice(product.priceCents, true)}</span>
      </div>
    </article>
  )
}

function ProductGrid({ onAdd }: { onAdd: (product: Product) => void }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 md:gap-x-5">
      {HOME_PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  )
}

function SearchOverlay({ close }: { close: () => void }) {
  const [query, setQuery] = useState('')
  const results = useMemo(
    () => HOME_PRODUCTS.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  return (
    <div className="fixed inset-0 z-50 bg-black/95 p-6 md:p-12" role="dialog" aria-modal="true" aria-label="Search SKL">
      <button onClick={close} className="absolute right-6 top-6 text-white/70 hover:text-white" aria-label="Close search">
        <X />
      </button>
      <div className="mx-auto max-w-3xl pt-20">
        <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">Search SKL</p>
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="What are you looking for?"
          className="w-full border-b border-white/20 bg-transparent pb-5 text-3xl tracking-tight outline-none placeholder:text-white/25 md:text-6xl"
        />
        <div className="mt-10 flex flex-col divide-y divide-white/10">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              onClick={close}
              className="flex items-center gap-4 py-4 text-left"
            >
              <div className="relative size-16 overflow-hidden bg-charcoal">
                <Image src={product.homeCardImage ?? product.image} alt="" fill className="object-cover grayscale" sizes="64px" />
              </div>
              <div>
                <p className="text-sm">{product.name}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                  {product.category} / {formatPrice(product.priceCents, true)}
                </p>
              </div>
              <ArrowRight className="ml-auto" size={16} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuantityControl({ lineKey, quantity }: { lineKey: string; quantity: number }) {
  const { updateQuantity } = useCart()

  return (
    <div className="flex w-fit items-center border border-white/15 text-[10px]">
      <button onClick={() => updateQuantity(lineKey, quantity - 1)} className="px-2.5 py-1.5 text-white/60 hover:text-white" aria-label="Decrease quantity">−</button>
      <span className="min-w-6 text-center" aria-label={`Quantity ${quantity}`}>{quantity}</span>
      <button onClick={() => updateQuantity(lineKey, quantity + 1)} className="px-2.5 py-1.5 text-white/60 hover:text-white" aria-label="Increase quantity">+</button>
    </div>
  )
}

function CartDrawer({ close }: { close: () => void }) {
  const { lines, cartCount, subtotalCents, removeItem } = useCart()
  const freeShippingThreshold = 20000
  const remainingCents = Math.max(0, freeShippingThreshold - subtotalCents)
  const progress = Math.min(100, (subtotalCents / freeShippingThreshold) * 100)

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Your bag">
      <button onClick={close} className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Close cart" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#111] p-6 shadow-2xl md:p-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <h2 className="text-xs uppercase tracking-[0.2em]">Your bag <span className="text-white/40">({cartCount})</span></h2>
          <button onClick={close} aria-label="Close cart"><X size={18} /></button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <ShoppingBag className="mb-5 text-white/30" size={30} strokeWidth={1} />
            <p className="text-sm text-white/60">Your bag is empty.</p>
            <button onClick={close} className="mt-6 border border-white/30 px-5 py-3 text-[10px] uppercase tracking-widest">Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-white/10 overflow-auto">
              {lines.map((line) => {
                const product = getProductById(line.productId)
                if (!product) return null

                return (
                  <div key={line.key} className="flex gap-4 py-5">
                    <Link href={`/product/${product.slug}`} onClick={close} className="relative size-24 shrink-0 bg-charcoal">
                      <Image src={product.homeCardImage ?? product.image} alt="" fill className="object-cover grayscale" sizes="96px" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-3">
                        <Link href={`/product/${product.slug}`} onClick={close} className="text-sm">{product.name}</Link>
                        <button onClick={() => removeItem(line.key)} className="text-white/40 hover:text-white" aria-label={`Remove ${product.name}, size ${line.size}`}><X size={14} /></button>
                      </div>
                      <p className="mt-1 text-xs text-white/40">{product.color} / {line.size}</p>
                      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                        <QuantityControl lineKey={line.key} quantity={line.quantity} />
                        <p className="font-mono text-xs">{formatPrice(product.priceCents * line.quantity)}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="border-t border-white/10 pt-5">
              <div className="mb-5">
                <div className="mb-2 flex justify-between text-[10px] uppercase tracking-wider text-white/50">
                  <span>Free shipping</span>
                  <span>{remainingCents === 0 ? 'Unlocked' : `${formatPrice(remainingCents, true)} away`}</span>
                </div>
                <div className="h-0.5 bg-white/15"><div className="h-full bg-white" style={{ width: `${progress}%` }} /></div>
              </div>
              <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-mono">{formatPrice(subtotalCents)}</span></div>
              <Link href="/cart" onClick={close} className="mt-5 block w-full bg-white py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-black">View bag</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default function SKLStorefront() {
  const featuredProduct = HOME_PRODUCTS[0]
  const [search, setSearch] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [featuredSize, setFeaturedSize] = useState<ProductSize>(getDefaultSize(featuredProduct))
  const { addItem } = useCart()

  const add = (product: Product, size = getDefaultSize(product)) => {
    addItem(product.id, size)
    setNotice(`${product.name} / ${size} added to bag`)
    window.setTimeout(() => setNotice(''), 2200)
  }

  return (
    <div id="top" className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar onCart={() => setCartOpen(true)} onSearch={() => setSearch(true)} />
      {search && <SearchOverlay close={() => setSearch(false)} />}
      {cartOpen && <CartDrawer close={() => setCartOpen(false)} />}
      {notice && <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-black">{notice}</div>}
      <main>
        <section className="relative flex min-h-[88vh] items-end overflow-hidden md:min-h-screen">
          <Image src="/images/skl/hero.png" alt="SKL campaign model in black hoodie" fill priority className="object-cover object-center grayscale" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/20" />
          <div className="relative z-10 w-full px-5 pb-12 md:px-10 md:pb-16">
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/60">New collection / 001 — 2026</p>
            <h1 className="max-w-4xl text-[18vw] font-bold leading-[0.78] tracking-[-0.1em] md:text-[12vw]">SEEK<br />LIFE<span className="text-white/40">.</span></h1>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xs text-sm leading-relaxed text-white/65">Made for those who refuse to stand still.</p>
              <a href="#shop" className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]">Shop the drop <span className="flex size-9 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:bg-white group-hover:text-black"><ArrowDownRight size={15} /></span></a>
            </div>
          </div>
        </section>
        <section id="shop" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
          <div className="mb-10 flex items-end justify-between"><div><p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">The collection</p><h2 className="text-4xl font-semibold tracking-[-0.06em] md:text-6xl">LATEST DROP</h2></div><Link href="/shop" className="hidden text-[10px] uppercase tracking-[0.18em] text-white/55 hover:text-white sm:block">View all products <ArrowRight className="ml-2 inline" size={13} /></Link></div>
          <ProductGrid onAdd={add} />
        </section>
        <section className="border-y border-white/10 px-5 py-28 text-center md:px-10 md:py-44"><p className="mx-auto max-w-6xl text-[12vw] font-semibold leading-[0.82] tracking-[-0.1em] text-balance md:text-[9vw]">SEEK MORE.<br /><span className="text-white/30">LIVE MORE.</span><br />SEEK LIFE.</p></section>
        <section id="about" className="grid bg-[#0b0b0b] md:grid-cols-2"><div className="relative min-h-[60vh] md:min-h-[750px]"><Image src="/images/skl/lifestyle.png" alt="Model wearing SKL in the city" fill className="object-cover grayscale" sizes="50vw" /></div><div className="flex flex-col justify-center px-5 py-20 md:px-16 lg:px-24"><p className="mb-12 text-[10px] uppercase tracking-[0.25em] text-white/40">The SKL point of view</p><h2 className="max-w-lg text-4xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-6xl">SKL IS NOT JUST WHAT YOU WEAR. IT&apos;S HOW YOU MOVE.</h2><p className="mt-8 max-w-sm text-sm leading-7 text-white/55">A uniform for the curious. For the ones who keep moving through the noise, following the pull toward something more.</p><Link href="/about" className="mt-12 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]">Discover the story <ArrowRight size={15} /></Link></div></section>
        <section id="new-drop" className="mx-auto grid max-w-[1440px] gap-8 px-5 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-36"><Link href={`/product/${featuredProduct.slug}`} className="relative aspect-[4/5] overflow-hidden bg-charcoal"><Image src={featuredProduct.homeCardImage ?? featuredProduct.image} alt="SKL Seek Life Hoodie" fill className="object-cover grayscale" sizes="50vw" /><span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.2em] text-white/60">Product 001 / Black</span></Link><div className="flex flex-col justify-center"><p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-white/40">The essential</p><h2 className="text-5xl font-semibold tracking-[-0.07em] md:text-7xl">SEEK LIFE<br />HOODIE</h2><p className="mt-7 font-mono text-sm text-white/70">{formatPrice(featuredProduct.priceCents)}</p><p className="mt-7 max-w-sm text-sm leading-7 text-white/55">Heavyweight cotton fleece. Oversized fit. Built to move through every version of your life.</p><div className="mt-10 flex gap-2"><span className="size-7 rounded-full bg-black ring-1 ring-white" /><span className="size-7 rounded-full bg-neutral-500" /></div><div className="mt-8 flex flex-wrap gap-2">{featuredProduct.sizes.map((size) => <button key={size} onClick={() => setFeaturedSize(size)} className={`border px-5 py-3 text-[10px] ${featuredSize === size ? 'border-white bg-white text-black' : 'border-white/20 hover:border-white'}`}>{size}</button>)}</div><button onClick={() => add(featuredProduct, featuredSize)} className="mt-8 w-full max-w-sm bg-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/80">Add to bag</button></div></section>
        <section className="bg-white px-5 py-28 text-black md:px-10 md:py-40"><div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:flex-row md:items-end md:justify-between"><h2 className="max-w-3xl text-6xl font-semibold leading-[0.82] tracking-[-0.09em] md:text-9xl">SEEK<br />LIFE.</h2><p className="max-w-xs text-sm leading-7 text-black/60">Movement. Curiosity. Faith. Purpose. Experience. Refusing to let life pass you by. This is the reason.</p></div></section>
        <section id="lookbook" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36"><div className="mb-10 flex items-end justify-between"><div><p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">Field notes</p><h2 className="text-4xl font-semibold tracking-[-0.06em] md:text-6xl">LOOKBOOK 001</h2></div><Link href="/lookbook" className="text-[10px] uppercase tracking-[0.18em] text-white/55 hover:text-white">View lookbook <ArrowRight className="ml-2 inline" size={13} /></Link></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4"><div className="relative col-span-2 aspect-[4/5] overflow-hidden md:row-span-2"><Image src="/images/skl/lifestyle.png" alt="SKL lookbook city scene" fill className="object-cover grayscale transition-transform duration-700 hover:scale-105" sizes="50vw" /></div>{['/images/skl/hero.png', '/images/skl/hoodie.png'].map((src, index) => <div key={src} className="relative aspect-square overflow-hidden bg-charcoal"><Image src={src} alt={`SKL lookbook detail ${index + 1}`} fill className="object-cover grayscale transition-transform duration-700 hover:scale-105" sizes="25vw" /></div>)}</div></section>
        <section className="border-t border-white/10 px-5 py-24 md:px-10 md:py-32"><div className="mx-auto flex max-w-[900px] flex-col items-center text-center"><p className="text-4xl font-semibold tracking-[-0.06em] md:text-6xl">STAY IN THE LOOP</p><p className="mt-5 text-sm text-white/45">Be first to know about new drops, restocks, and SKL releases.</p><div className="mt-8 flex w-full max-w-md border-b border-white/30 pb-3"><input placeholder="Email address" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/30" /><button onClick={() => setNotice('You are on the list')} className="text-[10px] font-bold uppercase tracking-widest">Join <ArrowRight className="ml-1 inline" size={13} /></button></div></div></section>
      </main>
      <footer id="support" className="border-t border-white/10 px-5 pb-8 pt-16 md:px-10"><div className="grid gap-12 sm:grid-cols-2 md:grid-cols-5"><div className="md:col-span-2"><Logo /><p className="mt-5 max-w-xs text-xs leading-6 text-white/40">A reminder to keep moving. Seek more. Live more. Seek life.</p></div>{[['Shop', 'All Products', 'Hoodies', 'Long Sleeves', 'New Drop'], ['Info', 'About SKL', 'Lookbook', 'Size Guide', 'Contact'], ['Support', 'FAQ', 'Shipping', 'Returns', 'Order Tracking'], ['Social', 'Instagram', 'TikTok', 'YouTube']].map((column) => <div key={column[0]}><p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-white/35">{column[0]}</p><div className="flex flex-col gap-3 text-xs text-white/65">{column.slice(1).map((link) => <a key={link} href="#" className="hover:text-white">{link}</a>)}</div></div>)}</div><div className="mt-20 flex flex-col gap-3 border-t border-white/10 pt-5 text-[9px] uppercase tracking-[0.15em] text-white/30 sm:flex-row sm:justify-between"><span>© 2026 SKL / Seek Life</span><span>Privacy Policy &nbsp;&nbsp; Terms</span></div></footer>
    </div>
  )
}
