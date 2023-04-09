import { FC, useState } from 'react'

import { Box, Button, TextField, Stack, Snackbar, Alert, Typography } from '@mui/material'

import useCurrentUser from 'hooks/useCurrentUser'

import { Loading } from 'components/common'


const ProfileSection: FC = () => {

	const [updateError, setUpdateError] = useState(false)
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const { userProfile } = useCurrentUser()

	if (!userProfile) {
		return <Loading/>
	}

	return (
		<>
			<form onSubmit={() => console.log('sent')} >
				<Snackbar
					open={updateError}
					onClose={() => {setUpdateError(false)}}
				/>
				<Snackbar
					open={updateSuccess}
					onClose={() => setUpdateSuccess(false)}
					autoHideDuration={2000}
				>
					<Alert>
						Your profile has been updated!
					</Alert>
				</Snackbar>
				<Stack alignItems='start' spacing={3} sx={{width: '35%', minWidth: '350px'}}>
					<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>Informations</Typography>
					<Box display='flex' flexDirection='row' width='100%'>
						<TextField
							label='Fist Name'
							defaultValue={userProfile?.firstName}
							fullWidth
							sx={{marginRight: '10px'}}
						/>
						<TextField
							label='Last Name'
							defaultValue={userProfile?.lastName}
							fullWidth
						/>
					</Box>
					<TextField
						label='Email'
						type='email'
						defaultValue={userProfile?.email}
						fullWidth
					/>
					<TextField
						label='Phone Number'
						defaultValue={userProfile?.phoneNumber}
						fullWidth
					/>
					<Button type='submit' variant='contained' sx={{height: 45, width: '100%'}}>
						Update Profile
					</Button>

				</Stack>
			</form>
		</>

	)
}

export default ProfileSection
