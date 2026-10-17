import { createSlice } from '@reduxjs/toolkit'

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

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const item = action.payload
      if (!isValidItem(item)) {
        return
      }

      const existingItem = state.items.find(currentItem => currentItem.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
        return
      }

      state.items.push({ ...item, price: Number(item.price), quantity: 1 })
    },
    remove(state, action) {
      const item = state.items.find(currentItem => currentItem.id === action.payload)
      if (!item) {
        return
      }

      item.quantity -= 1
      state.items = state.items.filter(currentItem => currentItem.quantity > 0)
    },
    clear(state) {
      state.items = []
    },
  },
})

export const { addItem, remove, clear } = cartSlice.actions
export default cartSlice.reducer
