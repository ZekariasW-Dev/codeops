import { useCallback, useEffect, useRef, useState } from 'react'
import useCart from '../context/useCart'
import useFetch from '../hooks/useFetch'
import CategoryBar from './CategoryBar'
import CartPanel from './CartPanel'
import DishList from './DishList'
import OrderForm from './OrderForm'

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', area: '' })
  const [submitted, setSubmitted] = useState(false)
  const searchInputRef = useRef(null)
  const { data, loading, error } = useFetch(`/dishes.json?category=${selectedCategory}`)
  const { dispatch, total } = useCart()
  const dishes = data ?? []

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const shown = dishes.filter((dish) => {
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory
    const matchesSearch = dish.name.toLowerCase().includes(normalizedSearch)
    return matchesCategory && matchesSearch
  })

  const searchControl = (
    <label className="search-control">
      Search dishes
      <input
        ref={searchInputRef}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by name"
      />
    </label>
  )

  const handleAdd = useCallback((dish) => {
    dispatch({ type: 'add', payload: dish })
  }, [dispatch])

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
      {searchControl}
      <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />
      {loading && <p className="menu-status">Loading dishes...</p>}
      {error && <p className="menu-status" role="alert">{error}</p>}
      {!loading && !error && <DishList dishes={shown} onAdd={handleAdd} />}
      {!loading && !error && <p className="order-total">Order total: {total} ETB</p>}
      <CartPanel />
      <OrderForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
      {submitted && (
        <section className="order-confirmation" aria-live="polite">
          <h3>Order ready</h3>
          <p>{form.name} - {form.phone} - {form.area}</p>
          <p>Total: {total} ETB</p>
        </section>
      )}
    </>
  )
}

export default Menu;