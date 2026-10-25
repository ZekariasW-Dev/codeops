import Navigation from "./Navigation";
import Providers from "./Providers";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Addis Eats",
  description: "A menu of Ethiopian dishes",
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
