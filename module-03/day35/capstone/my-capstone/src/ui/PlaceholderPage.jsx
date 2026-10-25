function EmptyPage({ eyebrow, title, description }) {
  return (
    <section className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

export function PlaceholderPage({ eyebrow, title, description }) {
  return (
    <div className="page">
      <EmptyPage eyebrow={eyebrow} title={title} description={description} />
      <div className="placeholder-panel">
        <span aria-hidden="true">✳</span>
        <p>This screen is ready for the next capstone build slice.</p>
      </div>
    </div>
  )
}
