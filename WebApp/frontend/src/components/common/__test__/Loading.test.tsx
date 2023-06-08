import { render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Loading from '../Loading'

test('render Loading Component', () => {
	render(<Loading/>)
})

test('displays CircularProgress component', () => {
	render(<Loading />)
	const circularProgress = screen.getByRole('progressbar')
	expect(circularProgress).toBeInTheDocument()
})
