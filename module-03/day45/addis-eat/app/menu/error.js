"use client";

export default function MenuError({ reset }) {
  return (
    <section className="page-wrap">
      <div className="error-panel" role="alert">
        <p className="eyebrow">Kitchen pause</p>
        <h1>The menu could not load.</h1>
        <p>Our kitchen is still here. Please try again in a moment.</p>
        <button className="button button-dark" type="button" onClick={() => reset()}>Try again</button>
      </div>
    </section>
  );
}