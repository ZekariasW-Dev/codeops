export const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    description: "Minced beef seasoned with spiced butter and mitmita.",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A colorful bowl of food topped with fresh herbs",
  },
  {
    id: "doro-wat",
    name: "Doro Wat",
    description: "Chicken stew cooked with berbere and served with injera.",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A warmly spiced chicken dish served with sides",
  },
  {
    id: "injera",
    name: "Injera",
    description: "Soft, tangy flatbread made from teff flour.",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "A plate of food with flatbread and fresh vegetables",
  },
];

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}

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