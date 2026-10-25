import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>{" | "}
      <Link href="/menu">Menu</Link>{" | "}
      <Link href="/cart">Cart</Link>{" | "}
      <Link href="/checkout">Checkout</Link>{" | "}
      <Link href="/orders">Orders</Link>{" | "}<Link href="/dashboard">Dashboard</Link>{" | "}
      <Link href="/login">Sign in</Link>
    </nav>
  );
}
