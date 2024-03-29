import { FC, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Box, List, Drawer, Paper } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DescriptionIcon from '@mui/icons-material/Description'
import GroupsIcon from '@mui/icons-material/Groups'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'

import MenuItem from './MenuItem'

import { useAuth } from 'contexts/AuthContext'
import { useGlobalContext } from 'contexts/GlobalContext'

import logo from 'static/images/logo-white.png'

import theme from 'theme'


const MenuItems = [
	{
		text: 'Dashboard',
		icon: <DashboardIcon sx={{color: theme => theme.palette.primary.contrastText}}/>,
		link: '/dashboard'
	},
	{
		text: 'Documents',
		icon: <DescriptionIcon sx={{color: theme => theme.palette.primary.contrastText}}/>,
		link: '/transcript'
	},
	{
		text: 'Team',
		icon: <GroupsIcon sx={{color: theme => theme.palette.primary.contrastText}}/>,
		link: '/team'
	},
	{
		text: 'Profil',
		icon: <PersonIcon sx={{color: theme => theme.palette.primary.contrastText}}/>,
		link: '/profil'
	}
]



const Menu : FC = () => {
	const [hovered, setHovered] = useState(false)
	const { logout } = useAuth()
	const { isMobile } = useGlobalContext()
	const { t } = useTranslation()

	const openDrawerWidth = 300
	const closedDrawerWidth = 50
	const drawerWidth = hovered ? `${openDrawerWidth}px` : `${closedDrawerWidth}px`

	const handleMouseEnter = () => {
		setHovered(true)
	}

	const handleMouseLeave = () => {
		setHovered(false)
	}

	if (isMobile) {
		return (
			<Paper sx={{
				display: 'flex',
				height: '60px',
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 10000,
				background: 'linear-gradient(90deg, '+theme.palette.primary.light+' 0%, '+ theme.palette.primary.dark + ' 100%)',
				justifyContent: 'space-around',
				alignItems: 'center'
			}} elevation={3}>
				{
					MenuItems.map((item) => (
						<MenuItem key={item.text} text={t(item.text)} icon={item.icon} link={item.link}/>
					))
				}

				<MenuItem key={'settings'} text={t('Settings')} icon={<SettingsIcon sx={{color: theme => theme.palette.primary.contrastText}}/>} link={'/settings'}/>
				<MenuItem key={'deconnection'} text={t('Logout')} icon={<LogoutIcon sx={{color: theme => theme.palette.primary.contrastText}}/>} event={() => logout()}/>
			</Paper>
		)
	}

	return (
		<Drawer
			anchor='left'
			variant='permanent'
			sx={{
				width: drawerWidth,
				zIndex: 1000,
				position: 'absolute',
				transition: 'width 0.2s',
				'& .MuiDrawer-paper': {
					background: 'linear-gradient(90deg, '+theme.palette.primary.light+' 0%, '+ theme.palette.primary.dark + ' 100%)'
				}
			}}
		>
			<Box
				sx={{
					width: drawerWidth,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					transition: 'width 0.2s',
					overflowX: 'hidden',
					height: '100%'
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<List component='nav' sx={{ width: '100%' }}>
					<Box width='100%' height='10vh' display='flex' alignItems='center' justifyContent='center' marginBottom={3}>
						<img src={logo} alt='logo' style={{ position: 'static', width: hovered ? '140px': '100px', transition: 'all 0.2s ease-in-out', padding: hovered ? '0': '20px'}}/>
					</Box>

					{
						MenuItems.map((item) => (
							<MenuItem key={item.text} text={t(item.text)} icon={item.icon} link={item.link}/>
						))
					}

				</List>
				<List component='nav' sx={{ width: '100%'}}>
					<MenuItem key={'settings'} text={t('Settings')} icon={<SettingsIcon sx={{color: theme => theme.palette.primary.contrastText}}/>} link={'/settings'}/>
					<MenuItem key={'deconnection'} text={t('Logout')} icon={<LogoutIcon sx={{color: theme => theme.palette.primary.contrastText}}/>} event={() => logout()}/>
				</List>
			</Box>
		</Drawer>
	)
}

export default Menu
