import { Profiler, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useCartStore from '../stores/cartStore'
import useFetch from '../hooks/useFetch'
import CategoryBar from './CategoryBar'
import DishList from './DishList'
import ErrorBoundary from '../components/ErrorBoundary'
import DishModal from '../components/DishModal'

function Menu() {
  const { data, loading, error } = useFetch('/dishes.json')
  const dishes = data ?? []
  const addItem = useCartStore(state => state.addItem)
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = ['all', 'regular', 'spicy'].includes(searchParams.get('category'))
    ? searchParams.get('category')
    : 'all'
  const [searchTerm, setSearchTerm] = useState('')
  const [failedDishId, setFailedDishId] = useState(null)
  const [previewDish, setPreviewDish] = useState(null)
  const searchInputRef = useRef(null)
  const previewTriggerRef = useRef(null)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  const addDish = useCallback((dish) => {
    addItem(dish)
  }, [addItem])

  const previewDishDetails = useCallback((dish) => {
    previewTriggerRef.current = document.activeElement
    setPreviewDish(dish)
  }, [])

  const closeDishPreview = useCallback(() => {
    setPreviewDish(null)
    requestAnimationFrame(() => previewTriggerRef.current?.focus())
  }, [])

  const selectCategory = useCallback((category) => {
    setSearchParams(category === 'all' ? {} : { category })
  }, [setSearchParams])

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

      <CategoryBar selected={selectedCategory} onSelect={selectCategory} />
      <div className="menu-demo-actions">
        <button type="button" onClick={() => setFailedDishId(failedDishId ? null : shown[0]?.id)} disabled={shown.length === 0}>
          {failedDishId ? 'Restore dish rendering' : 'Trigger dish error'}
        </button>
      </div>
      <ErrorBoundary key={`menu-${failedDishId ?? 'none'}`} fallback={({ error }) => (
        <section className="error-panel" role="alert">
          <h2>Menu dishes unavailable</h2>
          <p>{error.message}</p>
          <p>Header and cart navigation remain available.</p>
        </section>
      )}>
        <Profiler id="DishList" onRender={handleMenuProfile}>
          <DishList dishes={shown} onAdd={addDish} failedDishId={failedDishId} onPreview={previewDishDetails} />
        </Profiler>
      </ErrorBoundary>
      {previewDish && <DishModal dish={previewDish} onClose={closeDishPreview} />}

    </section>
  )
}

export default Menu
