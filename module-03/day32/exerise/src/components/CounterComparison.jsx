import { useReducer, useState } from 'react'

const initialState = { count: 0, step: 1, label: 'Ready' }

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step, label: 'Incremented' }
    case 'decrement':
      return { ...state, count: state.count - state.step, label: 'Decremented' }
    case 'reset':
      return initialState
    case 'setStep':
      return { ...state, step: action.value }
    default:
      return state
  }
}

function UseStateCounter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [label, setLabel] = useState('Ready')

  function changeCount(direction) {
    setCount(currentCount => currentCount + direction * step)
    setLabel(direction > 0 ? 'Incremented' : 'Decremented')
  }

  return (
    <div className="comparison-card">
      <h3>Three useState calls</h3>
      <p>{count} ({label})</p>
      <label>Step <input type="number" min="1" value={step} onChange={event => setStep(Number(event.target.value) || 1)} /></label>
      <div className="button-row">
        <button type="button" onClick={() => changeCount(1)}>+</button>
        <button type="button" onClick={() => changeCount(-1)}>-</button>
        <button type="button" onClick={() => { setCount(0); setStep(1); setLabel('Ready') }}>Reset</button>
      </div>
    </div>
  )
}

function UseReducerCounter() {
  const [state, dispatch] = useReducer(counterReducer, initialState)

  return (
    <div className="comparison-card">
      <h3>One useReducer</h3>
      <p>{state.count} ({state.label})</p>
      <label>Step <input type="number" min="1" value={state.step} onChange={event => dispatch({ type: 'setStep', value: Number(event.target.value) || 1 })} /></label>
      <div className="button-row">
        <button type="button" onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button type="button" onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <button type="button" onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    </div>
  )
}

function CounterComparison() {
  return (
    <section className="demo-section">
      <h2>Related state: useState vs useReducer</h2>
      <div className="comparison-grid">
        <UseStateCounter />
        <UseReducerCounter />
      </div>
    </section>
  )
}

export default CounterComparison
