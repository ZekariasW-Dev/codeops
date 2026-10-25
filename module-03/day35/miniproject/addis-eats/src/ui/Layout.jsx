import { Link, NavLink, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Addis Eats home">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>Addis<span className="brand-accent">Eats</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/cart">Basket</NavLink>
          <NavLink className="nav-signin" to="/signin">Sign in</NavLink>
        </nav>
      </header>
      <div id="main-content">
        <Outlet />
      </div>
      <footer className="site-footer">
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>Addis<span className="brand-accent">Eats</span></span>
        </Link>
        <p>Good food, close to home. Made with care in Addis Ababa.</p>
        <span>© {new Date().getFullYear()} Addis Eats</span>
      </footer>
    </div>
  )
}
