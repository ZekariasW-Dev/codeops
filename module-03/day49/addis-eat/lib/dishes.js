import dishData from "../public/dishes.json";

export const dishes = dishData;

export function getDishById(id) {
  return dishes.find((dish) => String(dish.id) === String(id));
}

export function getPricedCart(lines) {
  return lines.flatMap((line) => {
    const dish = getDishById(line.id);
    const quantity = Number(line.quantity);
    if (!dish || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) return [];
    return [{ ...dish, quantity, lineTotal: dish.price * quantity }];
  });
}