import { useSearchParams } from 'react-router-dom'
import { useDishes } from '../hooks/useDishes.js'
import { DishCard } from './components/DishCard.jsx'

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Drinks']

export function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || 'All'
  const { dishes, status, error, retry } = useDishes()
  const filteredDishes = selectedCategory === 'All'
    ? dishes
    : dishes.filter((dish) => dish.category === selectedCategory)

  function selectCategory(category) {
    const next = new URLSearchParams(searchParams)
    if (category === 'All') next.delete('category')
    else next.set('category', category)
    setSearchParams(next)
  }

  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">COOKED HERE, SHARED WITH YOU</p>
        <h1>Find your favorite.</h1>
        <p>Something comforting, something new, always made fresh.</p>
      </div>
      <div className="category-list" aria-label="Filter dishes by category">
        {categories.map((category) => (
          <button
            className={`category-chip${selectedCategory === category ? ' is-selected' : ''}`}
            key={category}
            type="button"
            aria-pressed={selectedCategory === category}
            onClick={() => selectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {status === 'loading' && <p className="page-status" role="status">Warming up the kitchen…</p>}
      {status === 'error' && (
        <div className="inline-error" role="alert">
          <p>{error}</p>
          <button className="text-button" type="button" onClick={retry}>Try again</button>
        </div>
      )}
      {status === 'success' && filteredDishes.length > 0 && (
        <div className="dish-grid">
          {filteredDishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      )}
      {status === 'success' && filteredDishes.length === 0 && (
        <section className="empty-state">
          <span className="empty-icon" aria-hidden="true">🍽️</span>
          <h2>Nothing on this plate just yet.</h2>
          <p>Try another category to see what’s cooking.</p>
          <button className="button button-secondary" type="button" onClick={() => selectCategory('All')}>
            Show everything
          </button>
        </section>
      )}
    </main>
  )
}
