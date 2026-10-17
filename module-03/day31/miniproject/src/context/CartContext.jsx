import { useEffect, useMemo, useReducer } from 'react'
import cartReducer from '../reducers/cartReducer'
import CartContext from './CartContext'

function getStoredItems() {
  const savedItems = window.localStorage.getItem('restaurant-cart')
  return savedItems ? JSON.parse(savedItems) : []
}

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, getStoredItems)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const value = useMemo(() => ({ items, dispatch, total }), [items, total])

  useEffect(() => {
    window.localStorage.setItem('restaurant-cart', JSON.stringify(items))
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
