import CategoryBar from "./CategoryBar";
import MenuCounter from "./MenuCounter";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <CategoryBar />
        <MenuCounter />
      </aside>
      {children}
    </div>
  );
}