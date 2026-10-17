import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
