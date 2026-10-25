import Navigation from "./Navigation";
import Providers from "./Providers";
import { Geist } from "next/font/google";
import { siteUrl } from "./data/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

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
    <html lang="en" className={geist.className}>
      <body>
        <Providers>
          <header>
            <h1>Addis Eats</h1>
            <Navigation />
          </header>
          {children}
          <footer>
            <p>Addis Eats</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
