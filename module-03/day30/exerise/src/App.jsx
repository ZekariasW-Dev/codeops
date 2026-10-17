
import './App.css'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './assets/Header'
import Menu from './assets/Menu'
import MenuStatus from './assets/MenuStatus'
import CartPanel from './components/CartPanel'
import CartReducerChecks from './components/CartReducerChecks'
import CounterComparison from './components/CounterComparison'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Header />
        <main>
          <MenuStatus />
          <Menu />
          <CartPanel />
          <CartReducerChecks />
          <CounterComparison />
        </main>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
