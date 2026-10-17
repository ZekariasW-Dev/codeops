import propTypes from "prop-types";

Dish.propTypes = {
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  spicy: propTypes.bool,
  currency: propTypes.string
};

function Dish({ name, price, spicy, currency = 'ETB' }) {
  return (
    <div>
        <h2>{name}</h2>
      <p>Price: {price} {currency}</p>
        <p> {spicy === true && <em>Spicy</em>}</p>
    </div>
  )

}

export default Dish