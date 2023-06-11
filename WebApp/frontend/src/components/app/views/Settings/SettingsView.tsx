import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

import { TabsBox } from 'components/common'
import GeneralSettingsView from './GeneralSettings/GeneralSettingsView'
import PrivacyView from './PrivacyView'
import LogsView from './LogsView'

import { useAppContext } from 'contexts'


const SettingsView: React.FC = () => {

	const { t } = useTranslation()

	const { currentRole } = useAppContext()

	const TabDataList = useMemo(() => [
		{label: t('General'), content: <GeneralSettingsView/>, tab: 'general'},
		{label: t('Privacy'), content: <PrivacyView/>, tab: 'privacy'},
		{label: t('Logs'), content: <LogsView/>, tab: 'logs', isVisible: (currentRole === 'admin' || currentRole === 'owner')}
	], [t])

	return (
		<Box display='flex' flexDirection='column' width='100%' padding={2}>
			<Typography variant='h4' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>{t('Settings')}</Typography>
			<TabsBox tabDataList={TabDataList}/>
		</Box>
	)
}

export default SettingsView
