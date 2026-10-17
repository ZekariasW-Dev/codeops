import { Link, useParams } from 'react-router-dom'
import useCartStore from '../stores/cartStore'
import useFetch from '../hooks/useFetch'

function MenuDetailPage() {
  const { id } = useParams()
  const { data, loading, error } = useFetch('/dishes.json')
  const addItem = useCartStore(state => state.addItem)
  const dish = data?.find(item => String(item.id) === id)

  if (loading) return <p className="status-panel">Loading dish...</p>
  if (error) return <p className="status-panel" role="alert">{error}</p>
  if (!dish) return <section className="route-panel"><h2>Dish not found</h2><Link to="/">Back to menu</Link></section>

  return (
    <section className="route-panel dish-detail">
      <Link to="/">Back to menu</Link>
      <p className="eyebrow">Menu item</p>
      <h2>{dish.name}</h2>
      <p>{dish.spicy ? 'Spicy favorite' : 'A classic choice'} · {dish.category}</p>
      <strong>{dish.price} ETB</strong>
      <button type="button" onClick={() => addItem(dish)}>Add to cart</button>
    </section>
  )
}

export default MenuDetailPage