
import Menu from './Menu'
import ErrorBoundary from './ErrorBoundary'
import RenderProfiler from './Profiler'

function Main() {
  return (
    <main>
        <h2>Welcome to My Restaurant</h2>
        <p>Enjoy our delicious food!</p>
        <p>Our menu</p>
        <ErrorBoundary fallback={({ reset }) => <section className="error-state" role="alert"><h2>Menu unavailable</h2><p>One dish failed to render. Your header and cart are still available.</p><button type="button" onClick={reset}>Try again</button></section>}>
          <RenderProfiler id="menu"><Menu /></RenderProfiler>
        </ErrorBoundary>
    </main>
  )
}

export default Main