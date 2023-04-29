import { useMemo, useState } from 'react'

import { Box, Typography } from '@mui/material'

import { Loading } from 'components/common'

import { useTeamAPI } from 'services/teams.services'


const TeamWidget: React.FC = () => {

	const { getListMembers } = useTeamAPI()

	const [listMembers, setListMembers] = useState<Array<any>>([])

	useMemo(() => {
		getListMembers().then(res => setListMembers(res))
	}, [])

	if (listMembers.length === 0) {
		return <Loading/>
	}

	return (
		<Box
			display='flex'
			flexDirection='column'
			width='100%'
			paddingX={5}
			sx={{
				overflowY: 'auto',
				'scrollbar-width': 'thin',
				'scrollbar-color': (theme) => `${theme.palette.primary.main} ${theme.palette.background.default}`,
				'&::-webkit-scrollbar': {
					width: '7px',
					backgroundColor: (theme) => theme.palette.background.default,
					borderRadius: '10px'
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: (theme) => theme.palette.primary.main,
					borderRadius: '10px'
				}
			}}>
			{
				listMembers.map((member) => (
					<Box
						key={member.firstname+member.lastName}
						display='flex' flexDirection='row'
						justifyContent='space-between'
						alignItems='center'
						paddingY={1}
					>
						<Box display='flex' flexDirection='row' alignItems='center' paddingTop={1}>
							<Typography variant='body1' fontWeight='bold'>
								{`${member.firstName} ${member.lastName}`}
							</Typography>
						</Box>
					</Box>
				))
			}
		</Box>
	)
}

export default TeamWidget
