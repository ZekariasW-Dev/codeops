import PropTypes from "prop-types";
import Dish from "./Dish";

function Menu({ dishes, category }) {
  const shown = dishes.filter((dish) => dish.category === category);

  if (shown.length === 0) {
    return <p>No {category} dishes.</p>;
  }

  return shown.map((dish) => (
    <Dish key={dish.id} {...dish} />
  ));
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
};

export default Menu;