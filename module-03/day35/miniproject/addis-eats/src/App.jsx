import { Route, Routes } from 'react-router-dom'
import { Layout } from './ui/Layout.jsx'
import { PlaceholderPage } from './ui/PlaceholderPages.jsx'

function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route index element={<PlaceholderPage title="Home" />} />
      <Route path="menu" element={<PlaceholderPage title="Menu" />} />
      <Route path="menu/:id" element={<PlaceholderPage title="Dish details" />} />
      <Route path="cart" element={<PlaceholderPage title="Basket" />} />
      <Route path="checkout" element={<PlaceholderPage title="Checkout" />} />
      <Route path="signin" element={<PlaceholderPage title="Sign in" />} />
      <Route path="*" element={<PlaceholderPage title="Page not found" />} />
    </Route>
  </Routes>
}

export default App
