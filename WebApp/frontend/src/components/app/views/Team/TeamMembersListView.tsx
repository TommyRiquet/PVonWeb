import { useMemo, useState } from 'react'

import { Box, Typography, Button, Tooltip, TextField } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

import { ListView, Loading } from 'components/common'
import TeamAddMemberDialog from './TeamAddMemberDialog'

import { useGlobalContext } from 'contexts/GlobalContext'

import { useTeamAPI } from 'services/teams.services'

import useCurrentUser from 'hooks/useCurrentUser'


const columns = [
	{
		field: 'name',
		headerName: 'Name',
		hideable: false,
		flex: 1,
		minWidth: 200,
		valueGetter: (params: any) => `${params.row.firstName} ${params.row.lastName}`
	},
	{
		field: 'email',
		headerName: 'Email',
		hideable: false,
		flex: 1,
		minWidth: 200
	},
	{
		field: 'role',
		headerName: 'Role',
		hideable: false,
		flex: 1,
		minWidth: 100
	},
	{
		field: 'buttons',
		headerName: '',
		hideable: false,
		sortable: false,
		editable: false,
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


const TeamMembersListView: React.FC = () => {

	const { isMobile } = useGlobalContext()

	const { getListMembers } = useTeamAPI()

	const { userProfile } = useCurrentUser()

	const [listMembers, setListMembers] = useState<Array<any>>([])
	const [searchText, setSearchText] = useState<string | null>(null)
	const [openAddMemberDialog, setOpenAddMemberDialog] = useState<boolean>(false)

	const filteredMembers = useMemo(() => {
		if (!searchText) {
			return listMembers
		}

		const regex = new RegExp(searchText, 'i')

		return listMembers.filter((member) => {
			const name = `${member.firstName} ${member.lastName}`
			return regex.test(name) || regex.test(member.email) || regex.test(member.role)
		}).sort((a, b) => a.firstName.localeCompare(b.firstname))

	}, [searchText, listMembers])

	const handleDialogClose = () => {
		setOpenAddMemberDialog(false)
	}

	useMemo(() => {
		getListMembers().then(res => setListMembers(res))
	}, [])

	if (listMembers.length === 0) {
		return <Loading/>
	}

	return (
		<Box display='flex' flexDirection='column' width='100%' paddingX={5}>
			<TeamAddMemberDialog open={openAddMemberDialog} handleClose={handleDialogClose}/>
			<Box display='flex' justifyContent='space-between' paddingY={3}>
				<Box>
					<TextField
						placeholder='Search'
						size='small'
						autoComplete='off'
						onChange={(event: any) => {
							setSearchText(event.target.value.toLowerCase())
						}}/>
				</Box>
				<Box>
					{
						userProfile?.role === 'admin' &&
						<Button variant='contained' color='primary' onClick={() => setOpenAddMemberDialog(true)}>
							{
								isMobile ? <AddIcon/> : <Typography fontWeight='bold'>Add Member</Typography>
							}
						</Button>
					}
				</Box>
			</Box>
			<ListView
				columns={columns}
				rows={filteredMembers}
				initialState={{
					sorting: {
						sortModel: [{ field: 'role', sort: 'asc' }]
					}
				}}
			/>
		</Box>
	)
}

export default TeamMembersListView
