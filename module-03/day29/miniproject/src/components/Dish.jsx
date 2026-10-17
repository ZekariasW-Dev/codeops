import PropTypes from 'prop-types';

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

function Dish({name, price, spicy, currency = 'ETB', onAdd}) {
  return (
    <div>
          <div className="menu-item">
            <h3>{name}</h3>
            <p>{price} {currency}</p>
            {spicy === true && <em>Spicy</em>}
            <button type="button" onClick={onAdd}>Add to order</button>
            </div>
    </div>
  )
}

export default Dish