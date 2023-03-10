import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

interface MenuItemProps {
	children?: React.ReactNode
	icon: JSX.Element
	text: string
	link: string | undefined
}


const MenuItem: FC<MenuItemProps> = ({ icon, text, link }) => {
	const navigate = useNavigate()

	return (
		<ListItemButton
			onClick={
				link? () => navigate(link) : () => {null}
			}
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
				padding: '18px',
				marginTop: '6px'
			}}>
			<ListItemIcon
				sx={{
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				{icon}
			</ListItemIcon>
			<ListItemText>
				<Typography sx={{color: theme => theme.palette.primary.contrastText}}>
					{text}
				</Typography>
			</ListItemText>
		</ListItemButton>
	)
}

export default MenuItem
