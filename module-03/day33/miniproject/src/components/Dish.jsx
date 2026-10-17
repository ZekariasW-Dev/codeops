import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

Dish.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
}

function Dish({id, name, price, spicy, currency = 'ETB', onAdd}) {
  return (
    <div>
          <div className="menu-item">
            <h3><Link to={`/menu/${id}`}>{name}</Link></h3>
            <p>{price} {currency}</p>
            {spicy === true && <em>Spicy</em>}
            <button type="button" onClick={onAdd}>Add to order</button>
            </div>
    </div>
  )
}

export default Dish