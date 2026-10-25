import { Link, useParams } from 'react-router-dom'
import { useDishes } from '../hooks/useDishes.js'
import { formatBirr } from '../ui/formatBirr.js'

export function DishPage() {
  const { id } = useParams()
  const { dishes, status, error, retry } = useDishes()
  const dish = dishes.find((item) => item.id === id)

  if (status === 'loading') return <p className="page-status page-shell" role="status">Finding that favorite…</p>
  if (status === 'error') {
    return (
      <main className="page-shell inline-error" role="alert">
        <p>{error}</p>
        <button className="text-button" type="button" onClick={retry}>Try again</button>
      </main>
    )
  }
  if (!dish) {
    return (
      <main className="page-shell error-page">
        <p className="eyebrow">DISH NOT FOUND</p>
        <h1>That dish isn’t on today’s menu.</h1>
        <p>It may have sold out or moved to another day.</p>
        <Link className="button button-primary" to="/menu">Back to the menu</Link>
      </main>
    )
  }

  return (
    <main className="page-shell dish-detail">
      <Link className="back-link" to="/menu">← Back to the menu</Link>
      <div className="detail-layout">
        <div className="detail-art" aria-hidden="true">{dish.emoji}</div>
        <div className="detail-copy">
          <p className="eyebrow">{dish.category.toUpperCase()} · {dish.tag.toUpperCase()}</p>
          <h1>{dish.name}</h1>
          <p>{dish.description}</p>
          <p className="detail-price">{formatBirr(dish.price)}</p>
          <Link className="button button-primary" to="/menu">Back to menu</Link>
        </div>
      </div>
    </main>
  )
}
