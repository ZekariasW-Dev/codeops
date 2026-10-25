import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page">
      <section className="page-heading">
        <p className="eyebrow">404 · NOT FOUND</p>
        <h1>This page isn’t in the register.</h1>
        <p>Choose a section from the navigation or return to the overview.</p>
        <Link className="button" to="/">Go to overview</Link>
      </section>
    </div>
  )
}
