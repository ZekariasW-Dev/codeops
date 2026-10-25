import MenuExplorer from "../../components/MenuExplorer";
import DishCard from "../../components/DishCard";
import { dishes } from "../../lib/dishes";

export const revalidate = 3600;

export default async function MenuPage() {
  const menu = await Promise.resolve(dishes);

  return (
    <section className="page-wrap">
      <header className="page-heading">
        <div>
          <p className="eyebrow">From Yeab&apos;s kitchen</p>
          <h1>The menu</h1>
          <p>Good things, served warm. All prices are in ETB.</p>
        </div>
      </header>
      <MenuExplorer>
        {menu.map((dish) => <DishCard key={dish.id} dish={dish} />)}
      </MenuExplorer>
    </section>
  );
}