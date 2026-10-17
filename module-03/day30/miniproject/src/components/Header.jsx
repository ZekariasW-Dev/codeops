
import useCart from '../context/useCart'

function Header() {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="site-header">
        <div className="brand-row">
          <h1>My Restaurant Menu</h1>
          <a className="cart-badge" href="#cart" aria-label={`${itemCount} items in cart`}>
            Cart <span>{itemCount}</span>
          </a>
        </div>
        <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/menu">Menu</a>
                <a href="/contact">Contact</a>
        </nav>
    </header>
  )
}

export default Header