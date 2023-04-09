import { Box, Typography, Button } from '@mui/material'

import { ListView } from 'components/common'


const Permission = {
	View: 'View',
	Edit: 'Edit',
	Delete: 'Delete',
	Export: 'Export',
	Template: 'Template'
}


const columns = [
	{
		field: 'role',
		headerName: 'Role',
		hideable: false,
		flex: 1
	},
	{
		field: 'permissions',
		headerName: 'Permissions',
		hideable: false,
		flex: 1,
		sortable: false,
		renderCell: (params: any) => {
			return (
				<Box display='flex' flexWrap='wrap'>
					{
						Object.keys(Permission).map((permission: string) => (
							<Button key={permission}>
								<Typography variant='body2' fontWeight='bold' color={params.row.permissions.includes(permission) ? 'primary.main' :'gray'}>
									{permission}
								</Typography>
							</Button>
						))
					}
				</Box>
			)
		}
	}
]

const rows = [
	{
		id: 1,
		role: 'Owner',
		permissions: ['View', 'Edit', 'Delete', 'Export', 'Template']
	},
	{
		id: 2,
		role: 'Admin',
		permissions: ['View', 'Edit', 'Delete', 'Export']

	},
	{
		id: 3,
		role: 'Member',
		permissions: ['View', 'Export']
	}
]

const TeamRolesListView: React.FC = () => {

	return (
		<Box display='flex' flexDirection='column' width='100%' paddingX={5}>
			<Box display='flex' justifyContent='flex-end' paddingY={3}>
				<Box>
					<Button variant='contained' color='primary' onClick={() => console.log('/members/add')}>
						<Typography fontWeight='bold' >Add Role</Typography>
					</Button>
				</Box>
			</Box>
			<ListView columns={columns} rows={rows}/>
		</Box>
	)
}

export default TeamRolesListView
