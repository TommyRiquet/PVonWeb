import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

import { useGlobalContext } from 'contexts/GlobalContext'


interface MenuItemProps {
	children?: React.ReactNode
	icon: JSX.Element
	text: string
	link?: string
	justifyContent?: 'flex-start' | 'flex-end'
	event?: () => void
}


const MenuItem: FC<MenuItemProps> = ({ icon, text, link, event }) => {
	const { isMobile } = useGlobalContext()
	const navigate = useNavigate()

	const handleClick = () => {
		if (link) {
			navigate(link)
		} else if (event) {
			event()
		}
	}

	return (
		<ListItemButton
			onClick={handleClick}
			sx={{
				justifySelf: 'flex-end',
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
				{
					!isMobile ? <Typography sx={{color: theme => theme.palette.primary.contrastText}}>
						{text}
					</Typography>
						:
						null
				}
			</ListItemText>
		</ListItemButton>
	)
}

export default MenuItem
