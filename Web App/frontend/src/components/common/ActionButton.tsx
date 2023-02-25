import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

const ActionButton = () => {

	return (
		<Box sx={{ '& > :not(style)': { m: 1 } }}>
			<Fab color='primary' aria-label='add'>
				<AddIcon />
			</Fab>
		</Box>
	)
}

export { ActionButton }
