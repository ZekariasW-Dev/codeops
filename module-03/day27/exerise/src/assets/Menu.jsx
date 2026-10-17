
import Dish from './Dish'
import Card from './Card'

function Menu({ dishes, category }) {
	const shown = dishes.filter(d => d.category === category);
	if (shown.length === 0) return <p>No {category} dishes selected.</p>;

	return shown.map(d => (
		<Card key={d.id}>
			<Dish {...d} />
		</Card>
	));
}


export default Menu