import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

const useCartStore = create(persist((set) => ({
  items: [],
  addItem: (item) => set((state) => {
    if (!isValidItem(item)) {
      return state
    }

    const existingItem = state.items.find(currentItem => currentItem.id === item.id)
    if (existingItem) {
      return {
        items: state.items.map(currentItem => currentItem.id === item.id
          ? { ...currentItem, quantity: currentItem.quantity + 1 }
          : currentItem),
      }
    }

    return {
      items: [...state.items, { ...item, price: Number(item.price), quantity: 1 }],
    }
  }),
  remove: (id) => set((state) => ({
    items: state.items
      .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0),
  })),
  clear: () => set({ items: [] }),
}), {
  name: 'day32-cart',
}))

export { isPlainObject, isValidItem }
export default useCartStore
