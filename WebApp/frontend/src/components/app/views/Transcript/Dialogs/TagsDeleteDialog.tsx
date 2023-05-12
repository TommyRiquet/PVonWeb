import { FC, useState } from 'react'

import { Box, Dialog, Typography, Button, CircularProgress, Snackbar, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { Tag, useTagsAPI }  from 'services/tags.services'
import { useQueryClient } from 'react-query'


interface TeamAddMemberDialogProps {
	open: boolean
	tag: Tag
	handleClose: () => void
}


const DisplayTagSuccessDialog: FC = () => {
	return (
		<Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' margin={3}>
			<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold'>
				Tag has been deleted successfully !
			</Typography>
		</Box>
	)
}

const TagsDeleteDialog: FC<TeamAddMemberDialogProps> = ({open, tag, handleClose}) => {

	const [updateError, setUpdateError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const queryClient = useQueryClient()

	const [showSuccessDialog, setShowSuccessDialog] = useState(false)

	const { deleteTag } = useTagsAPI()


	const handleDeleteTag = async () => {
		setIsLoading(true)
		const result = await deleteTag(tag)
		if (result.status === 200) {
			setIsLoading(false)
			setUpdateSuccess(true)
			setShowSuccessDialog(true)
			setTimeout(() => {
				handleCloseDialog()
			}, 2000)
		} else {
			setIsLoading(false)
			setUpdateError(true)
			setErrorMessage(result.message)
		}
	}

	const handleCloseDialog = () => {
		setShowSuccessDialog(false)
		handleClose()
		queryClient.invalidateQueries(['tags'])
	}

	return (
		<Dialog
			fullWidth={true}
			open={open}
			onClose={handleCloseDialog}
			transitionDuration={0}
		>
			<Snackbar
				open={updateError}
				onClose={() => {setUpdateError(false)}}
				autoHideDuration={2000}
			>
				<Alert severity='error'>
					{errorMessage}
				</Alert>
			</Snackbar>
			<Snackbar
				open={updateSuccess}
				onClose={() => { setUpdateSuccess(false)} }
				autoHideDuration={2000}
			>
				<Alert>
					Tags has been deleted successfully !
				</Alert>
			</Snackbar>
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' margin={3}>
				<CloseIcon fontSize='large' color='disabled' onClick={handleCloseDialog} sx={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer' }}/>
				<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>Delete Tag</Typography>
				{
					showSuccessDialog ?
						<DisplayTagSuccessDialog/>
						:
						<>
							<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold' sx={{marginTop: 2}}>
								Are you sure you want to delete this tag ?
							</Typography>
							<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold' sx={{marginTop: 2}}>
								This action is irreversible.
							</Typography>
							<Typography variant='body1' color={theme => theme.palette.primary.main} sx={{marginTop: 2}}>
								{tag?.name}
							</Typography>
							<Button onClick={handleDeleteTag} variant='contained' disabled={isLoading} sx={{height: 45, width: '100%', marginTop: 2}}>
								{ isLoading ? <CircularProgress size={25} /> : 'I\'m sure' }
							</Button>
						</>
				}
			</Box>
		</Dialog>
	)
}



export default TagsDeleteDialog
