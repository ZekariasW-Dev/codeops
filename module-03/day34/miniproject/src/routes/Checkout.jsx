import { useRef, useState } from 'react'
import CartPanel from '../components/CartPanel'
import ErrorBoundary from '../components/ErrorBoundary'
import OrderForm from '../components/OrderForm'
import validate from '../components/orderValidation'
import useCartStore from '../stores/cartStore'

function CartFallback({ reset }) {
  return <section className="cart-panel error-state" role="alert"><h2>Cart unavailable</h2><p>We could not render your cart, but the rest of checkout is still available.</p><button type="button" onClick={reset}>Try again</button></section>
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
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
    setRequestError('')
  }

  function handleBlur(event) {
    setTouched(current => ({ ...current, [event.target.name]: true }))
  }

  function focusFirstInvalid(errorMap = errors) {
    const firstInvalidField = Object.keys(form).find(field => errorMap[field])
    if (firstInvalidField) fieldRefs.current[firstInvalidField]?.focus()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (submissionLock.current) return
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

  return <main><h2>Checkout</h2><ErrorBoundary fallback={CartFallback}><CartPanel /></ErrorBoundary><OrderForm form={form} errors={errors} touched={touched} total={total} submitting={submitting} requestError={requestError} setFieldRef={setFieldRef} onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit} /></main>
}

export default Checkout
