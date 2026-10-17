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

export { areas }
export default validate
