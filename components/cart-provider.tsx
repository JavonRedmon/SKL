'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { getProductById, type ProductSize } from '@/lib/products'

const CART_STORAGE_KEY = 'skl-cart'
const CART_STORAGE_VERSION = 1

export type CartLine = Readonly<{
  key: string
  productId: string
  size: ProductSize
  quantity: number
}>

type CartContextValue = {
  lines: CartLine[]
  cartCount: number
  subtotalCents: number
  hasHydrated: boolean
  addItem: (productId: string, size: ProductSize, quantity?: number) => void
  updateQuantity: (lineKey: string, quantity: number) => void
  removeItem: (lineKey: string) => void
}

type StoredCart = {
  version: number
  lines: unknown[]
}

type CartState = {
  lines: CartLine[]
  hasHydrated: boolean
}

const CartContext = createContext<CartContextValue | null>(null)
const INITIAL_CART_STATE: CartState = { lines: [], hasHydrated: false }

export function getCartLineKey(productId: string, size: ProductSize) {
  return `${productId}::${size}`
}

function parseStoredCart(value: string | null): CartLine[] {
  if (!value) return []

  try {
    const stored = JSON.parse(value) as StoredCart
    if (stored.version !== CART_STORAGE_VERSION || !Array.isArray(stored.lines)) return []

    const validLines = new Map<string, CartLine>()

    for (const candidate of stored.lines) {
      if (!candidate || typeof candidate !== 'object') continue

      const { productId, size, quantity } = candidate as Partial<CartLine>
      const product = typeof productId === 'string' ? getProductById(productId) : undefined

      if (
        !product ||
        typeof size !== 'string' ||
        !product.sizes.includes(size as ProductSize) ||
        typeof quantity !== 'number' ||
        !Number.isFinite(quantity)
      ) {
        continue
      }

      const normalizedQuantity = Math.min(99, Math.max(1, Math.floor(quantity)))
      const key = getCartLineKey(product.id, size as ProductSize)
      const existing = validLines.get(key)

      validLines.set(key, {
        key,
        productId: product.id,
        size: size as ProductSize,
        quantity: Math.min(99, (existing?.quantity ?? 0) + normalizedQuantity),
      })
    }

    return Array.from(validLines.values())
  } catch {
    return []
  }
}

function readStoredCart(): CartLine[] {
  if (typeof window === 'undefined') return []

  try {
    return parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY))
  } catch {
    return []
  }
}

function persistCart(lines: CartLine[]) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ version: CART_STORAGE_VERSION, lines }),
    )
  } catch {
    // The in-memory cart remains usable when storage is unavailable or full.
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartState, setCartState] = useState<CartState>(INITIAL_CART_STATE)
  const cartStateRef = useRef<CartState>(INITIAL_CART_STATE)

  const hydrateCart = useCallback(() => {
    if (cartStateRef.current.hasHydrated) return cartStateRef.current.lines

    const nextState: CartState = {
      lines: readStoredCart(),
      hasHydrated: true,
    }

    cartStateRef.current = nextState
    setCartState(nextState)
    return nextState.lines
  }, [])

  useEffect(() => {
    hydrateCart()
  }, [hydrateCart])

  const updateCartLines = useCallback(
    (update: (current: CartLine[]) => CartLine[]) => {
      const currentLines = cartStateRef.current.hasHydrated
        ? cartStateRef.current.lines
        : hydrateCart()
      const lines = update(currentLines)
      const nextState: CartState = { lines, hasHydrated: true }

      cartStateRef.current = nextState
      setCartState(nextState)
      persistCart(lines)
    },
    [hydrateCart],
  )

  const { lines, hasHydrated } = cartState

  const addItem = useCallback((productId: string, size: ProductSize, quantity = 1) => {
    const product = getProductById(productId)
    if (!product || !product.sizes.includes(size)) return

    const amount = Math.min(99, Math.max(1, Math.floor(quantity)))
    const key = getCartLineKey(productId, size)

    updateCartLines((current) => {
      const existing = current.find((line) => line.key === key)

      if (!existing) return [...current, { key, productId, size, quantity: amount }]

      return current.map((line) =>
        line.key === key
          ? { ...line, quantity: Math.min(99, line.quantity + amount) }
          : line,
      )
    })
  }, [updateCartLines])

  const updateQuantity = useCallback((lineKey: string, quantity: number) => {
    const normalizedQuantity = Math.min(99, Math.floor(quantity))

    updateCartLines((current) =>
      normalizedQuantity <= 0
        ? current.filter((line) => line.key !== lineKey)
        : current.map((line) =>
            line.key === lineKey ? { ...line, quantity: normalizedQuantity } : line,
          ),
    )
  }, [updateCartLines])

  const removeItem = useCallback((lineKey: string) => {
    updateCartLines((current) => current.filter((line) => line.key !== lineKey))
  }, [updateCartLines])

  const cartCount = useMemo(
    () => lines.reduce((total, line) => total + line.quantity, 0),
    [lines],
  )

  const subtotalCents = useMemo(
    () =>
      lines.reduce((total, line) => {
        const product = getProductById(line.productId)
        return total + (product?.priceCents ?? 0) * line.quantity
      }, 0),
    [lines],
  )

  const value = useMemo(
    () => ({
      lines,
      cartCount,
      subtotalCents,
      hasHydrated,
      addItem,
      updateQuantity,
      removeItem,
    }),
    [addItem, cartCount, hasHydrated, lines, removeItem, subtotalCents, updateQuantity],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error('useCart must be used within CartProvider')
  return cart
}
