import { useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Box, Typography, Button, Tooltip, TextField } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

import { ListView, Loading, QueryError } from 'components/common'
import TeamAddMemberDialog from './Dialogs/TeamAddMemberDialog'
import TeamKickMemberDialog from './Dialogs/TeamKickMemberDialog'
import TeamEditMemberDialog from './Dialogs/TeamEditMemberDialog'

import { useGlobalContext, useAppContext } from 'contexts'

import { useTeamAPI } from 'services/teams.services'


const TeamMembersListView: React.FC = () => {

	const { isMobile } = useGlobalContext()

	const { t } = useTranslation()

	const { getListMembers } = useTeamAPI()

	const { currentRole, userProfile } = useAppContext()

	const [listMembers, setListMembers] = useState<Array<any>>([])
	const [searchText, setSearchText] = useState<string | null>(null)
	const [selectedUser, setSelectedUser] = useState<any>(null)
	const [openAddMemberDialog, setOpenAddMemberDialog] = useState<boolean>(false)
	const [openKickMemberDialog, setOpenKickMemberDialog] = useState<boolean>(false)
	const [openEditMemberDialog, setOpenEditMemberDialog] = useState<boolean>(false)

	const handleKickUser = (user: any) => {
		setSelectedUser(user)
		setOpenKickMemberDialog(true)
	}

	const handleEditUser = (user: any) => {
		setSelectedUser(user)
		setOpenEditMemberDialog(true)
	}


	const columns = useMemo(() => {
		return [
			{
				field: 'name',
				headerName: t('Name'),
				hideable: false,
				flex: 1,
				minWidth: 200,
				valueGetter: (params: any) => `${params.row.firstName} ${params.row.lastName}`
			},
			{
				field: 'email',
				headerName: t('Email'),
				hideable: false,
				flex: 1,
				minWidth: 200
			},
			{
				field: 'role',
				headerName: t('Role'),
				hideable: false,
				flex: 1,
				minWidth: 100,
				sortComparator: (v1: any, v2: any) => {
					const roleOrder: { [key: string]: number } = { 'owner': 0, 'admin': 1, 'user': 2 }
					const role1 = v1.toLowerCase()
					const role2 = v2.toLowerCase()

					return roleOrder[role1] - roleOrder[role2]
				}
			},
			{
				field: 'buttons',
				headerName: '',
				hideable: false,
				sortable: false,
				editable: false,
				width: 200,
				renderCell: (value: any) => {
					if (value.row.id !== userProfile?.id) {
						return (
							<Box display='flex' flexDirection='row' justifyContent='space-between'>
								{
									currentRole === 'owner' &&
									<Tooltip title={t('Edit role')} placement='top' arrow>
										<Button variant='contained' color='primary' sx={{marginRight: 1}} onClick={() => handleEditUser(value.row)}>
											<EditIcon/>
										</Button>
									</Tooltip>
								}
								{
									(( currentRole === 'admin' || currentRole === 'owner' ) && value.row.role !== 'owner' && value.row.role !== 'admin' ) &&
									<Tooltip title={t('Kick user')} placement='top' arrow>
										<Button variant='outlined' onClick={() => handleKickUser(value.row)}>
											<LogoutIcon/>
										</Button>
									</Tooltip>
								}
							</Box>
						)}
					return null
				}
			}
		]}, [])

	const filteredMembers = useMemo(() => {
		if (!searchText) {
			return listMembers
		}
		let text = searchText
		text = text.replace(/[\])}[{(]/g, '')
		text = text.toLowerCase()

		const regex = new RegExp(text, 'gi')

		return listMembers.filter((member) => {
			const name = `${member.firstName} ${member.lastName}`
			return regex.test(name) || regex.test(member.email) || regex.test(member.role)
		}).sort((a, b) => a.firstName.localeCompare(b.firstname))

	}, [searchText, listMembers])

	const { isLoading, isError, error } = useQuery(['members'], () => getListMembers(), {
		onSuccess: (data) => {
			setListMembers(data)
		}
	})


	if (isLoading || listMembers.length === 0)
		return <Loading/>

	if (isError)
		return <QueryError error={error}/>

	return (
		<Box display='flex' flexDirection='column' width='100%' paddingX={5}>
			<TeamAddMemberDialog open={openAddMemberDialog} handleClose={() => setOpenAddMemberDialog(false)}/>
			<TeamKickMemberDialog open={openKickMemberDialog} handleClose={() => setOpenKickMemberDialog(false)} user={selectedUser}/>
			<TeamEditMemberDialog open={openEditMemberDialog} handleClose={() => setOpenEditMemberDialog(false)} user={selectedUser}/>
			<Box display='flex' justifyContent='space-between' paddingY={3}>
				<Box>
					<TextField
						placeholder={t('Search') as string}
						size='small'
						autoComplete='off'
						onChange={(event: any) => {
							setSearchText(event.target.value.toLowerCase())
						}}/>
				</Box>
				<Box>
					{
						( currentRole === 'admin' || currentRole === 'owner' ) &&
						<Button variant='contained' color='primary' onClick={() => setOpenAddMemberDialog(true)}>
							{
								isMobile ? <AddIcon/> : <Typography fontWeight='bold'>{t('Add Member')}</Typography>
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
