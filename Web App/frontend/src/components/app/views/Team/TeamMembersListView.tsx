import { Box, Typography, Button, Tooltip, TextField } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import EditIcon from '@mui/icons-material/Edit'

import { ListView } from 'components/common'

const columns = [
	{
		field: 'name',
		headerName: 'Name',
		hideable: false,
		flex: 1
	},
	{
		field: 'email',
		headerName: 'Email',
		hideable: false,
		flex: 1
	},
	{
		field: 'role',
		headerName: 'Role',
		hideable: false,
		flex: 1,
		sortComparator: (v1: any, v2: any) => {
			if (v1 === 'Owner') return -1
			if (v2 === 'Owner') return 1
			if (v1 === 'Admin') return -1
			if (v2 === 'Admin') return 1
			return 0
		}
	},
	{
		field: 'buttons',
		headerName: '',
		hideable: false,
		width: 200,
		renderCell: () => (
			<Box display='flex' flexDirection='row' justifyContent='space-between'>
				<Tooltip title='Edit role' placement='top' arrow>
					<Button variant='contained' color='primary' sx={{marginRight: 1}}>
						<EditIcon/>
					</Button>
				</Tooltip>
				<Button variant='contained' color='error'>
					<LogoutIcon/>
				</Button>
			</Box>
		)
	}
]

const rows = [
	{
		id: 1,
		name: 'Me',
		email: 'admin@pvonweb.com',
		role: 'Owner'
	},
	{
		id: 2,
		name: 'Daenerys Targaryen',
		email: 'daenerys.targaryen@pvonweb.com',
		role: 'Admin'
	},
	{
		id: 3,
		name: 'Jhnon Snow',
		email: 'j.snwo@pvonweb.com',
		role: 'Member'
	},
	{
		id: 4,
		name: 'Hodor',
		email: 'hodor@pvonweb.com',
		role: 'Member'
	}
]


const TeamMembersListView: React.FC = () => {


	return (
		<Box display='flex' flexDirection='column' width='100%' paddingX={5}>
			<Box display='flex' justifyContent='space-between' paddingY={3}>
				<Box>
					<TextField label='Search' size='small'/>
				</Box>
				<Box>
					<Button variant='contained' color='primary' onClick={() => console.log('/members/add')}>
						<Typography fontWeight='bold' >Add Member</Typography>
					</Button>
				</Box>
			</Box>
			<ListView columns={columns} rows={rows}/>
		</Box>
	)
}

export default TeamMembersListView
