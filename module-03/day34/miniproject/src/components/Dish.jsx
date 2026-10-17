import PropTypes from 'prop-types'
import { memo, useState } from 'react'
import DishModal from './DishModal'

Dish.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
  description: PropTypes.string,
}

function Dish({id, name, price, spicy, currency = 'ETB', onAdd, description}) {
  const [shouldThrow, setShouldThrow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  if (shouldThrow) throw new Error(`Dish ${name} failed deliberately`)
  return (
    <div>
          <div className="menu-item">
            <h3><button className="dish-link" type="button" onClick={() => setIsOpen(true)}>{name}</button></h3>
            <p>{price} {currency}</p>
            {spicy === true && <em>Spicy</em>}
            <button type="button" onClick={() => onAdd({ id, name, price, spicy, currency, description })}>Add to order</button>
            <button type="button" className="error-test-button" onClick={() => setShouldThrow(true)}>Simulate dish error</button>
            </div>
            {isOpen && <DishModal dish={{ id, name, price, spicy, currency, description }} onClose={() => setIsOpen(false)} />}
    </div>
  )
}

export default memo(Dish)