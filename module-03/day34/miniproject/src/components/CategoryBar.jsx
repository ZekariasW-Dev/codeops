import PropTypes from 'prop-types'

const categories = ['all', 'regular', 'spicy', 'Vegan']

function CategoryBar({ selected, onSelect }) {
  return (
    <nav className="category-bar" aria-label="Dish categories">
      {categories.map((category) => (
        <button
          className={selected === category ? 'category-chip active' : 'category-chip'}
          key={category}
          type="button"
          aria-pressed={selected === category}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  )
}

CategoryBar.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default CategoryBar
