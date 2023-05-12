import { FC, useState } from 'react'

import { Box, Dialog, TextField, Typography, Button, CircularProgress, Snackbar, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useTagsAPI }  from 'services/tags.services'
import { useQueryClient } from 'react-query'


interface TeamAddMemberDialogProps {
	open: boolean
	handleClose: () => void
}


const ProfileSchema = yup.object().shape({
	name: yup.string().required('This field is required'),
	description: yup.string()
})


const DisplayTagSuccessDialog: FC = () => {
	return (
		<Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' margin={3}>
			<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold'>
				Tag has been created successfully !
			</Typography>
		</Box>
	)
}

const TagsAddDialog: FC<TeamAddMemberDialogProps> = ({open, handleClose}) => {

	const [updateError, setUpdateError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const queryClient = useQueryClient()

	const [showSuccessDialog, setShowSuccessDialog] = useState(false)

	const { createTag } = useTagsAPI()

	const { handleSubmit, control, setValue, formState: { errors }} = useForm({ resolver: yupResolver(ProfileSchema) })

	const handleAddMember = async (data: any) => {
		setIsLoading(true)
		const result = await createTag(data)
		if (result.status === 200) {
			setIsLoading(false)
			setUpdateSuccess(true)
			setShowSuccessDialog(true)
			setTimeout(() => {
				handleCloseDialog()
			}, 2000)
		} else if (result.errno === 1062) {
			setIsLoading(false)
			setUpdateError(true)
			setErrorMessage('Tag name already exists')
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
		setValue('name', '')
		setValue('description', '')
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
					Tags has been created successfully !
				</Alert>
			</Snackbar>
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' margin={3}>
				<CloseIcon fontSize='large' color='disabled' onClick={handleCloseDialog} sx={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer' }}/>
				<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>Add Tag</Typography>
				{
					showSuccessDialog ?
						<DisplayTagSuccessDialog/>
						:
						<form onSubmit={handleSubmit((data) => handleAddMember(data))} >
							<Controller
								render={({ field }) => (
									<TextField
										label='Tag Name'
										fullWidth
										margin='normal'
										variant='outlined'
										size='small'
										error={!!errors.name}
										helperText={errors.name?.message as string}
										sx={{ marginRight: 1 }}
										{...field}
									/>
								)}
								name='name'
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<TextField
										label='Tag Description'
										fullWidth
										margin='normal'
										variant='outlined'
										size='small'
										error={!!errors.description}
										helperText={errors.description?.message as string}
										{...field}
									/>
								)}
								name='description'
								control={control}
							/>
							<Button type='submit' variant='contained' disabled={isLoading} sx={{height: 45, width: '100%', marginTop: 2}}>
								{ isLoading ? <CircularProgress size={25} /> : 'Add Tag' }
							</Button>
						</form>
				}
			</Box>
		</Dialog>
	)
}



export default TagsAddDialog
