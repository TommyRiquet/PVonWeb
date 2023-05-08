import { useState } from 'react'

import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { ListView, Loading } from 'components/common'

import { useGlobalContext } from 'contexts/GlobalContext'

import { Tag, useTagsAPI } from 'services/tags.services'
import TagsAddDialog from './TagsAddDialog'
import useCurrentUser from 'hooks/useCurrentUser'
import { useQuery } from 'react-query'

const columns = [
	{
		field: 'name',
		headerName: 'Name',
		width: 200
	},
	{
		field: 'description',
		headerName: 'Description',
		flex: 1,
		minWidth: 150
	}
]


const TagsListView: React.FC = () => {

	const { isMobile } = useGlobalContext()
	const { userProfile } = useCurrentUser()

	const { getTags } = useTagsAPI()
	const [listTags, setListTags] = useState<Array<Tag>>([])
	const [openAddTagDialog, setOpenAddTagDialog] = useState<boolean>(false)

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
			<Box display='flex' justifyContent='end' paddingY={3}>
				{
					userProfile?.role === 'admin' &&
					<Button variant='contained' color='primary' onClick={() => setOpenAddTagDialog(true)}>
						{
							isMobile ? <AddIcon/> : <Typography fontWeight='bold'>Add Tag</Typography>
						}
					</Button>
				}
			</Box>

			<ListView columns={columns} rows={listTags}/>
		</Box>
	)
}

export default TagsListView
