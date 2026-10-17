
import Menu from './Menu'

function Main() {
  const menu =[
    { id: 1, name: "Doro Wat", price: "130" ,spicy: true, category: "spicy"},
    { id: 2, name: "Kitfo", price: "150" ,spicy: true, category: "spicy"},
    { id: 3, name: "Tibs", price: "120" ,spicy: false, category: "regular"},
    { id: 4, name: "Shiro", price: "100" ,spicy: false, category: "regular"},
    { id: 5, name: "Injera", price: "50" ,spicy: false, category: "regular"},
    { id: 6, name: "Gored Gored", price: "140" ,spicy: true, category: "spicy"},
    { id: 7, name: "Firfir", price: "110" ,spicy: false, category: "regular"},
    { id: 8, name: "Chechebsa", price: "90" ,spicy: false, category: "regular"},
    { id: 9, name: "Dulet", price: "120" ,spicy: true, category: "spicy"},
    { id: 10, name: "Beyaynetu", price: "200" ,spicy: false, category: "regular"},
  ]

  return (
    <main>
        <h2>Welcome to My Restaurant</h2>
        <p>Enjoy our delicious food!</p>
        <p>Our menu</p>
        <Menu dishes={menu} />
    </main>
  )
}

export default Main