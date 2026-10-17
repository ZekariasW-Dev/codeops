import { useEffect, useMemo, useState } from 'react'
import AuthContext from './AuthContext.js'

function getStoredUser() {
  const savedUser = window.localStorage.getItem('restaurant-user')
  return savedUser ? JSON.parse(savedUser) : null
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 250)
    return () => window.clearTimeout(timer)
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    login: (name) => {
      const nextUser = { name: name.trim() || 'Guest' }
      window.localStorage.setItem('restaurant-user', JSON.stringify(nextUser))
      setUser(nextUser)
    },
    logout: () => {
      window.localStorage.removeItem('restaurant-user')
      setUser(null)
    },
  }), [loading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider