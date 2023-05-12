import { useMemo, useState } from 'react'

import { useQuery } from 'react-query'
import { DateTime } from 'luxon'
import { Box, Button, Chip, TextField, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { ListView, Loading, QueryError } from 'components/common'

import { useGlobalContext } from 'contexts/GlobalContext'

import { Transcript, useTranscriptAPI } from 'services/transcripts.services'
import { Tag } from 'services/tags.services'
import TranscriptEditDialog from './Dialogs/TranscriptEditDialog'



const TranscriptListView: React.FC = () => {

	const { isMobile } = useGlobalContext()

	const { getListTranscript } = useTranscriptAPI()
	const [listTranscript, setListTranscript] = useState<Array<any>>([])
	const [searchText, setSearchText] = useState<string | null>(null)
	const [openEditTranscriptDialog, setOpenEditTranscriptDialog] = useState<boolean>(false)
	const [ selectedTranscript, setSelectedTranscript ] = useState<Transcript>(listTranscript[0])

	const handleEditClick = (transcript: Transcript) => {
		setSelectedTranscript(transcript)
		setOpenEditTranscriptDialog(true)
	}

	const handleDeleteClick = async (transcript: Transcript) => {
		setSelectedTranscript(transcript)
		setOpenEditTranscriptDialog(true)
	}

	const columns = useMemo(() => {
		return [
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
			},
			{
				field: 'tags',
				headerName: 'Tags',
				hideable: false,
				flex: 1,
				minWidth: 200,
				sortable: false,
				renderCell: (params: any) => {
					return (
						<Box display='flex' flexWrap='nowrap'>
							{
								params.row.tags.map((tag: Tag) => (
									<Chip key={tag.id} label={tag.name} sx={{margin: 0.5}}/>
								))
							}
						</Box>
					)
				}
			},
			{
				field: 'buttons',
				headerName: '',
				hideable: false,
				sortable: false,
				editable: false,
				width: 200,
				renderCell: (value: any) => (
					<Box display='flex' flexDirection='row' justifyContent='space-between'>
						<Tooltip title='Edit transcript' placement='top' arrow>
							<Button onClick={() => handleEditClick(value.row)} variant='contained' color='primary' sx={{marginRight: 1}}>
								<EditIcon/>
							</Button>
						</Tooltip>
						<Tooltip title='Delete transcript' placement='top' arrow>
							<Button variant='outlined' onClick={() => handleDeleteClick(value.row)}>
								<DeleteIcon/>
							</Button>
						</Tooltip>
					</Box>
				)
			}
		]}, [])

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
				<TranscriptEditDialog open={openEditTranscriptDialog} handleClose={() => setOpenEditTranscriptDialog(false)} transcript={selectedTranscript}/>
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
