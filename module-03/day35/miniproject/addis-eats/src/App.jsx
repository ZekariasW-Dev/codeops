import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CartPage } from './cart/CartPage.jsx'
import { Layout } from './ui/Layout.jsx'
import { ErrorBoundary } from './ui/ErrorBoundary.jsx'
import { NotFoundPage } from './ui/NotFoundPage.jsx'
import { RequireAuth } from './auth/RequireAuth.jsx'
import { SignInPage } from './auth/SignInPage.jsx'
import { HomePage } from './menu/HomePage.jsx'
import { MenuPage } from './menu/MenuPage.jsx'
import { DishPage } from './menu/DishPage.jsx'

const CheckoutPage = lazy(() =>
  import('./checkout/CheckoutPage.jsx').then((module) => ({
    default: module.CheckoutPage,
  })),
)

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="menu/:id" element={<DishPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route
            path="checkout"
            element={
              <RequireAuth>
                <Suspense fallback={<p className="page-status">Loading checkout…</p>}>
                  <CheckoutPage />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route path="signin" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App
