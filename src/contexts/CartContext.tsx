'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

// Types
export interface CartItem {
  id: string
  slug: string
  name: string
  size: string
  height: string
  price: number
  priceDisplay: string
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  count: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
  count: 0
}

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      )

      let newItems: CartItem[]
      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // New item, add to cart
        newItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        items: newItems,
        total: newTotal,
        count: newCount
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id)
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        items: newItems,
        total: newTotal,
        count: newCount
      }
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0)

      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        items: newItems,
        total: newTotal,
        count: newCount
      }
    }

    case 'CLEAR_CART':
      return initialState

    case 'LOAD_CART':
      return action.payload

    default:
      return state
  }
}

// Context
const CartContext = createContext<CartContextType | null>(null)

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('jungle-sale-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jungle-sale-cart', JSON.stringify(state))
  }, [state])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
