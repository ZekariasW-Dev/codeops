import { Link } from 'react-router-dom'
import CartPanel from '../components/CartPanel'

function CartPage() {
  return (
    <section>
      <CartPanel />
      <div className="route-actions"><Link className="primary-link" to="/checkout">Continue to checkout</Link></div>
    </section>
  )
}

export default CartPage