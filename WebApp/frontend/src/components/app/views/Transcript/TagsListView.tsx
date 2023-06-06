import { useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Box, Button, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { ListView, Loading } from 'components/common'
import TagsAddDialog from './Dialogs/TagsAddDialog'
import TagsEditDialog from './Dialogs/TagsEditDialog'

import { useGlobalContext, useAppContext } from 'contexts'

import { Tag, useTagsAPI } from 'services/tags.services'
import TagsDeleteDialog from './Dialogs/TagsDeleteDialog'


const TagsListView: React.FC = () => {

	const { isMobile } = useGlobalContext()
	const { currentRole } = useAppContext()
	const { t } = useTranslation()

	const { getTags } = useTagsAPI()
	const [listTags, setListTags] = useState<Array<Tag>>([])
	const [openAddTagDialog, setOpenAddTagDialog] = useState<boolean>(false)
	const [openEditTagDialog, setOpenEditTagDialog] = useState<boolean>(false)
	const [openDeleteTagDialog, setOpenDeleteTagDialog] = useState<boolean>(false)
	const [ selectedTag, setSelectedTag ] = useState<Tag>(listTags[0])

	const handleEditClick = (tag: Tag) => {
		setSelectedTag(tag)
		setOpenEditTagDialog(true)
	}

	const handleDeleteClick = async (tag: Tag) => {
		setSelectedTag(tag)
		setOpenDeleteTagDialog(true)
	}

	const columns = useMemo(() => {
		return [
			{
				field: 'name',
				headerName: t('Name'),
				width: 200
			},
			{
				field: 'description',
				headerName: t('Description'),
				flex: 1,
				minWidth: 150
			},
			{
				field: 'buttons',
				headerName: '',
				hideable: false,
				sortable: false,
				editable: false,
				width: 200,
				renderCell: (value: any) => (
					(currentRole === 'admin' || currentRole === 'owner') &&
					<Box display='flex' flexDirection='row' justifyContent='space-between'>
						<Tooltip title={t('Edit tag')} placement='top' arrow>
							<Button onClick={() => handleEditClick(value.row)} variant='contained' color='primary' sx={{marginRight: 1}}>
								<EditIcon/>
							</Button>
						</Tooltip>
						<Tooltip title={t('Delete tag')} placement='top' arrow>
							<Button variant='outlined' onClick={() => handleDeleteClick(value.row)}>
								<DeleteIcon/>
							</Button>
						</Tooltip>
					</Box>
				)
			}
		]}, [])


	const { isLoading } = useQuery(['tags'], () => getTags(), {
		onSuccess: (data) => {
			setListTags(data)
		}
	})

	if (isLoading)
		return <Loading/>

	return (
		<Box display='flex' flexDirection='column' alignItems='stretch' paddingX={5}>
			<TagsAddDialog open={openAddTagDialog} handleClose={() => setOpenAddTagDialog(false)}/>
			<TagsEditDialog open={openEditTagDialog} handleClose={() => setOpenEditTagDialog(false)} tag={selectedTag}/>
			<TagsDeleteDialog open={openDeleteTagDialog} handleClose={() => setOpenDeleteTagDialog(false)} tag={selectedTag}/>
			<Box display='flex' justifyContent='end' paddingY={3}>
				{
					currentRole === 'admin' &&
					<Button variant='contained' color='primary' onClick={() => setOpenAddTagDialog(true)}>
						{
							isMobile ? <AddIcon/> : <Typography fontWeight='bold'>{t('Add Tag')}</Typography>
						}
					</Button>
				}
			</Box>

			<ListView columns={columns} rows={listTags}/>
		</Box>
	)
}

export default TagsListView
