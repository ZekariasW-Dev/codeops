import { Link } from 'react-router-dom'
import useCartStore from '../stores/cartStore'

function ReceiptPage() {
  const items = useCartStore(state => state.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <section className="receipt-page">
      <p className="eyebrow">Receipt preview</p>
      <h2>Thank you for ordering</h2>
      {items.length === 0 ? (
        <p>Your receipt is ready for a future order.</p>
      ) : (
        <>
          <ul>
            {items.map(item => <li key={item.id}>{item.name} x {item.quantity}</li>)}
          </ul>
          <strong>Total: {total} ETB</strong>
        </>
      )}
      <div className="route-actions">
        <Link className="primary-link" to="/">Back to menu</Link>
      </div>
    </section>
  )
}

export default ReceiptPage
