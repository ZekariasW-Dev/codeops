import useFetch from '../hooks/useFetch'

function MenuStatus() {
  const { data, loading, error } = useFetch('/dishes.json')

  if (loading) {
    return <p className="status-panel">Menu status: loading...</p>
  }

  if (error) {
    return <p className="status-panel" role="alert">Menu status: unavailable</p>
  }

  return <p className="status-panel">Shared hook status: {data?.length ?? 0} dishes available</p>
}

export default MenuStatus
