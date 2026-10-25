import { useEffect, useState } from 'react'
import { fetchDishes } from '../api/dishes.js'

export function useDishes() {
  const [dishes, setDishes] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadDishes() {
      setStatus('loading')
      setError('')

      try {
        const result = await fetchDishes({ signal: controller.signal })
        setDishes(result)
        setStatus('success')
      } catch (loadError) {
        if (loadError.name === 'AbortError') return
        setError(loadError.message || 'The menu could not be loaded.')
        setStatus('error')
      }
    }

    loadDishes()
    return () => controller.abort()
  }, [attempt])

  return {
    dishes,
    status,
    error,
    retry: () => setAttempt((current) => current + 1),
  }
}
