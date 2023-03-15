import { Box, Button, TextField, Grid } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { Widget, ListView } from 'components/common'


const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{
		field: 'name',
		headerName: 'Name',
		flex: 1
	},
	{
		field: 'email',
		headerName: 'Email',
		flex: 1
	},
	{
		field: 'role',
		headerName: 'Role',
		flex: 1,
	}
]

const rows = [
	{ id: 1, name: 'Snow', email: 'Jon', role: 'admin' },
	{ id: 2, name: 'Lannister', email: 'Cersei', role: 'moderateur' },
	{ id: 3, name: 'Lannister', email: 'Jaime', role: 'user' },
	{ id: 4, name: 'Stark', email: 'Arya', role: 'user' },
	{ id: 5, name: 'Targaryen', email: 'Daenerys', role: 'user' },
	{ id: 6, name: 'Melisandre', email: null, role: 'user' },
	{ id: 7, name: 'Clifford', email: 'Ferrara', role: 'user' },
	{ id: 8, name: 'Frances', email: 'Rossini', role: 'user' },
	{ id: 9, name: 'Roxie', email: 'Harvey', role: 'user' },
]


const TeamView = () => {
	return (
		<Grid container spacing={2} sx={{justifyContent: 'start'}}>
			<Widget title='Teams' gridProps={{lg: 12}} headerComponent={
				<Box>
					<TextField label='Search' variant='outlined' />
					<Button variant='contained'>Add</Button>
				</Box>
			}>
				<ListView rows={rows} columns={columns} />
			</Widget>
		</Grid>
	)
}

export default TeamView
