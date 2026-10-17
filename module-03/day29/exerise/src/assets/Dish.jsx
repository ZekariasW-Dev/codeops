import propTypes from "prop-types";
import { useState } from "react";

Dish.propTypes = {
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  spicy: propTypes.bool,
  currency: propTypes.string,
};


function Dish({ name, price, spicy, currency = 'ETB', onAdd }) {
  const [count, setCount] = useState(0);
  return (
    <div>
        <h2>{name}</h2>
      <p>Price: {price} {currency}-{count}</p>
        <p> {spicy === true && <em>Spicy</em>}</p>
        <button onClick={() => {
          setCount(count + 1)
          onAdd()
        }}>Add</button>
    </div>
  )

}

export default Dish