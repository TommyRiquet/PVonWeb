import { useState } from 'react'

import { Box, List, Drawer } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DescriptionIcon from '@mui/icons-material/Description'
import GroupsIcon from '@mui/icons-material/Groups'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

import MenuItem from './MenuItem'

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
		link: '/docs'
	},
	{
		text: 'Teams',
		icon: <GroupsIcon sx={{color: theme => theme.palette.primary.contrastText}}/>,
		link: '/teams'
	}
]
const Settings = [
	{
		text: 'Settings',
		icon: <SettingsIcon sx={{color: theme => theme.palette.primary.contrastText}}/>,
		link: '/settings'
	},
	{
		text: 'Logout',
		icon: <LogoutIcon sx={{color: theme => theme.palette.primary.contrastText}}/>
	}
]



const Menu = () => {
	const [hovered, setHovered] = useState(false)
	const drawerWidth = hovered ? '300px' : '50px'

	const handleMouseEnter = () => {
		setHovered(true)
	}

	const handleMouseLeave = () => {
		setHovered(false)
	}

	return (
		<Drawer
			anchor='left'
			variant='permanent'
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				height: '100%',
				transition: 'width 0.2s',
				'& .MuiDrawer-paper': {
					background: 'linear-gradient(90deg, '+theme.palette.primary.light+' 0%, '+ theme.palette.primary.dark + ' 100%)',
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
				<List
					component='nav'
					sx={{
						width: '100%'
					}}
				>

					{
						MenuItems.map((item) => (
							<MenuItem key={item.text} text={item.text} link={item.link} icon={item.icon}/>
						))
					}

				</List>
				<List
					component='nav'
					sx={{
						width: '100%'
					}}
				>
					{
						Settings.map((item) => (
							<MenuItem key={item.text} text={item.text} link={item.link} icon={item.icon}/>
						))
					}
				</List>
			</Box>
		</Drawer>
	)
}

export default Menu
