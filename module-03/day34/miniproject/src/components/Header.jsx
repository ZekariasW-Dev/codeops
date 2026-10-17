import useCartStore from '../stores/cartStore'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Menu' },
  { to: '/contact', label: 'Contact' },
]

function Header() {
  const itemCount = useCartStore(state => state.items.reduce((sum, item) => sum + item.quantity, 0))

  return (
    <header className="site-header">
        <div className="brand-row">
          <h1><Link to="/">My Restaurant Menu</Link></h1>
          <Link className="cart-badge" to="/cart" aria-label={`${itemCount} items in cart`}>
            Cart <span>{itemCount}</span>
          </Link>
        </div>
        <nav>
          {navItems.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}>
              {label}
            </NavLink>
          ))}
        </nav>
    </header>
  )
}

export default Header