import { render } from '@testing-library/react'
import ListView from '../ListView'

test('render ListView Component', () => {
	render(<ListView columns={[]} rows={[]}/>)
})
