import PropTypes from "prop-types";
import { useState } from 'react'
import CategoryBar from './CategoryBar'
import DishList from './DishList'
import OrderForm from './OrderForm'

function Menu({ dishes }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [orderTotal, setOrderTotal] = useState(0)
  const [form, setForm] = useState({ name: '', phone: '', area: '' })
  const [submitted, setSubmitted] = useState(false)
  const shown = selectedCategory === 'all'
    ? dishes
    : dishes.filter((dish) => dish.category === selectedCategory)

  function handleAdd(dish) {
    setOrderTotal((total) => total + Number(dish.price))
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />
      <DishList dishes={shown} onAdd={handleAdd} />
      <p className="order-total">Order total: {orderTotal} ETB</p>
      <OrderForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
      {submitted && (
        <section className="order-confirmation" aria-live="polite">
          <h3>Order ready</h3>
          <p>{form.name} - {form.phone} - {form.area}</p>
          <p>Total: {orderTotal} ETB</p>
        </section>
      )}
    </>
  )
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Menu;