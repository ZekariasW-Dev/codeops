import { useState } from 'react'
import { Link } from 'react-router-dom'
import CartPanel from '../components/CartPanel'
import ErrorBoundary from '../components/ErrorBoundary'

function CartPage() {
  const [shouldFail, setShouldFail] = useState(false)

  return (
    <section>
      <button className="demo-toggle" type="button" onClick={() => setShouldFail(current => !current)}>
        {shouldFail ? 'Restore cart panel' : 'Trigger cart error'}
      </button>
      <ErrorBoundary key={`cart-${shouldFail}`} fallback={({ error }) => (
        <section className="error-panel" role="alert">
          <h2>Cart panel unavailable</h2>
          <p>{error.message}</p>
          <p>The header and checkout link remain available.</p>
        </section>
      )}>
        <CartPanel shouldFail={shouldFail} />
      </ErrorBoundary>
      <div className="route-actions"><Link className="primary-link" to="/checkout">Continue to checkout</Link></div>
    </section>
  )
}

export default CartPage