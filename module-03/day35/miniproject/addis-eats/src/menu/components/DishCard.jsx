import { Link } from 'react-router-dom'
import { useCart } from '../../cart/useCart.js'
import { formatBirr } from '../../ui/formatBirr.js'

export function DishCard({ dish }) {
  const { add } = useCart()

  return (
    <article className="dish-card">
      <Link className="dish-art" to={`/menu/${dish.id}`} aria-label={`View ${dish.name}`}>
        <span aria-hidden="true">{dish.emoji}</span>
        <span className="dish-tag">{dish.tag}</span>
      </Link>
      <div className="dish-card-body">
        <div className="dish-card-heading">
          <div>
            <p className="dish-category">{dish.category}</p>
            <h3><Link to={`/menu/${dish.id}`}>{dish.name}</Link></h3>
          </div>
          <strong>{formatBirr(dish.price)}</strong>
        </div>
        <p className="dish-description">{dish.description}</p>
        <button
          className="add-button"
          type="button"
          onClick={() => add(dish)}
          aria-label={`Add ${dish.name} to basket`}
        >
          <span aria-hidden="true">+</span> Add to basket
        </button>
      </div>
    </article>
  )
}
