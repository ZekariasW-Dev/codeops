import { Outlet } from 'react-router-dom'
import Header from '../assets/Header'

function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">Fresh food, delivered from Yeab's kitchen.</footer>
    </div>
  )
}

export default Layout