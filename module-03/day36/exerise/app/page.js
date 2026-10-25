import Link from "next/link";
import PushToMenu from "./PushToMenu";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Bookstore</h1>
      <p>Explore our collection of books:</p>
      <p><Link href="/menu">Browse the menu</Link></p>
      <PushToMenu />
    </div>
  );
}
