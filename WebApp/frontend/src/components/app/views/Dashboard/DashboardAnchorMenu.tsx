import { FC } from 'react'

import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'


interface DashboardAnchorMenuI {
	mode: string
	anchorEl: HTMLElement | null
	toggleMode: () => void
	handleClose: () => void
	handleClick: (event: React.MouseEvent<HTMLElement>) => void
}


const DashboardAnchorMenu: FC<DashboardAnchorMenuI> = ({ mode, toggleMode, anchorEl, handleClick, handleClose}) => {
	const open = Boolean(anchorEl)

	const handleCustomize = () => {
		toggleMode()
		handleClose()
	}

	const handleResetByDefault = () => {
		handleClose()
	}

	const handleSave = () => {
		toggleMode()
		handleClose()
	}

	const handleAbort = () => {
		toggleMode()
		handleClose()
	}

	if (mode === 'edit') {
		return (
			<>
				<IconButton onClick={handleSave}>
					<SaveIcon/>
				</IconButton>
				<IconButton onClick={handleAbort}>
					<CloseIcon/>
				</IconButton>
			</>
		)
	}

	return (
		<IconButton
			id='menu-button'
			aria-controls={open ? 'menu-menu' : undefined}
			aria-haspopup='true'
			aria-expanded={open ? 'true' : undefined}
			onClick={handleClick}
		>
			<MoreVertIcon/>
			<Menu
				id='menu-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'menu-button'
				}}
			>
				<MenuItem onClick={handleCustomize}>Customize</MenuItem>
				<MenuItem onClick={handleResetByDefault}>Reset by default</MenuItem>
			</Menu>
		</IconButton>
	)

}

export default DashboardAnchorMenu
