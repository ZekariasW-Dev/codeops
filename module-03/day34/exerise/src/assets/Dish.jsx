import propTypes from "prop-types";
import { useState } from "react";
import { Link } from 'react-router-dom'
import { useTheme } from '../context/useTheme'

Dish.propTypes = {
  name: propTypes.string.isRequired,
  id: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  price: propTypes.number.isRequired,
  spicy: propTypes.bool,
  currency: propTypes.string,
  shouldFail: propTypes.bool,
  onPreview: propTypes.func.isRequired,
};


function Dish({ id, name, price, spicy, currency = 'ETB', onAdd, shouldFail, onPreview }) {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useTheme()

  if (shouldFail) {
    throw new Error(`${name} could not be rendered (demo failure).`)
  }

  function handleAdd() {
    setCount(currentCount => currentCount + 1)
    onAdd({ id: name, name, price })
  }

  return (
    <div className={`dish ${theme}`}>
        <Link className="dish-link" to={`/menu/${id}`}>
          <h2>{name}</h2>
          <p>Price: {price} {currency}-{count}</p>
          <p> {spicy === true && <em>Spicy</em>}</p>
        </Link>
        <div className="button-row">
          <button type="button" onClick={handleAdd}>Add</button>
          <button type="button" onClick={() => onPreview({ id, name, price, spicy, currency })}>Quick view</button>
          <button type="button" onClick={toggleTheme}>Use {theme === 'light' ? 'dark' : 'light'} theme</button>
        </div>
    </div>
  )

}

export default Dish