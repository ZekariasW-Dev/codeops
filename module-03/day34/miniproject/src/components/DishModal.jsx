import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function DishModal({ dish, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [onClose])

  return createPortal(
    <div className="modal-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="dish-modal" role="dialog" aria-modal="true" aria-labelledby="dish-modal-title">
        <button ref={closeButtonRef} className="modal-close" type="button" onClick={onClose} aria-label="Close dish details">×</button>
        <p className="section-kicker">Dish details</p>
        <h2 id="dish-modal-title">{dish.name}</h2>
        <p>{dish.description || 'A delicious choice from our menu.'}</p>
        <strong>{dish.price} {dish.currency || 'ETB'}</strong>
      </section>
    </div>,
    document.getElementById('modal-root'),
  )
}

export default DishModal
