import { render } from '@testing-library/react'
import CopyToClipboardButton from '../CopyToClipboardButton'

describe('CopyToClipboardButton tests', () => {
	test('renders CopyToClipboardButton component without errors', () => {
		render(<CopyToClipboardButton label='Test Label' />)
	})
})
