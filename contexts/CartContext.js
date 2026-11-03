import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react'

/**
 * Minimal shopping cart (replaces `use-shopping-cart`).
 *
 * Why: that library re-created its Redux store on every render and, once
 * mounted, changed the shape of its element tree (adding a PersistGate), which
 * made React unmount and re-mount the whole app (header, page, footer) right
 * after hydration on every page. It also pulled in Redux Toolkit, Immer and
 * redux-persist, and loaded Stripe.js on every page, though the cart only
 * needs eight small operations. Stripe is loaded on /checkout where it is used.
 *
 * Same hook name and the same fields the app already reads:
 *   cartCount, cartDetails, totalPrice (cents),
 *   addItem, incrementItem, removeItem, setItemQuantity, clearCart
 *
 * The provider renders identically on the server and the first client render;
 * the saved cart is restored in an effect after mount (no hydration mismatch).
 */

const STORAGE_KEY = 'tali-cart-v1'
const CartContext = createContext(null)

function reducer(items, action) {
  switch (action.type) {
    case 'load':
      return action.items
    case 'add': {
      const { product, count } = action
      const existing = items[product.id]
      return {
        ...items,
        [product.id]: { ...product, quantity: (existing ? existing.quantity : 0) + count },
      }
    }
    case 'set': {
      if (!items[action.id]) return items
      if (action.quantity <= 0) {
        const { [action.id]: _removed, ...rest } = items
        return rest
      }
      return { ...items, [action.id]: { ...items[action.id], quantity: action.quantity } }
    }
    case 'remove': {
      const { [action.id]: _removed, ...rest } = items
      return rest
    }
    case 'clear':
      return {}
    default:
      return items
  }
}

// Only accept well-formed items from storage (it is user-editable).
function sanitize(raw) {
  const clean = {}
  if (!raw || typeof raw !== 'object') return clean
  for (const [id, item] of Object.entries(raw)) {
    if (
      item && typeof item === 'object' && item.id === id &&
      Number.isFinite(item.price) && item.price >= 0 &&
      Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 999
    ) {
      clean[id] = item
    }
  }
  return clean
}

function readStorage() {
  try {
    return sanitize(JSON.parse(window.localStorage.getItem(STORAGE_KEY)))
  } catch (e) {
    return {}
  }
}

export const CartProvider = ({ children }) => {
  const [cartDetails, dispatch] = useReducer(reducer, {})
  const restored = useRef(false)

  // Restore after mount, and follow changes made in other tabs.
  useEffect(() => {
    dispatch({ type: 'load', items: readStorage() })
    restored.current = true
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY || e.key === null) dispatch({ type: 'load', items: readStorage() })
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Persist (but never before the saved cart has been restored).
  useEffect(() => {
    if (!restored.current) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartDetails))
    } catch (e) {
      /* storage unavailable (private mode / quota): the cart still works in memory */
    }
  }, [cartDetails])

  const addItem = useCallback((product, options = {}) => {
    const count = Number.isInteger(options.count) && options.count > 0 ? options.count : 1
    dispatch({ type: 'add', product, count })
  }, [])
  const incrementItem = useCallback((id, count = 1) => {
    dispatch({ type: 'set', id, quantity: (cartDetails[id] ? cartDetails[id].quantity : 0) + count })
  }, [cartDetails])
  const setItemQuantity = useCallback((id, quantity) => dispatch({ type: 'set', id, quantity }), [])
  const removeItem = useCallback((id) => dispatch({ type: 'remove', id }), [])
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), [])

  const value = useMemo(() => {
    const entries = Object.values(cartDetails)
    return {
      cartDetails,
      cartCount: entries.reduce((n, i) => n + i.quantity, 0),
      totalPrice: entries.reduce((sum, i) => sum + i.price * i.quantity, 0),
      addItem,
      incrementItem,
      setItemQuantity,
      removeItem,
      clearCart,
    }
  }, [cartDetails, addItem, incrementItem, setItemQuantity, removeItem, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useShoppingCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useShoppingCart must be used within a CartProvider')
  return ctx
}
