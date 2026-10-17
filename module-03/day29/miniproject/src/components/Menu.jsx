import { useEffect, useRef, useState } from 'react'
import CategoryBar from './CategoryBar'
import DishList from './DishList'
import OrderForm from './OrderForm'

function Menu() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [orderTotal, setOrderTotal] = useState(0)
  const [form, setForm] = useState({ name: '', phone: '', area: '' })
  const [submitted, setSubmitted] = useState(false)
  const searchInputRef = useRef(null)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadDishes() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`/dishes.json?category=${selectedCategory}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('We could not load the menu. Please try again.')
        }

        setDishes(await response.json())
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'We could not load the menu. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadDishes()

    return () => controller.abort()
  }, [selectedCategory])

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

  if (loading) {
    return (
      <>
        {searchControl}
        <p className="menu-status">Loading dishes...</p>
      </>
    )
  }

  if (error) {
    return (
      <>
        {searchControl}
        <p className="menu-status" role="alert">{error}</p>
      </>
    )
  }

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
      {searchControl}
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

export default Menu;