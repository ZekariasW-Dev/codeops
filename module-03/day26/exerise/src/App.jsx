import { useState } from 'react'
import './App.css'
import Dish from './assets/Dish'
import Header from './assets/Header'

function App() {
    const dish =[
      { id: 1, name: "Injera", price: 50 },
      { id: 2, name: "Doro Wat", price: 80 },
      { id: 3, name: "Besu", price: 60 }
    ]
  return (
    <>
    <Header />
      {dish.map((item) => (
        <Dish key={item.id} name={item.name} price={item.price} />
      ))}
    </>
  )
}

export default App
