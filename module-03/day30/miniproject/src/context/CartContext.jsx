import { useMemo, useReducer } from 'react'
import cartReducer from '../reducers/cartReducer'
import CartContext from './CartContext'

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const value = useMemo(() => ({ items, dispatch, total }), [items, total])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
