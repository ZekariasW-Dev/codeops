import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../stores/cartStore'

const initialForm = { name: '', phone: '', area: 'Bole', notes: '' }
const areas = ['Bole', 'Kazanchis', 'Megenagna', 'Piassa']

function validate(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Enter your name.'
  }

  if (!/^(?:\+251|0)9\d{8}$/.test(form.phone)) {
    errors.phone = 'Use a TeleBirr number like 0912345678 or +251912345678.'
  }

  if (!areas.includes(form.area)) {
    errors.area = 'Choose a delivery area.'
  }

  return errors
}

function CheckoutPage() {
  const items = useCartStore(state => state.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [requestError, setRequestError] = useState('')
  const fieldRefs = useRef({})
  const errors = validate(form)

  function handleChange(event) {
    const { name, value } = event.target
    setForm(currentForm => ({ ...currentForm, [name]: value }))
    setRequestError('')
  }

  function handleBlur(event) {
    const { name } = event.target
    setTouched(currentTouched => ({ ...currentTouched, [name]: true }))
  }

  function focusFirstInvalid(errorMap = errors) {
    const firstInvalidField = Object.keys(form).find(field => errorMap[field])
    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus()
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const visitedFields = { name: true, phone: true, area: true, notes: true }
    setTouched(visitedFields)
    setRequestError('')

    if (Object.keys(errors).length > 0) {
      focusFirstInvalid()
      return
    }

    setSubmitting(true)
    try {
      await new Promise((resolve, reject) => setTimeout(() => reject(new Error('TeleBirr payment service is unavailable.')), 700))
    } catch (error) {
      setRequestError(`${error.message} Your details were kept; please try again.`)
      fieldRefs.current.phone?.focus()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section>
      <form className="delivery-form" onSubmit={handleSubmit}>
        <Link to="/cart">Back to cart</Link>
        <h2>Delivery details</h2>
        <label htmlFor="checkout-name">Name</label>
        <input
          id="checkout-name"
          ref={element => { fieldRefs.current.name = element }}
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.name && errors.name)}
          aria-describedby={touched.name && errors.name ? 'checkout-name-error' : undefined}
          placeholder="Your name"
        />
        {touched.name && errors.name && <span id="checkout-name-error" className="err" role="alert">{errors.name}</span>}

        <label htmlFor="checkout-phone">TeleBirr phone</label>
        <input
          id="checkout-phone"
          ref={element => { fieldRefs.current.phone = element }}
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.phone && errors.phone)}
          aria-describedby={touched.phone && errors.phone ? 'checkout-phone-error' : undefined}
          placeholder="09..."
        />
        {touched.phone && errors.phone && <span id="checkout-phone-error" className="err" role="alert">{errors.phone}</span>}

        <label htmlFor="checkout-area">Delivery area</label>
        <select
          id="checkout-area"
          ref={element => { fieldRefs.current.area = element }}
          name="area"
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.area && errors.area)}
          aria-describedby={touched.area && errors.area ? 'checkout-area-error' : undefined}
        >
          {areas.map(area => <option key={area} value={area}>{area}</option>)}
        </select>
        {touched.area && errors.area && <span id="checkout-area-error" className="err" role="alert">{errors.area}</span>}

        <label htmlFor="checkout-notes">Notes (optional)</label>
        <textarea
          id="checkout-notes"
          ref={element => { fieldRefs.current.notes = element }}
          name="notes"
          value={form.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid="false"
          aria-describedby="checkout-notes-help"
          placeholder="Add delivery notes"
          rows="3"
        />
        <span id="checkout-notes-help" className="field-help">Optional delivery instructions.</span>

        {requestError && <p className="request-error" role="alert">{requestError}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? `Submitting ${total} ETB...` : `Pay ${total} ETB with TeleBirr`}
        </button>
      </form>
    </section>
  )
}

export { validate }
export default CheckoutPage