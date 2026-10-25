import { Link } from 'react-router-dom'
import { useDishes } from '../hooks/useDishes.js'
import { DishCard } from './components/DishCard.jsx'

export function HomePage() {
  const { dishes, status, error, retry } = useDishes()
  const specials = dishes.slice(0, 3)

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">FRESH FROM ADDIS · DELIVERED WITH CARE</p>
          <h1>A little taste of<br /><span>home.</span></h1>
          <p className="hero-copy">
            From slow-cooked favorites to fresh morning buna, the flavors you love are just around the corner.
          </p>
          <div className="button-row">
            <Link className="button button-primary" to="/menu">Explore the menu <span aria-hidden="true">↗</span></Link>
            <span className="delivery-note"><span aria-hidden="true">✳</span> Made fresh, every day</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Traditional Ethiopian meal" role="img">
          <div className="plate">
            <div className="plate-center"><span>🍲</span></div>
          </div>
          <span className="art-note note-top">Made with love</span>
          <span className="art-note note-bottom">ምግብ በፍቅር</span>
          <span className="art-sparkle sparkle-one" aria-hidden="true">✳</span>
          <span className="art-sparkle sparkle-two" aria-hidden="true">✳</span>
        </div>
      </section>

      <section className="specials-section page-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A GOOD PLACE TO START</p>
            <h2>Today’s specials</h2>
          </div>
          <Link className="section-link" to="/menu">See the full menu <span aria-hidden="true">→</span></Link>
        </div>
        {status === 'loading' && <p className="page-status" role="status">Warming up the kitchen…</p>}
        {status === 'error' && (
          <div className="inline-error" role="alert">
            <p>{error}</p>
            <button className="text-button" type="button" onClick={retry}>Try again</button>
          </div>
        )}
        {status === 'success' && (
          <div className="dish-grid">
            {specials.map((dish) => <DishCard key={dish.id} dish={dish} />)}
          </div>
        )}
      </section>
      <section className="home-callout">
        <div>
          <p className="eyebrow">A TABLE FOR EVERYONE</p>
          <h2>Good food tastes better shared.</h2>
        </div>
        <Link className="button button-light" to="/menu">Find your favorite</Link>
      </section>
    </main>
  )
}
