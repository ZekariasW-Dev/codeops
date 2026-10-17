import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <main><p className="menu-status">Checking your account...</p></main>
  if (!user) {
    return <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}${location.hash}` }} />
  }

  return children
}

export default RequireAuth