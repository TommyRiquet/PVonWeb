import { useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import TranscriptListView from './TranscriptListView'
import { TabsBox } from 'components/common'



const TranscriptView: React.FC = () => {

	const TabDataList = useMemo(() => [
		{label: 'Transcript', content: <TranscriptListView/>, tab: 'transcript'},
	], [])

	return (
		<Box display='flex' flexDirection='column' width='100%'>
			<Typography variant='h4'>Transcript</Typography>
			<TabsBox tabDataList={TabDataList}/>
		</Box>
	)
}

export default TranscriptView
