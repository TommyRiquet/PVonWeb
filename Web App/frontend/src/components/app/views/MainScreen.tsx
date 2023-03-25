import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import Menu from './Menu/Menu'

import { closedDrawerWidth } from 'theme'

const MainScreen = () => {
	return (
		<Box display='flex' height='100%'>
			<Menu/>
			<Box display='flex' width='100%' ml={`${closedDrawerWidth}px`} p={5}>
				<Outlet/>
			</Box>
		</Box>
	)
}
export default MainScreen
