import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import Menu from './Menu/Menu'

import { useGlobalContext } from 'contexts/GlobalContext'

import { closedDrawerWidth } from 'theme'

const MainScreen = () => {
	const { isMobile } = useGlobalContext()
	return (
		<Box display='flex' height={isMobile? 'calc(99% - 60px)' : '100%'} overflow='auto'>
			<Menu/>
			<Box display='flex' width='100%' ml={isMobile ? '0px' : `${closedDrawerWidth}px`} paddingX={isMobile ? 0 : 3} paddingY={isMobile ? 0 : 5} sx={{backgroundColor: theme => theme.palette.background.default}}>
				<Outlet/>
			</Box>
		</Box>
	)
}
export default MainScreen
