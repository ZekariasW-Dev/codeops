import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function SignInPage() {
  const [name, setName] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destination = location.state?.from?.pathname ?? '/'

  function handleSubmit(event) {
    event.preventDefault()
    signIn(name.trim())
    navigate(destination, { replace: true })
  }

  return (
    <form className="route-panel auth-form" onSubmit={handleSubmit}>
      <h2>Sign in to continue</h2>
      <p>Use any name for this local demo account.</p>
      <label>Name <input value={name} onChange={event => setName(event.target.value)} required autoFocus /></label>
      <button type="submit">Sign in</button>
    </form>
  )
}

export default SignInPage