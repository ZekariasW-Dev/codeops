import { useDishes } from '../hooks/useDishes.js'
import { DishCard } from './components/DishCard.jsx'

export function MenuPage() {
  const { dishes, status, error, retry } = useDishes()

  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">COOKED HERE, SHARED WITH YOU</p>
        <h1>Find your favorite.</h1>
        <p>Something comforting, something new, always made fresh.</p>
      </div>

      {status === 'loading' && <p className="page-status" role="status">Warming up the kitchen…</p>}
      {status === 'error' && (
        <div className="inline-error" role="alert">
          <p>{error}</p>
          <button className="text-button" type="button" onClick={retry}>Try again</button>
        </div>
      )}
      {status === 'success' && dishes.length > 0 && (
        <div className="dish-grid">
          {dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      )}
    </main>
  )
}
