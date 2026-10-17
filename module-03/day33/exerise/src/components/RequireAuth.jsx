import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function RequireAuth() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default RequireAuth