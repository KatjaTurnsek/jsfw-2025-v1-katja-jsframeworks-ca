import { Link } from 'react-router-dom'
import '../ui/ui-not-found.css'

export default function NotFoundPage() {
  return (
    <div className="ui-not-found">
      <h1>404</h1>
      <h2 className="h4">Page not found</h2>
      <p>The page you’re looking for doesn’t exist.</p>

      <Link
        className="ui-btn-primary d-inline-flex justify-content-center align-items-center"
        to="/"
      >
        Back to shop
      </Link>
    </div>
  )
}
