import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
	render(<App />)
	const linkElement = screen.getByText(/learn react/i)
	expect(linkElement).toBeInTheDocument()
})

test('render all elements', () => {
	render(<App />)
	const element = screen.getByText(/Click on a pokemon to see more info/i)
	expect(element).toBeInTheDocument()
})
