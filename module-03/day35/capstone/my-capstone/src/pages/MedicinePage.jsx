import { Link, useParams } from 'react-router-dom'
import { PlaceholderPage } from '../ui/PlaceholderPage.jsx'

export function MedicinePage() {
  const { medicineId } = useParams()

  return (
    <div className="page">
      <Link className="back-link" to="/stock">← Back to stock book</Link>
      <PlaceholderPage
        eyebrow="MEDICINE RECORD"
        title={`Medicine ${medicineId}`}
        description="A single medicine record and its supplier details will appear here."
      />
    </div>
  )
}
