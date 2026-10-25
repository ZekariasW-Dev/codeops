import { useMemo, useState } from 'react'
import { AuthContext } from './auth-context.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({
    user,
    signIn: (email) => setUser({ email }),
    signOut: () => setUser(null),
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
