import Navigation from "./Navigation";
import localFont from "next/font/local";
import { siteUrl } from "./data/site";
import "./globals.css";

const geist = localFont({
  src: "../public/fonts/geist-latin.woff2",
  variable: "--font-geist",
  display: "swap",
});

export const metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Addis Eats",
    template: "%s | Addis Eats",
  },
  description: "Explore Ethiopian favorites and find your next meal at Addis Eats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.variable}>
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
