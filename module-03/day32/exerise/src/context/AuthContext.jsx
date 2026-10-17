import { useState } from 'react'
import { AuthContext } from './auth-context'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function signIn(name) {
    setUser({ name })
  }

  function signOut() {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

export { AuthProvider }