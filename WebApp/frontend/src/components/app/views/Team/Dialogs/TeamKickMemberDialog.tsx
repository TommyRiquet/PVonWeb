import { FC, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { Box, Dialog, Typography, Button, CircularProgress, Snackbar, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { User } from 'services/users.services'
import { useTeamAPI } from 'services/teams.services'


interface TeamKickMemberDialogProps {
	open: boolean
	user: User
	handleClose: () => void
}

const DisplayTranscriptSuccessDialog: FC = () => {
	const { t } = useTranslation()
	return (
		<Box display='flex' flexDirection='row' justifyContent='center' alignItems='center' margin={3}>
			<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold'>
				{t('User has been kick successfully !')}
			</Typography>
		</Box>
	)
}

const TeamKickMemberDialog: FC<TeamKickMemberDialogProps> = ({open, user, handleClose}) => {

	const { t } = useTranslation()

	const [updateError, setUpdateError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showSuccessDialog, setShowSuccessDialog] = useState(false)

	const { kickUser } = useTeamAPI()

	const queryClient = useQueryClient()


	const handleKickUser = async () => {
		setIsLoading(true)
		const result = await kickUser(user)
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
		queryClient.invalidateQueries(['members'])
		setIsLoading(false)
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
					{t('User has been kicked successfully !')}
				</Alert>
			</Snackbar>
			<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' margin={3}>
				<CloseIcon fontSize='large' color='disabled' onClick={handleCloseDialog} sx={{ position: 'absolute', top: 10, right: 15, cursor: 'pointer' }}/>
				<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>{t('Kick user')}</Typography>
				{
					showSuccessDialog ?
						<DisplayTranscriptSuccessDialog/>
						:
						<>
							<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold' sx={{marginTop: 2}}>
								{t('Are you sure you want to kick this user ?')}
							</Typography>
							<Typography variant='body1' color={theme => theme.palette.primary.main} fontWeight='bold' sx={{marginTop: 2}}>
								{t('This action is irreversible.')}
							</Typography>
							<Typography variant='body1' color={theme => theme.palette.primary.main} sx={{marginTop: 2}}>
								{user?.firstName + ' ' + user?.lastName}
							</Typography>
							<Button onClick={handleKickUser} variant='contained' disabled={isLoading} sx={{height: 45, width: '100%', marginTop: 2}}>
								{ isLoading ? <CircularProgress size={25} /> : t('I\'m sure') }
							</Button>
						</>
				}
			</Box>
		</Dialog>
	)
}



export default TeamKickMemberDialog
