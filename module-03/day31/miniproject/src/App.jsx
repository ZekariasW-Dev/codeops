import './App.css'
import CartProvider from './context/CartContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
