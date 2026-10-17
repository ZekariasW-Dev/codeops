import { useState } from 'react'
import { Link } from 'react-router-dom'

function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', area: 'Bole' })
  const validPhone = /^(?:\+251|0)9\d{8}$/.test(form.phone)

  function handleChange(event) {
    const { name, value } = event.target
    setForm(currentForm => ({ ...currentForm, [name]: value }))
    setSubmitted(false)
    setDone(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section>
      <form className="delivery-form" onSubmit={handleSubmit}>
        <Link to="/cart">Back to cart</Link>
        <h2>Delivery details</h2>
        <label>Name <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required /></label>
        <label>Phone
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="09..." required />
          {form.phone && !validPhone && <span className="err">Use 09... or +2519...</span>}
        </label>
        <label>Area <input name="area" value={form.area} onChange={handleChange} placeholder="Delivery area" required /></label>
        <button type="submit" disabled={!validPhone}>Pay with TeleBirr</button>
      </form>
      {done && <p className="delivery-done">Done</p>}
      {submitted && (
        <section className="delivery-confirmation" aria-live="polite">
          <h2>Review your delivery</h2>
          <p>{form.name} - {form.phone} - {form.area}</p>
          <button type="button" onClick={() => {
            setForm({ name: '', phone: '', area: 'Bole' })
            setSubmitted(false)
            setDone(true)
          }}>Confirm</button>
        </section>
      )}
    </section>
  )
}

export default CheckoutPage