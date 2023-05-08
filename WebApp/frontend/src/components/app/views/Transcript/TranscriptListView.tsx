import { useMemo, useState } from 'react'

import { useQuery } from 'react-query'
import { DateTime } from 'luxon'
import { Box, Button, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { ListView, Loading, QueryError } from 'components/common'

import { useGlobalContext } from 'contexts/GlobalContext'

import { useTranscriptAPI } from 'services/transcripts.services'

const columns = [
	{
		field: 'id',
		headerName: 'ID',
		hideable: false,
		width: 80
	},
	{
		field: 'name',
		headerName: 'Name',
		hideable: false,
		flex: 1,
		minWidth: 200
	},
	{
		field: 'occurenceDate',
		headerName: 'Date',
		hideable: false,
		flex: 1,
		minWidth: 150,
		renderCell: (params: any) => {
			return (
				<Typography>
					{DateTime.fromSQL(params.value).toLocaleString(DateTime.DATETIME_SHORT)}
				</Typography>
			)
		}
	},
	{
		field: 'companyName',
		headerName: 'Company',
		hideable: false,
		flex: 1,
		minWidth: 200
	}
]


const TranscriptListView: React.FC = () => {

	const { isMobile } = useGlobalContext()

	const { getListTranscript } = useTranscriptAPI()
	const [listTranscript, setListTranscript] = useState<Array<any>>([])
	const [searchText, setSearchText] = useState<string | null>(null)

	const filteredTranscripts = useMemo(() => {
		if (!searchText) {
			return listTranscript
		}

		const regex = new RegExp(searchText, 'i')

		return listTranscript.filter((transcript) => {
			return regex.test(transcript.id) ||regex.test(transcript.name)
		}).sort((a, b) => a.name.localeCompare(b.name))

	}, [searchText, listTranscript])

	const { isLoading, isError, error } = useQuery(['transcripts'], () => getListTranscript(), {
		onSuccess: (data) => {
			setListTranscript(data)
		}
	})

	if (isLoading)
		return <Loading/>

	if (isError)
		return <QueryError error={error}/>

	return (
		<Box display='flex' flexDirection='column' alignItems='stretch' paddingX={5}>
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
					<Button variant='contained' color='primary' onClick={() => console.log('create Transcript')}>
						{
							isMobile ? <AddIcon/> : <Typography fontWeight='bold'>Create</Typography>
						}
					</Button>
				</Box>
			</Box>

			<ListView columns={columns} rows={filteredTranscripts}/>
		</Box>
	)
}

export default TranscriptListView
