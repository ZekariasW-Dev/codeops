import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth.js'

export function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({})
  const { signIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const emailError = email && !/^\S+@\S+\.\S+$/.test(email)
    ? 'Enter a valid email address.'
    : ''
  const passwordError = password && password.length < 6
    ? 'Use at least 6 characters.'
    : ''

  function submit(event) {
    event.preventDefault()
    setTouched({ email: true, password: true })
    if (!email || emailError || password.length < 6) return

    signIn(email)
    const destination = location.state?.from?.pathname || '/checkout'
    navigate(destination, { replace: true })
  }

  return (
    <main className="page-shell form-page">
      <div className="page-heading">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Sign in to continue.</h1>
        <p>This demo accepts any valid email and a password of six or more characters.</p>
      </div>
      <form className="checkout-form" onSubmit={submit} noValidate>
        <label htmlFor="signin-email">Email address</label>
        <input
          id="signin-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setTouched((current) => ({ ...current, email: true }))}
          aria-invalid={Boolean(touched.email && (!email || emailError))}
          aria-describedby={touched.email ? 'signin-email-error' : undefined}
          required
        />
        {touched.email && (!email || emailError) && (
          <span className="field-error" id="signin-email-error">{emailError || 'Email is required.'}</span>
        )}
        <label htmlFor="signin-password">Password</label>
        <input
          id="signin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={() => setTouched((current) => ({ ...current, password: true }))}
          aria-invalid={Boolean(touched.password && (!password || passwordError))}
          aria-describedby={touched.password ? 'signin-password-error' : undefined}
          required
        />
        {touched.password && (!password || passwordError) && (
          <span className="field-error" id="signin-password-error">{passwordError || 'Password is required.'}</span>
        )}
        <button className="button button-primary button-wide" type="submit">Sign in</button>
        <p className="form-footnote">Your basket is waiting. <Link to="/cart">Review your order</Link></p>
      </form>
    </main>
  )
}
