import { FC, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { Box, Snackbar, Alert, Typography, Select, MenuItem, FormControl } from '@mui/material'

import { useAppContext } from 'contexts'

import useCurrentUser from 'hooks/useCurrentUser'

import { Language, useUserAPI } from 'services/users.services'


const LanguageSelectSettings: FC = () => {

	const [updateError, setUpdateError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('Unknown error, please try again.')
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const queryClient = useQueryClient()

	const { userProfile } = useAppContext()

	const { t } = useTranslation()

	const { updateLanguage } = useCurrentUser()

	const { changeLanguage } = useUserAPI()

	const handleChangeLanguage = (event: any) => {

		changeLanguage(event.target.value).then(res => {
			if (res) {
				setUpdateSuccess(true)
				updateLanguage(event.target.value)
				queryClient.invalidateQueries(['userProfile'])
			} else {
				setUpdateError(true)
				setErrorMessage(t('Unknown error, please try again.') as string)
			}
		})

	}


	return (
		<>
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
				onClose={() => setUpdateSuccess(false)}
				autoHideDuration={2000}
			>
				<Alert>
					{t('Your language has been updated.')}
				</Alert>
			</Snackbar>
			<Box display='flex' flexDirection='column' width='100%' padding={2}>
				<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>{t('Language')}</Typography>
				<FormControl fullWidth sx={{marginTop: 1}}>
					<Select
						fullWidth
						defaultValue={userProfile?.language}
						onChange={handleChangeLanguage}
						sx={{ marginBottom: 2 }}
					>
						{
							Object.keys(Language).map((key: string) => (
								<MenuItem key={key} value={key}>{Language[key as keyof typeof Language]}</MenuItem>
							))
						}
					</Select>
				</FormControl>
			</Box>
		</>

	)
}

export default LanguageSelectSettings
