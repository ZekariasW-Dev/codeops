export const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    description: "Minced beef seasoned with spiced butter and mitmita.",
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    description: "Chicken stew cooked with berbere and served with injera.",
  },
  {
    id: "injera",
    name: "Injera",
    description: "Soft, tangy flatbread made from teff flour.",
  },
];

export function getDishPage({ page = 1, query = "", pageSize = 2 } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matchingDishes = normalizedQuery
    ? dishes.filter((dish) =>
        `${dish.name} ${dish.description}`
          .toLocaleLowerCase()
          .includes(normalizedQuery),
      )
    : dishes;
  const totalPages = Math.max(1, Math.ceil(matchingDishes.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    dishes: matchingDishes.slice(start, start + pageSize),
    page: currentPage,
    pageSize,
    totalDishes: matchingDishes.length,
    totalPages,
    query,
  };
}