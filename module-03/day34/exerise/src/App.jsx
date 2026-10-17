
import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import MenuPage from './pages/MenuPage'
import MenuDetailPage from './pages/MenuDetailPage'
import CartPage from './pages/CartPage'
import SignInPage from './pages/SignInPage'
import NotFound from './pages/NotFound'
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const ReceiptPage = lazy(() => import('./pages/ReceiptPage'))

function RouteSkeleton() {
  return <div className="route-skeleton" role="status" aria-label="Loading page"><span /><span /><span /></div>
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={<RouteSkeleton />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<MenuPage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="menu/:id" element={<MenuDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="signin" element={<SignInPage />} />
                <Route path="receipt" element={<ReceiptPage />} />
                <Route element={<RequireAuth />}>
                  <Route path="checkout" element={<CheckoutPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
