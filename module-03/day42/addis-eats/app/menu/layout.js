import Link from "next/link";
import CategoryBar from "./CategoryBar";
import MenuCounter from "./MenuCounter";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <CategoryBar />
        <MenuCounter />
        <p><Link href="/menu">All dishes</Link></p>
      </aside>
      {children}
    </div>
  );
}