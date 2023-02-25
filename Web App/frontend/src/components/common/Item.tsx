import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'


const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	color: theme.palette.text.secondary,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'flex-start',
	borderRadius: '4px'
}))

export default Item