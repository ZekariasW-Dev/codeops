"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useCartStore, { syncCartCookie } from "../stores/cartStore";

export default function SiteHeader() {
  const pathname = usePathname();
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  useEffect(() => {
    useCartStore.persist.rehydrate().then(() => syncCartCookie(useCartStore.getState().items));
  }, []);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Yeab's Kitchen home">
        <span className="brand-mark" aria-hidden="true">Y</span>
        <span className="brand-copy"><strong>Yeab's Kitchen</strong><small>Addis Eats / since 2018</small></span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/menu" aria-current={pathname.startsWith("/menu") ? "page" : undefined}>Menu</Link>
        <Link className="cart-nav" href="/cart" aria-current={pathname === "/cart" ? "page" : undefined}>
          Cart <span className="cart-count" aria-label={`${count} items`}>{count}</span>
        </Link>
      </nav>
    </header>
  );
}