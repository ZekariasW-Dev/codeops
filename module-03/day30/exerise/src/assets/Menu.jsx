import { Profiler, useCallback, useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import useFetch from '../hooks/useFetch'
import CategoryBar from './CategoryBar'
import DishList from './DishList'

function Menu() {
  const { data, loading, error } = useFetch('/dishes.json')
  const dishes = data ?? []
  const { dispatch } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', area: 'Bole' })
  const searchInputRef = useRef(null)
  const validPhone = /^(?:\+251|0)9\d{8}$/.test(form.phone)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  const addDish = useCallback((dish) => {
    dispatch({ type: 'add', payload: dish })
  }, [dispatch])

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const shown = dishes.filter(dish => {
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory
    return matchesCategory && dish.name.toLowerCase().includes(normalizedSearch)
  })

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

  function handleMenuProfile(id, phase, actualDuration) {
    if (import.meta.env.DEV) {
      console.debug(`${id} ${phase}: ${actualDuration.toFixed(2)}ms`)
    }
  }

  if (loading) {
    return <p className="status-panel">Loading dishes...</p>
  }

  if (error) {
    return <p className="status-panel" role="alert">{error}</p>
  }

  return (
    <section className="menu-section">
      <label className="search-control">
        Search dishes
        <input
          ref={searchInputRef}
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          placeholder="Search by name"
        />
      </label>

      <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />
      <Profiler id="DishList" onRender={handleMenuProfile}>
        <DishList dishes={shown} onAdd={addDish} />
      </Profiler>

      <form className="delivery-form" onSubmit={handleSubmit}>
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

export default Menu
