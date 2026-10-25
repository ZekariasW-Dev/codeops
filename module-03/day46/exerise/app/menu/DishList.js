"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";

export default function DishList({ initialData }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const key = debouncedSearch
    ? `/api/dishes?q=${encodeURIComponent(debouncedSearch)}&page=${page}`
    : null;
  const { data = initialData, error, isValidating } = useSWR(key, fetcher, {
    fallbackData: initialData,
    keepPreviousData: true,
  });
  const displayedData = key ? data : initialData;

  return (
    <div>
      <label htmlFor="dish-search">Search dishes</label>
      <input
        id="dish-search"
        type="search"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          if (page !== 1) router.replace(pathname);
        }}
        placeholder="Search by name or ingredient"
      />

      {error && <p role="alert">Could not load dishes.</p>}
      {isValidating && <p aria-live="polite">Updating results...</p>}
      <ul>
        {displayedData.dishes.map((dish) => (
          <li key={dish.id}>
            <Link href={`/menu/${dish.id}`}>{dish.name}</Link> - {dish.price} ETB
          </li>
        ))}
      </ul>

      <nav aria-label="Menu pages">
        <button
          type="button"
          disabled={displayedData.page <= 1}
          onClick={() => router.push(`${pathname}?page=${displayedData.page - 1}`)}
        >
          Previous
        </button>
        <span>
          Page {displayedData.page} of {displayedData.totalPages}
        </span>
        <button
          type="button"
          disabled={displayedData.page >= displayedData.totalPages}
          onClick={() =>
            router.push(`${pathname}?page=${displayedData.page + 1}`)
          }
        >
          Next
        </button>
      </nav>
      <p>{displayedData.total} dishes</p>
    </div>
  );
}