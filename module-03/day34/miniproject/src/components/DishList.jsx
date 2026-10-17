import PropTypes from 'prop-types'
import Card from './Card'
import Dish from './Dish'

function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return <p className="empty-state">No dishes found in this category.</p>
  }

  return (
    <div className="menu-container">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} onAdd={onAdd} />
        </Card>
      ))}
    </div>
  )
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default DishList
