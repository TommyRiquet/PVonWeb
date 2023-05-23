import { Outlet } from 'react-router-dom'

import { Box, CircularProgress } from '@mui/material'

import Menu from './Menu/Menu'

import { useGlobalContext, useAppContext } from 'contexts'

import { QueryError } from 'components/common'

import { closedDrawerWidth } from 'theme'

const MainScreen = () => {

	const { isMobile } = useGlobalContext()
	const { isLoading, isError, error, isAppReady } = useAppContext()

	if (isLoading || isError || !isAppReady){
		return (
			<Box display='flex' justifyContent='center' height='100%' alignItems='center' sx={{background: 'linear-gradient(to left top, #347571, #449342)'}}>
				{isError ? <QueryError error={error}/> : <CircularProgress color='secondary'/>}
			</Box>
		)
	}

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
