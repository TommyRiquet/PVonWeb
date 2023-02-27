import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import Menu from './Menu/Menu'

const Main = () => {

	return (
		<Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden'}}>
			<Menu />
			<Box style={{ flexGrow: 1 }}>
				<Outlet />
			</Box>
		</Box>
	)
}
export default Main
