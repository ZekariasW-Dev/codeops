function isPlainObject(value) {
  if (value === null || typeof value !== 'object') {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

function isValidItem(item) {
  return isPlainObject(item)
    && item.id !== undefined
    && typeof item.name === 'string'
    && Number.isFinite(Number(item.price))
}

function cartReducer(items, action) {
  if (!isPlainObject(action)) {
    return items
  }

  switch (action.type) {
    case 'add': {
      if (!isValidItem(action.payload)) {
        return items
      }

      const existingItem = items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return items.map(item => item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item)
      }

      return [...items, { ...action.payload, price: Number(action.payload.price), quantity: 1 }]
    }
    case 'remove': {
      const itemId = action.payload?.id
      if (itemId === undefined) {
        return items
      }

      return items
        .map(item => item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0)
    }
    case 'clear':
      return []
    default:
      return items
  }
}

export { isPlainObject }
export default cartReducer
