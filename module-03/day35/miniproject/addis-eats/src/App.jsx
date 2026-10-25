import { Route, Routes } from 'react-router-dom'
import { Layout } from './ui/Layout.jsx'
import { PlaceholderPage } from './ui/PlaceholderPages.jsx'
import { HomePage } from './menu/HomePage.jsx'
import { MenuPage } from './menu/MenuPage.jsx'
import { DishPage } from './menu/DishPage.jsx'

function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="menu" element={<MenuPage />} />
      <Route path="menu/:id" element={<DishPage />} />
      <Route path="cart" element={<PlaceholderPage title="Basket" />} />
      <Route path="checkout" element={<PlaceholderPage title="Checkout" />} />
      <Route path="signin" element={<PlaceholderPage title="Sign in" />} />
      <Route path="*" element={<PlaceholderPage title="Page not found" />} />
    </Route>
  </Routes>
}

export default App
