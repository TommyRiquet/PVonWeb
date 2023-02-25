import { render } from '@testing-library/react'
import SignIn from '../SignInScreen'

test('render Home page', () => {
	render(<SignIn />)

	expect(true).toBe(true)
})
