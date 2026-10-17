import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import Main from '../components/Main'
import Menu from '../components/Menu'
import CartPanel from '../components/CartPanel'
import OrderForm from '../components/OrderForm'
import validate from '../components/orderValidation'
import Layout from './Layout'
import RequireAuth from './RequireAuth'
import { useAuth } from '../context/useAuth.js'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import useCartStore from '../stores/cartStore'

function ContentPage({ title, children }) {
  return <main><h2>{title}</h2>{children}</main>
}

function Checkout() {
  const items = useCartStore(state => state.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const [form, setForm] = useState({ name: '', phone: '', area: '', notes: '' })
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [requestError, setRequestError] = useState('')
  const fieldRefs = useRef({})
  const submissionLock = useRef(false)
  const errors = validate(form)

  function setFieldRef(field, element) {
    fieldRefs.current[field] = element
  }

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setRequestError('')
  }

  function handleBlur(event) {
    setTouched(current => ({ ...current, [event.target.name]: true }))
  }

  function focusFirstInvalid(errorMap = errors) {
    const firstInvalidField = Object.keys(form).find(field => errorMap[field])
    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus()
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (submissionLock.current) {
      return
    }

    setTouched({ name: true, phone: true, area: true, notes: true })
    setRequestError('')

    if (Object.keys(errors).length > 0) {
      focusFirstInvalid()
      return
    }

    submissionLock.current = true
    setSubmitting(true)
    try {
      await new Promise((resolve, reject) => setTimeout(() => reject(new Error('TeleBirr payment service is unavailable.')), 700))
    } catch (error) {
      setRequestError(`${error.message} Your details were kept; please try again.`)
      fieldRefs.current.phone?.focus()
    } finally {
      submissionLock.current = false
      setSubmitting(false)
    }
  }

  return <main><h2>Checkout</h2><CartPanel /><OrderForm form={form} errors={errors} touched={touched} total={total} submitting={submitting} requestError={requestError} setFieldRef={setFieldRef} onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit} /></main>
}

function DishDetail() {
  const { id } = useParams()
  const { data, loading, error } = useFetch('/dishes.json')
  const dish = data?.find((item) => String(item.id) === id)
  if (loading) return <main><p className="menu-status">Loading dish...</p></main>
  if (error) return <main><p className="menu-status" role="alert">{error}</p></main>
  if (!dish) return <ContentPage title="Dish not found"><p>We could not find that dish.</p></ContentPage>
  return <ContentPage title={dish.name}><p>{dish.price} ETB</p><p>{dish.description || 'A delicious choice from our menu.'}</p></ContentPage>
}

function Login() {
  const { user, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  if (user) return <Navigate to={location.state?.from || '/'} replace />
  function handleSubmit(event) {
    event.preventDefault()
    login(name)
    navigate(location.state?.from || '/checkout', { replace: true })
  }
  return <main><h2>Sign in to checkout</h2><form className="order-form" onSubmit={handleSubmit}><label>Name<input value={name} onChange={(event) => setName(event.target.value)} required /></label><button type="submit">Continue</button></form></main>
}

function NotFound() {
  return <ContentPage title="Page not found"><p>That page does not exist.</p></ContentPage>
}

function AppRoutes() {
  return <Routes><Route element={<Layout />}><Route index element={<Main />} /><Route path="about" element={<ContentPage title="About us"><p>Fresh food, prepared with care.</p></ContentPage>} /><Route path="menu" element={<Menu />} /><Route path="menu/:id" element={<DishDetail />} /><Route path="contact" element={<ContentPage title="Contact"><p>Call us for help with your order.</p></ContentPage>} /><Route path="login" element={<Login />} /><Route path="cart" element={<Checkout />} /><Route path="checkout" element={<RequireAuth><Checkout /></RequireAuth>} /><Route path="not-found" element={<NotFound />} /><Route path="*" element={<NotFound />} /></Route></Routes>
}

export default AppRoutes