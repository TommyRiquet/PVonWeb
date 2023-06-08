import { render, screen } from '@testing-library/react'
import QueryError, { ErrorType } from '../QueryError'

import '@testing-library/jest-dom'

describe('QueryError tests', () => {
	test('renders QueryError component without errors', () => {
		render(<QueryError error={ErrorType.NETWORK}/>)
	})

	test('displays the correct error icon and text for unknown error', () => {
		render(<QueryError error={ErrorType.UNKNOWN} />)
		const unknownErrorText = screen.getByText('Unknown Error')
		expect(unknownErrorText).toBeInTheDocument()
	})
})
