import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart/useCart.js'
import { formatBirr } from '../ui/formatBirr.js'

const initialValues = { name: '', phone: '', address: '' }

export function CheckoutPage() {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const { items, total, clear } = useCart()

  function getError(name, value) {
    if (!value.trim()) return 'This field is required.'
    if (name === 'phone' && !/^[+()\d\s-]{8,}$/.test(value.trim())) {
      return 'Enter a phone number with at least 8 digits or characters.'
    }
    if (name === 'name' && value.trim().length < 2) {
      return 'Enter your name.'
    }
    return ''
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function submit(event) {
    event.preventDefault()
    setTouched({ name: true, phone: true, address: true })
    const hasErrors = Object.keys(initialValues).some((name) =>
      getError(name, values[name]),
    )
    if (hasErrors || items.length === 0) return
    setSubmitted(true)
    clear()
  }

  if (submitted) {
    return (
      <main className="page-shell success-state" role="status">
        <span className="success-mark" aria-hidden="true">✓</span>
        <p className="eyebrow">ORDER RECEIVED</p>
        <h1>Thank you, {values.name}.</h1>
        <p>We’ll deliver your order to {values.address}. Our kitchen is on it!</p>
        <Link className="button button-primary" to="/menu">Back to the menu</Link>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">ALMOST THERE</p>
        <h1>Let’s get it to you.</h1>
        <p>A few details for a smooth delivery.</p>
      </div>

      {items.length === 0 ? (
        <section className="empty-state">
          <h2>Your basket is empty</h2>
          <p>Add a dish before checking out.</p>
          <Link className="button button-primary" to="/menu">Explore the menu</Link>
        </section>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={submit} noValidate>
            <div className="form-field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                onBlur={() => setTouched((current) => ({ ...current, name: true }))}
                aria-invalid={Boolean(touched.name && getError('name', values.name))}
                aria-describedby={touched.name && getError('name', values.name) ? 'name-error' : undefined}
                required
              />
              {touched.name && getError('name', values.name) && (
                <span className="field-error" id="name-error">{getError('name', values.name)}</span>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={values.phone}
                onChange={handleChange}
                onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
                aria-invalid={Boolean(touched.phone && getError('phone', values.phone))}
                aria-describedby={touched.phone && getError('phone', values.phone) ? 'phone-error' : undefined}
                required
              />
              {touched.phone && getError('phone', values.phone) && (
                <span className="field-error" id="phone-error">{getError('phone', values.phone)}</span>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="address">Delivery address</label>
              <textarea
                id="address"
                name="address"
                autoComplete="street-address"
                rows="3"
                value={values.address}
                onChange={handleChange}
                onBlur={() => setTouched((current) => ({ ...current, address: true }))}
                aria-invalid={Boolean(touched.address && getError('address', values.address))}
                aria-describedby={touched.address && getError('address', values.address) ? 'address-error' : undefined}
                required
              />
              {touched.address && getError('address', values.address) && (
                <span className="field-error" id="address-error">{getError('address', values.address)}</span>
              )}
            </div>
            <button className="button button-primary button-wide" type="submit">
              Place order · {formatBirr(total)}
            </button>
          </form>
          <aside className="order-summary">
            <h2>Your order</h2>
            {items.map((item) => (
              <div className="summary-row" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <strong>{formatBirr(item.price * item.quantity)}</strong>
              </div>
            ))}
            <div className="summary-total"><span>Total</span><strong>{formatBirr(total)}</strong></div>
            <Link className="summary-back" to="/cart">Edit your basket</Link>
          </aside>
        </div>
      )}
    </main>
  )
}
