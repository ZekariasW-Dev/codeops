import { Profiler } from 'react'
import PropTypes from 'prop-types'

function recordProfile(id, phase, actualDuration) {
  const entry = { id, phase, actualDuration, recordedAt: new Date().toISOString() }
  window.__restaurantProfiler = [...(window.__restaurantProfiler || []), entry]
  console.info(`[Profiler] ${id} ${phase}: ${actualDuration.toFixed(2)}ms`)
}

function RenderProfiler({ id, children }) {
  return <Profiler id={id} onRender={recordProfile}>{children}</Profiler>
}

RenderProfiler.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default RenderProfiler
