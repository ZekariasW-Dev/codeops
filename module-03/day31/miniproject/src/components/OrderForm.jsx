import PropTypes from 'prop-types'

const teleBirrPattern = /^(?:\+251|0)9\d{8}$/

function OrderForm({ form, onChange, onSubmit }) {
  const validPhone = teleBirrPattern.test(form.phone)
  const canSubmit = validPhone && form.name.trim() !== '' && form.area.trim() !== ''

  return (
    <form className="order-form" onSubmit={onSubmit}>
      <h3>Delivery details</h3>
      <label>
        Name
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
          required
        />
      </label>
      <label>
        TeleBirr phone number
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="09... or +2519..."
          aria-invalid={form.phone !== '' && !validPhone}
          required
        />
        {form.phone !== '' && !validPhone && (
          <span className="form-error">Use 09XXXXXXXX or +2519XXXXXXXX.</span>
        )}
      </label>
      <label>
        Area
        <input
          name="area"
          value={form.area}
          onChange={onChange}
          placeholder="Delivery area"
          required
        />
      </label>
      <button type="submit" disabled={!canSubmit}>Submit order</button>
    </form>
  )
}

OrderForm.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default OrderForm
