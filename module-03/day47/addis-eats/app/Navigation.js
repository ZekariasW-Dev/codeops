import Link from "next/link";
import { signOut } from "./auth-actions";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>{" | "}
      <Link href="/menu">Menu</Link>{" | "}<Link href="/dashboard">Dashboard</Link>{" | "}
      <Link href="/cart">Cart</Link>{" | "}
      <Link href="/checkout">Checkout</Link>{" | "}
      <Link href="/sign-in">Sign in</Link>{" | "}
      <form action={signOut} style={{ display: "inline" }}>
        <button type="submit">Sign out</button>
      </form>
    </nav>
  );
}
