import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="page-shell error-page">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>We can’t find that page.</h1>
      <p>The menu is still here, though. Let’s get you back to something good.</p>
      <div className="button-row">
        <Link className="button button-primary" to="/">Go home</Link>
        <Link className="button button-secondary" to="/menu">Browse the menu</Link>
      </div>
    </main>
  )
}
