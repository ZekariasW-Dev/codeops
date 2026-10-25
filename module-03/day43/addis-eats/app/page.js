import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">ETHIOPIAN FOOD, MADE FOR SHARING</p>
          <h1 id="hero-title">A taste of Addis, around your table.</h1>
          <p>
            Find a new favorite in our menu of comforting Ethiopian classics.
          </p>
          <Link className="primary-link" href="/menu">
            Explore the menu
          </Link>
        </div>
        <Image
          className="hero-image"
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80"
          alt="A colorful shared meal with fresh vegetables and greens"
          width={1400}
          height={1000}
          sizes="(max-width: 760px) 100vw, 50vw"
          priority
        />
      </section>
    </main>
  );
}
