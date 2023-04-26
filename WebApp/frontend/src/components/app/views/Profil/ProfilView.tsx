import { useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import { TabsBox } from 'components/common'

import UserSection from './UserSection'

const ProfilView: React.FC = () => {

	const TabDataList = useMemo(() => [
		{label: 'Profil', content: <UserSection/>, tab: 'profile'},
		{label: 'Connected Applications', content: <Box>API</Box>, tab: 'api'}
	], [])

	return (
		<Box display='flex' flexDirection='column' width='100%'>
			<Typography variant='h4' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>Profil</Typography>
			<TabsBox tabDataList={TabDataList}/>
		</Box>
	)
}

export default ProfilView
