export async function fetchDishes({ signal } = {}) {
  const response = await fetch('/dishes.json', { signal })

  if (!response.ok) {
    throw new Error(`Could not load the menu (HTTP ${response.status}).`)
  }

  const dishes = await response.json()
  if (!Array.isArray(dishes)) {
    throw new Error('The menu data has an unexpected format.')
  }

  return dishes
}
