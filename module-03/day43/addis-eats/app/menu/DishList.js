"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function DishList({ initialData, initialQuery }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const page =
    Number.isNaN(requestedPage) || requestedPage < 1 ? 1 : requestedPage;

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery === initialQuery) {
      return;
    }

    const search = new URLSearchParams({ page: "1" });
    if (debouncedQuery) {
      search.set("q", debouncedQuery);
    }
    router.replace(`/menu?${search.toString()}`, { scroll: false });
  }, [debouncedQuery, initialQuery, router]);

  const searchKey = debouncedQuery
    ? `/api/dishes?q=${encodeURIComponent(debouncedQuery)}&page=${page}`
    : null;
  const pageKey = debouncedQuery ? null : `/api/dishes?page=${page}`;
  const {
    data: searchData,
    error: searchError,
    isValidating: isSearching,
  } = useSWR(
    searchKey,
    fetcher,
    {
      fallbackData: initialData,
      keepPreviousData: true,
    },
  );
  const { data: pageData, error: pageError } = useSWR(pageKey, fetcher, {
    fallbackData: initialData.page === page ? initialData : undefined,
    keepPreviousData: true,
  });
  const data = debouncedQuery ? searchData : pageData;
  const isWaitingForDebounce = query.trim() !== debouncedQuery;
  const isShowingPreviousResults =
    debouncedQuery && data?.query !== debouncedQuery;
  const totalPages = data?.totalPages ?? initialData.totalPages;
  const error = debouncedQuery ? searchError : pageError;
  const linkQuery = query.trim();

  return (
    <section>
      <label htmlFor="menu-search">Search dishes</label>
      <input
        id="menu-search"
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        placeholder="Search the menu"
      />

      {(isWaitingForDebounce || (isSearching && isShowingPreviousResults)) && (
        <p role="status">Updating results...</p>
      )}

      {error && <p role="alert">Unable to load dishes. Please try again.</p>}

      <ul aria-live="polite">
        {(data?.dishes ?? []).map((dish) => (
          <li key={dish.id}>
            <Link className="dish-card" href={`/menu/${dish.id}`}>
              <Image
                src={dish.image}
                alt={dish.imageAlt}
                width={640}
                height={480}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
              />
              <span>{dish.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {!error && data?.dishes.length === 0 && <p>No dishes found.</p>}

      <nav aria-label="Menu pages">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => {
            const params = new URLSearchParams({ page: String(pageNumber) });
            if (linkQuery) {
              params.set("q", linkQuery);
            }

            return (
              <Link
                key={pageNumber}
                href={`/menu?${params.toString()}`}
                aria-current={page === pageNumber ? "page" : undefined}
              >
                {pageNumber}
              </Link>
            );
          },
        )}
      </nav>
    </section>
  );
}