import "./globals.css";

import Navigation from "./Navigation";

export const metadata = {
  title: "Addis Eats",
  description: "A simple Addis Eats menu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Addis Eats</h1>
          <Navigation />
        </header>
        {children}
        <footer>
          <p>Addis Eats</p>
        </footer>
      </body>
    </html>
  );
}
