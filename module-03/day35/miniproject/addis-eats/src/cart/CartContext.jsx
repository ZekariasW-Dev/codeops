import { useMemo, useReducer } from 'react'
import { CartContext } from './cart-context.js'

function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const existing = items.find((item) => item.id === action.dish.id)
      if (existing) {
        return items.map((item) =>
          item.id === action.dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...items, { ...action.dish, quantity: 1 }]
    }
    case 'remove':
      return items
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0)
    case 'clear':
      return []
    default:
      throw new Error(`Unsupported cart action: ${action.type}`)
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const value = useMemo(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0)
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )

    return {
      items,
      count,
      total,
      add: (dish) => dispatch({ type: 'add', dish }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
