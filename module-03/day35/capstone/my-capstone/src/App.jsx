import { Link, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { StockPage } from './pages/StockPage.jsx'
import { MedicinePage } from './pages/MedicinePage.jsx'
import { SuppliersPage } from './pages/SuppliersPage.jsx'
import { ReportsPage } from './pages/ReportsPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { PlaceholderPage } from './ui/PlaceholderPage.jsx'

function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-icon" aria-hidden="true">✳</span>
          <span>Goodwell <span className="brand-muted">Pharmacy</span></span>
        </Link>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>Overview</NavLink>
          <NavLink to="/stock">Stock book</NavLink>
          <NavLink to="/suppliers">Suppliers</NavLink>
          <NavLink to="/reports">Reports</NavLink>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <span>Inventory workspace</span>
        <span>Capstone scaffold · Addis Ababa</span>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="stock" element={<StockPage />} />
        <Route path="stock/:medicineId" element={<MedicinePage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
