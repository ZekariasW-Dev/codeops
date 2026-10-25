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
        <Navigation />
        {children}
      </body>
    </html>
  );
}
