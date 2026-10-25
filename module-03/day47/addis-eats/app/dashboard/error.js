"use client";
export default function DashboardError({reset}){return <main className="dashboard"><div className="state-panel error-panel" role="alert"><h1>Dashboard unavailable</h1><p>We couldn’t load the revenue and order summaries.</p><button className="button-link" onClick={()=>reset()}>Try again</button></div></main>}
