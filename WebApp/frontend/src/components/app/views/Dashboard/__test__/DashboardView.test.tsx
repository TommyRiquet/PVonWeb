import { render } from '@testing-library/react'
import DashboardView from '../DashboardView'

test('render Dashboard page', () => {
	render(<DashboardView />)

	expect(true).toBe(true)
})
