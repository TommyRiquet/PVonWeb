import { useMemo } from 'react'

import { Box, Typography } from '@mui/material'

import TranscriptListView from './TranscriptListView'
import TagsListView from './TagsListView'
import { TabsBox } from 'components/common'



const TranscriptView: React.FC = () => {

	const TabDataList = useMemo(() => [
		{label: 'Transcript', content: <TranscriptListView/>, tab: 'transcript'},
		{label: 'Tags', content: <TagsListView/>, tab: 'tags'}
	], [])

	return (
		<Box display='flex' flexDirection='column' width='100%' padding={2}>
			<Typography variant='h4' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>Transcript</Typography>
			<TabsBox tabDataList={TabDataList}/>
		</Box>
	)
}

export default TranscriptView
