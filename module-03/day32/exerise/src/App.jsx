
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import MenuPage from './pages/MenuPage'
import MenuDetailPage from './pages/MenuDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import SignInPage from './pages/SignInPage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<MenuPage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="menu/:id" element={<MenuDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="signin" element={<SignInPage />} />
              <Route element={<RequireAuth />}>
                <Route path="checkout" element={<CheckoutPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
