import { memo } from 'react'
import Card from './Card'
import Dish from './Dish'

const DishList = memo(function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return <p>No dishes selected.</p>
  }

  return (
    <div className="dish-grid">
      {dishes.map(dish => (
        <Card key={dish.id}>
          <Dish {...dish} onAdd={onAdd} />
        </Card>
      ))}
    </div>
  )
})

export default DishList
