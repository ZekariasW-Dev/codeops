
import { useEffect, useRef, useState } from 'react'
import Dish from './Dish'
import Card from './Card'
import CategoryBar from './CategoryBar'

function Menu() {
	const [dishes, setDishes] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [searchTerm, setSearchTerm] = useState('')
	const [orderTotal, setOrderTotal] = useState(0)
	const [submitted, setSubmitted] = useState(false)
	const [done, setDone] = useState(false)
	const searchInputRef = useRef(null)
	const [form, setForm] = useState({
		name: '',
		phone: '',
		area: 'Bole',
	})
	const validPhone = /^(?:\+251|0)9\d{8}$/.test(form.phone)

	useEffect(() => {
		const controller = new AbortController()

		async function loadDishes() {
			try {
				const response = await fetch('/dishes.json', { signal: controller.signal })
				if (!response.ok) {
					throw new Error(`Could not load dishes: ${response.status} ${response.statusText}`)
				}
				setDishes(await response.json())
				setError('')
			} catch (requestError) {
				if (requestError.name !== 'AbortError') {
					setError(requestError.message)
				}
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false)
				}
			}
		}

		loadDishes()
		return () => controller.abort()
	}, [])

	useEffect(() => {
		if (selectedCategory === 'all') {
			return undefined
		}

		const controller = new AbortController()

		async function reloadDishes() {
			try {
				const response = await fetch(`/dishes.json?category=${selectedCategory}`, {
					signal: controller.signal,
				})
				if (!response.ok) {
					throw new Error(`Could not load ${selectedCategory} dishes: ${response.status} ${response.statusText}`)
				}
				setDishes(await response.json())
				setError('')
			} catch (requestError) {
				if (requestError.name !== 'AbortError') {
					setError(requestError.message)
				}
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false)
				}
			}
		}

		reloadDishes()
		return () => controller.abort()
	}, [selectedCategory])

	useEffect(() => {
		// The input exists only after render, so focus must run in an effect.
		searchInputRef.current?.focus()
	}, [])

	const normalizedSearch = searchTerm.trim().toLowerCase()
	const shown = dishes.filter(dish => {
		const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory
		const matchesSearch = dish.name.toLowerCase().includes(normalizedSearch)
		return matchesCategory && matchesSearch
	})

	useEffect(() => {
		document.title = String(shown.length)
	}, [shown.length])

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

	function handleCategorySelect(category) {
		setSelectedCategory(category)
		setLoading(category !== 'all')
	}

	const searchControl = (
		<label>
			Search dishes
			<input
				ref={searchInputRef}
				value={searchTerm}
				onChange={event => setSearchTerm(event.target.value)}
				placeholder="Search by name"
			/>
		</label>
	)

	if (loading) {
		return (
			<>
				{searchControl}
				<p>Loading dishes...</p>
			</>
		)
	}

	if (error) {
		return (
			<>
				{searchControl}
				<p role="alert">Error: {error}</p>
			</>
		)
	}

	return (
		<>
			{searchControl}

			<CategoryBar
				selected={selectedCategory}
				onSelect={handleCategorySelect}
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