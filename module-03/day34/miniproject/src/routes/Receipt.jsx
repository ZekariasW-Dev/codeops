import { Link } from 'react-router-dom'

function Receipt() {
  return <main className="empty-state"><h2>Receipt</h2><p>Your order receipt will appear here after payment.</p><Link to="/menu">Return to the menu</Link></main>
}

export default Receipt
