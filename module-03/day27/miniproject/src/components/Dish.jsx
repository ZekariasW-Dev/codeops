import PropTypes from 'prop-types';

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string
};

function Dish({name, price, spicy, currency = 'ETB'}) {
  return (
    <div>
          <div className="menu-item">
            <h3>{name}</h3>
            <p>{price} {currency}</p>
            {spicy === true && <em>Spicy</em>}
            </div>
    </div>
  )
}

export default Dish