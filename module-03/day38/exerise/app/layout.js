import Navigation from "./Navigation";
import Providers from "./Providers";
import "./globals.css";

export const metadata = {
  title: "Book Store",
  description: "A simple book store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header>
            <h1>Book Store</h1>
            <Navigation />
          </header>
          {children}
          <footer>
            <p>Book Store</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
