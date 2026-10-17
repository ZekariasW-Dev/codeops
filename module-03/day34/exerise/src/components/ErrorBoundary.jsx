import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('Error boundary caught an error:', error, errorInfo)
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    if (typeof this.props.fallback === 'function') {
      return this.props.fallback({ error: this.state.error, reset: this.reset })
    }

    return this.props.fallback ?? (
      <section className="error-panel" role="alert">
        <h2>Something went wrong</h2>
        <p>{this.state.error?.message ?? 'This section could not be displayed.'}</p>
        <button type="button" onClick={this.reset}>Try again</button>
      </section>
    )
  }
}

export default ErrorBoundary
