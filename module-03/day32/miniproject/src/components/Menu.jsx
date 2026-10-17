import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useCartStore from '../stores/cartStore'
import CategoryBar from './CategoryBar'
import DishList from './DishList'

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef(null)
  const selectedCategory = searchParams.get('category') || 'all'
  const { data, loading, error } = useFetch(`/dishes.json?category=${selectedCategory}`)
  const addItem = useCartStore(state => state.addItem)
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
    addItem(dish)
  }, [addItem])

  function handleCategoryChange(category) {
    const nextParams = new URLSearchParams(searchParams)
    if (category === 'all') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', category)
    }
    setSearchParams(nextParams)
  }

  return (
    <>
      {searchControl}
      <CategoryBar selected={selectedCategory} onSelect={handleCategoryChange} />
      {loading && <p className="menu-status">Loading dishes...</p>}
      {error && <p className="menu-status" role="alert">{error}</p>}
      {!loading && !error && <DishList dishes={shown} onAdd={handleAdd} />}
    </>
  )
}

export default Menu;