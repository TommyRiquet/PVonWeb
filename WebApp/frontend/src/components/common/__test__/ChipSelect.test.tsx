import { render, screen  } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChipSelect from '../ChipSelect'

test('render ChipSelect Component', () => {
	render(<ChipSelect label='test' allChips={[]} selectedChips={[{name: 'test'}]} handleChange={() => {console.log()}}/>)
})


test('displays the correct label', () => {
	const label = 'Test Label'
	render(<ChipSelect label={label} allChips={[]} selectedChips={[]} handleChange={() => {console.log()}} />)
	const labelElement = screen.getAllByText(label)
	expect(labelElement[0]).toBeInTheDocument()
})

