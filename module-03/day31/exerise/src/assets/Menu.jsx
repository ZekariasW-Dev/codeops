import { Profiler, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import useFetch from '../hooks/useFetch'
import CategoryBar from './CategoryBar'
import DishList from './DishList'

function Menu() {
  const { data, loading, error } = useFetch('/dishes.json')
  const dishes = data ?? []
  const { dispatch } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = ['all', 'regular', 'spicy'].includes(searchParams.get('category'))
    ? searchParams.get('category')
    : 'all'
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef(null)

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

      <CategoryBar selected={selectedCategory} onSelect={category => {
        setSearchParams(category === 'all' ? {} : { category })
      }} />
      <Profiler id="DishList" onRender={handleMenuProfile}>
        <DishList dishes={shown} onAdd={addDish} />
      </Profiler>

    </section>
  )
}

export default Menu
