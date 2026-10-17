import { createContext, useContext, useMemo, useReducer } from 'react'
import cartReducer from '../reducers/cartReducer'

const CartContext = createContext(null)

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // A stable value prevents unrelated provider renders from notifying every cart consumer.
  const value = useMemo(() => ({ items, dispatch, total }), [items, total])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}

export { CartProvider, useCart }
