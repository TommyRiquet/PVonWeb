import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { TabsBox } from 'components/common'

import UserSection from './UserSection'
import APIDashboard from './APIDashboard'

const ProfilView: React.FC = () => {

	const { t } = useTranslation()

	const TabDataList = useMemo(() => [
		{label: t('Profil'), content: <UserSection/>, tab: 'profile'},
		{label: t('Connected Applications'), content: <APIDashboard/>, tab: 'api'}
	], [])

	return (
		<Box display='flex' flexDirection='column' width='100%' padding={2}>
			<Typography variant='h4' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>{t('Profil')}</Typography>
			<TabsBox tabDataList={TabDataList}/>
		</Box>
	)
}

export default ProfilView
