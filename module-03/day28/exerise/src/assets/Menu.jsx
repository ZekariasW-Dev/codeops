
import { useState } from 'react'
import Dish from './Dish'
import Card from './Card'
import CategoryBar from './CategoryBar'

function Menu({ dishes }) {
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [orderTotal, setOrderTotal] = useState(0)
	const [submitted, setSubmitted] = useState(false)
	const [done, setDone] = useState(false)
	const [form, setForm] = useState({
		name: '',
		phone: '',
		area: 'Bole',
	})
	const validPhone = /^(?:\+251|0)9\d{8}$/.test(form.phone)

	const shown = selectedCategory === 'all'
		? dishes
		: dishes.filter(dish => dish.category === selectedCategory)

	function handleChange(event) {
		const { name, value } = event.target
		setForm(currentForm => ({ ...currentForm, [name]: value }))
		setSubmitted(false)
		setDone(false)
	}

	function handleSubmit(event) {
		event.preventDefault()
		setSubmitted(true)
	}

	return (
		<>
			<CategoryBar
				selected={selectedCategory}
				onSelect={setSelectedCategory}
			/>

			{shown.length === 0 ? (
				<p>No {selectedCategory} dishes selected.</p>
			) : (
				shown.map(dish => (
					<Card key={dish.id}>
						<Dish
							{...dish}
							onAdd={() => setOrderTotal(total => total + dish.price)}
						/>
					</Card>
				))
			)}

			<p>Order total: {orderTotal} ETB</p>

			<form className="delivery-form" onSubmit={handleSubmit}>
				<h2>Delivery details</h2>
				<label>
					Name
					<input
						name="name"
						value={form.name}
						onChange={handleChange}
						placeholder="Your name"
						required
					/>
				</label>
				<label>
					Phone
					<input
						type="tel"
						name="phone"
						value={form.phone}
						onChange={handleChange}
						placeholder="09..."
						required
					/>
					{form.phone && !validPhone && (
						<p className="err">Use 09... or +2519...</p>
					)}
				</label>
				<label>
					Area
					<input
						name="area"
						value={form.area}
						onChange={handleChange}
						placeholder="Delivery area"
						required
					/>
				</label>
				<button type="submit" disabled={!validPhone}>
					Pay with TeleBirr
				</button>
			</form>

					{done && <p className="delivery-done">Done</p>}

			{submitted && (
				<section className="delivery-confirmation" aria-live="polite">
					<h2>Review your delivery</h2>
					<p>{form.name} · {form.phone} · {form.area}</p>
					<p>Total: {orderTotal} ETB</p>
							<button
								type="button"
								onClick={() => {
									setForm({ name: '', phone: '', area: 'Bole' })
									setSubmitted(false)
									setDone(true)
								}}
							>
						Confirm
					</button>
				</section>
			)}
		</>
	)
}


export default Menu