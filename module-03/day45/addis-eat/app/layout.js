import "./globals.css";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Addis Eats | Yeab's Kitchen",
  description: "A neighborhood menu of Ethiopian favorites, made fresh in Addis Ababa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <footer className="site-footer">
            <span>Yeab&apos;s Kitchen</span>
            <span>Fresh food, delivered across Addis Ababa.</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
