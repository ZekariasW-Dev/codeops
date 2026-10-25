
import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";
import { dishes } from "../lib/dishes";

export default function Home() {
  const specials = dishes.slice(1, 4);

  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">A table from Addis, made for you</p>
          <h1>Bring the warmth of <em>home</em> to your table.</h1>
          <p className="hero-description">Slow-simmered favorites, bright spices, and the kind of injera that brings everyone closer.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/menu">Explore the menu <span aria-hidden="true">-&gt;</span></Link>
            <span className="hero-note">Made fresh in Addis Ababa / ETB</span>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="Featured Ethiopian meal: Doro Wat with injera">
          <div className="plate plate-back" />
          <div className="plate plate-front"><span className="plate-label">Yeab&apos;s<br />special</span></div>
          <div className="hero-stamp">GOOD<br />FOOD<br /><b>GOOD<br />COMPANY</b></div>
          <span className="hero-index">01 / 08</span>
        </div>
      </section>
      <section className="specials-section" aria-labelledby="specials-title">
        <div className="section-heading">
          <div><p className="eyebrow">Picked for today</p><h2 id="specials-title">House favorites</h2></div>
          <Link className="text-link" href="/menu">See all dishes <span aria-hidden="true">-&gt;</span></Link>
        </div>
        <div className="specials-grid">
          {specials.map((dish, index) => (
            <article className={`special-card special-card-${index + 1}`} key={dish.id}>
              <Link className="special-card-link" href={`/menu/${dish.id}`}>
                <span className="dish-number">0{dish.id}</span>
                <span className="dish-category">{dish.category === "spicy" ? "Slow-cooked / warming" : "A kitchen classic"}</span>
                <h3>{dish.name}</h3>
                <span className="dish-price">{dish.price} ETB</span>
              </Link>
              <AddToCartButton dish={dish} compact />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
