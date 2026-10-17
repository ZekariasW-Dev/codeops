import React from 'react'

function Dish({name, price}) {
  return (
    <div>
          <div className="menu-item">
            <h3>{name}</h3>
            <p>{price} ETB</p>
            </div>
    </div>
  )
}

export default Dish