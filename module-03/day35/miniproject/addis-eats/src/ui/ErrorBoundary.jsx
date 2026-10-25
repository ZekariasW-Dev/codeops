import { Component } from 'react'
import { Link } from 'react-router-dom'

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Addis Eats render error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="page-shell error-page" role="alert">
          <p className="eyebrow">A LITTLE DETOUR</p>
          <h1>Something went wrong.</h1>
          <p>We couldn’t show this screen. Head home and give it another try.</p>
          <Link className="button button-primary" to="/">Back to home</Link>
        </main>
      )
    }

    return this.props.children
  }
}
