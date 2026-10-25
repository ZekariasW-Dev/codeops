import Link from "next/link";

export default function MenuNotFound() {
  return (
    <section className="page-wrap">
      <div className="status-panel">
        <p className="eyebrow">Not on today's menu</p>
        <h1>We could not find that dish.</h1>
        <Link className="text-link" href="/menu">Return to the menu</Link>
      </div>
    </section>
  );
}