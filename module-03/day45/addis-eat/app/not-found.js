import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-wrap">
      <div className="status-panel">
        <p className="eyebrow">Page not found</p>
        <h1>Let's get you back to something good.</h1>
        <Link className="text-link" href="/">Back to Addis Eats</Link>
      </div>
    </section>
  );
}