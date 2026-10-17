import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import useCartStore from '../stores/cartStore'

function Header() {
  const itemCount = useCartStore(state => state.items.reduce((sum, item) => sum + item.quantity, 0))
  const { user, signOut } = useAuth()
  const location = useLocation()

  return (
    <header className="site-header">
      <div>
        <Link className="brand-link" to="/">
          <h1>Yeab's Restaurant</h1>
        </Link>
      <p>Welcome to our food menu</p>
      </div>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" end className={location.pathname === '/' || location.pathname.startsWith('/menu') ? 'active' : undefined}>Menu</NavLink>
        <NavLink to="/cart">Cart ({itemCount})</NavLink>
        {user ? <button type="button" onClick={signOut}>Sign out</button> : <NavLink to="/signin">Sign in</NavLink>}
      </nav>
    </header>
  )
}

export default Header