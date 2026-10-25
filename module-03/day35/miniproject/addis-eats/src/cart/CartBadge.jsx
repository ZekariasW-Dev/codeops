import { Link } from 'react-router-dom'
import { useCart } from './useCart.js'

export function CartBadge() {
  const { count } = useCart()

  return (
    <Link className="nav-cart" to="/cart" aria-label={`Basket, ${count} items`}>
      Basket <span className="cart-count" aria-live="polite">{count}</span>
    </Link>
  )
}
