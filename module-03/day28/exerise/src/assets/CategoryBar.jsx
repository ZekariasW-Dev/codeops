const categories = ['all', 'regular', 'spicy']

function CategoryBar({ selected, onSelect }) {
	return (
		<nav className="category-chips" aria-label="Dish categories">
			{categories.map(category => (
				<button
					className={selected === category ? 'chip selected' : 'chip'}
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

export default CategoryBar