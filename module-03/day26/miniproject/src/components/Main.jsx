import React from 'react'
import Dish from './Dish'

function Main() {
  const menu =[
    { id: 1, name: "Doro Wat", price: "130" },
    { id: 2, name: "Kitfo", price: "150" },
    { id: 3, name: "Tibs", price: "120" },
    { id: 4, name: "Shiro", price: "100" },
    { id: 5, name: "Injera", price: "50" },
    { id: 6, name: "Gored Gored", price: "140" },
    { id: 7, name: "Firfir", price: "110" },
    { id: 8, name: "Chechebsa", price: "90" },
  ]
  return (
    <div>
        <h2>Welcome to My Restaurant</h2>
        <p>Enjoy our delicious food!</p>
        <p>Our menu</p>
        <div className="menu-container">
        {menu.map((item) => (
          <Dish key={item.id} name={item.name} price={item.price} />
        ))} 
        </div>
    </div>
  )
}

export default Main