import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import Menu from './Menu/Menu'

import { closedDrawerWidth } from 'theme'

const MainScreen = () => {
	return (
		<Box display='flex' height='100%'>
			<Menu/>
			<Box display='flex' width='100%' ml={`${closedDrawerWidth}px`} paddingX={5} paddingY={7} sx={{backgroundColor: 'whitesmoke'}}>
				<Outlet/>
			</Box>
		</Box>
	)
}
export default MainScreen
