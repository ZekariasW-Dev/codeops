import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function DishModal({ dish, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    dialogRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) {
    return null
  }

  return createPortal(
    <div className="modal-backdrop" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) {
        onClose()
      }
    }}>
      <section
        ref={dialogRef}
        className="dish-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        tabIndex="-1"
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close dish details">Close</button>
        <p className="eyebrow">Quick view</p>
        <h2 id="dish-modal-title">{dish.name}</h2>
        <p>{dish.spicy ? 'A spicy favorite from the kitchen.' : 'A fresh favorite from the kitchen.'}</p>
        <strong>{dish.price} {dish.currency ?? 'ETB'}</strong>
      </section>
    </div>,
    modalRoot,
  )
}

export default DishModal
