import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Main from '../components/Main'
import Menu from '../components/Menu'
import CartPanel from '../components/CartPanel'
import OrderForm from '../components/OrderForm'
import Layout from './Layout'
import RequireAuth from './RequireAuth'
import { useAuth } from '../context/useAuth.js'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'

function ContentPage({ title, children }) {
  return <main><h2>{title}</h2>{children}</main>
}

function Checkout() {
  const [form, setForm] = useState({ name: '', phone: '', area: '' })
  const [submitted, setSubmitted] = useState(false)
  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setSubmitted(false)
  }
  return <main><h2>Checkout</h2><CartPanel /><OrderForm form={form} onChange={handleChange} onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }} />{submitted && <p className="order-confirmation">Order ready for {form.name}.</p>}</main>
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