import PropTypes from 'prop-types'
import { areas } from './orderValidation'

function OrderForm({ form, errors, touched, total, submitting, requestError, setFieldRef, onChange, onBlur, onSubmit }) {
  function errorId(field) {
    return `order-${field}-error`
  }

  return (
    <form className="order-form" onSubmit={onSubmit}>
      <h3>Delivery details</h3>
      <label htmlFor="order-name">Name</label>
      <input
        id="order-name"
        ref={element => setFieldRef('name', element)}
        name="name"
        value={form.name}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(touched.name && errors.name)}
        aria-describedby={touched.name && errors.name ? errorId('name') : undefined}
        placeholder="Your name"
      />
      {touched.name && errors.name && <span id={errorId('name')} className="form-error" role="alert">{errors.name}</span>}

      <label htmlFor="order-phone">TeleBirr phone number</label>
      <input
        id="order-phone"
        ref={element => setFieldRef('phone', element)}
        type="tel"
        name="phone"
        value={form.phone}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(touched.phone && errors.phone)}
        aria-describedby={touched.phone && errors.phone ? errorId('phone') : undefined}
        placeholder="09... or +2519..."
      />
      {touched.phone && errors.phone && <span id={errorId('phone')} className="form-error" role="alert">{errors.phone}</span>}

      <label htmlFor="order-area">Delivery area</label>
      <select
        id="order-area"
        ref={element => setFieldRef('area', element)}
        name="area"
        value={form.area}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(touched.area && errors.area)}
        aria-describedby={touched.area && errors.area ? errorId('area') : undefined}
      >
        <option value="">Choose an area</option>
        {areas.map(area => <option key={area} value={area}>{area}</option>)}
      </select>
      {touched.area && errors.area && <span id={errorId('area')} className="form-error" role="alert">{errors.area}</span>}

      <label htmlFor="order-notes">Notes (optional)</label>
      <textarea
        id="order-notes"
        ref={element => setFieldRef('notes', element)}
        name="notes"
        value={form.notes}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid="false"
        aria-describedby="order-notes-help"
        placeholder="Add delivery notes"
        rows="3"
      />
      <span id="order-notes-help" className="field-help">Optional delivery instructions.</span>

      {requestError && <p className="request-error" role="alert">{requestError}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? `Submitting ${total} ETB...` : `Pay ${total} ETB with TeleBirr`}
      </button>
    </form>
  )
}

OrderForm.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  total: PropTypes.number.isRequired,
  submitting: PropTypes.bool.isRequired,
  requestError: PropTypes.string.isRequired,
  setFieldRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default OrderForm
