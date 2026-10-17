import cartReducer, { isPlainObject } from '../reducers/cartReducer'

const sampleDish = { id: 'check-dish', name: 'Check dish', price: 10 }
const added = cartReducer([], { type: 'add', payload: sampleDish })
const incremented = cartReducer(added, { type: 'add', payload: sampleDish })
const removed = cartReducer(incremented, { type: 'remove', payload: { id: sampleDish.id } })
const cleared = cartReducer(removed, { type: 'clear' })

function CartReducerChecks() {
  const checks = [
    ['add', added.length === 1 && added[0].quantity === 1],
    ['add existing', incremented[0]?.quantity === 2],
    ['remove', removed[0]?.quantity === 1],
    ['clear', cleared.length === 0],
    ['plain object guard', isPlainObject(sampleDish) && !isPlainObject([])],
  ]

  return (
    <section className="demo-section">
      <h2>Direct cartReducer checks</h2>
      <ul className="check-list">
        {checks.map(([name, passed]) => <li key={name}>{passed ? 'Pass' : 'Fail'}: {name}</li>)}
      </ul>
    </section>
  )
}

export default CartReducerChecks
