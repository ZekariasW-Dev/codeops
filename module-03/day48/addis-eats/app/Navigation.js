import Link from "next/link";
import { signOut } from "./auth-actions";
import SubmitButton from "./SubmitButton";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>{" | "}
      <Link href="/menu">Menu</Link>{" | "}<Link href="/dashboard">Dashboard</Link>{" | "}
      <Link href="/cart">Cart</Link>{" | "}
      <Link href="/checkout">Checkout</Link>{" | "}
      <Link href="/sign-in">Sign in</Link>{" | "}
      <form action={signOut} style={{ display: "inline" }}>
        <SubmitButton pendingLabel="Signing out...">Sign out</SubmitButton>
      </form>
    </nav>
  );
}


