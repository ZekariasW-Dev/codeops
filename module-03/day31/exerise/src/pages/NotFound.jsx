import { Link } from 'react-router-dom'

function NotFound() {
  return <section className="route-panel"><h2>Page not found</h2><p>The page you requested does not exist.</p><Link to="/">Return to menu</Link></section>
}

export default NotFound