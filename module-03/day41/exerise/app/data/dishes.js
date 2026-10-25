export const dishes = [
  {
    id: "1",
    name: "Doro Wat",
    price: 130,
    spicy: true,
    category: "spicy",
    description: "Chicken stew cooked with berbere and served with injera.",
  },
  {
    id: "2",
    name: "Kitfo",
    price: 150,
    spicy: true,
    category: "spicy",
    description: "Minced beef seasoned with spiced butter and mitmita.",
  },
  {
    id: "3",
    name: "Tibs",
    price: 120,
    spicy: false,
    category: "regular",
    description: "Sauteed meat served with vegetables and injera.",
  },
  {
    id: "4",
    name: "Shiro",
    price: 100,
    spicy: false,
    category: "regular",
    description: "A smooth and hearty chickpea stew.",
  },
  {
    id: "5",
    name: "Injera",
    price: 50,
    spicy: false,
    category: "regular",
    description: "Soft, tangy flatbread made from teff flour.",
  },
  {
    id: "6",
    name: "Gored Gored",
    price: 140,
    spicy: true,
    category: "spicy",
    description: "Bite-sized raw beef seasoned with Ethiopian spices.",
  },
  {
    id: "7",
    name: "Firfir",
    price: 110,
    spicy: false,
    category: "regular",
    description: "Shredded injera mixed with a spiced sauce.",
  },
  {
    id: "8",
    name: "Chechebsa",
    price: 90,
    spicy: false,
    category: "regular",
    description: "Torn flatbread tossed with spiced butter.",
  },
  {
    id: "9",
    name: "Dulet",
    price: 120,
    spicy: true,
    category: "spicy",
    description: "A traditional minced meat dish with herbs and spices.",
  },
  {
    id: "10",
    name: "Beyaynetu",
    price: 200,
    spicy: false,
    category: "regular",
    description: "A colorful platter of Ethiopian vegetarian stews.",
  },
  {
    id: "11",
    name: "Vegetable Couscous",
    price: 140,
    spicy: false,
    category: "Vegan",
    description: "Couscous served with a mix of vegetables.",
  },
  {
    id: "12",
    name: "Lentil Stew",
    price: 120,
    spicy: false,
    category: "Vegan",
    description: "Slow-cooked lentils seasoned with Ethiopian spices.",
  },
  {
    id: "13",
    name: "Avocado Salad",
    price: 90,
    spicy: false,
    category: "Vegan",
    description: "Fresh avocado tossed with crisp salad vegetables.",
  },
];

export const DISH_PAGE_SIZE = 5;

export function getDishPage(query = "", requestedPage = 1) {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredDishes = normalizedQuery
    ? dishes.filter((dish) =>
        `${dish.name} ${dish.description} ${dish.category}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : dishes;
  const totalPages = Math.max(1, Math.ceil(filteredDishes.length / DISH_PAGE_SIZE));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const start = (page - 1) * DISH_PAGE_SIZE;

  return {
    dishes: filteredDishes.slice(start, start + DISH_PAGE_SIZE),
    page,
    pageSize: DISH_PAGE_SIZE,
    total: filteredDishes.length,
    totalPages,
  };
}
