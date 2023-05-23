import { FC, useEffect, useState } from 'react'

import { useQueryClient } from 'react-query'
import { Button, Box, TextField, Snackbar, Alert, Typography, CircularProgress } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAppContext } from 'contexts'

import useCurrentEnv from 'hooks/useCurrentEnv'

import { useEnvironmentAPI } from 'services/environment.services'


const EnvironmentSchema = yup.object().shape({
	name: yup.string().required('This field is required').max(40, 'Environment\'s Name must be at most 40 characters')
})

const GeneralEnvironmentSettings: FC = () => {

	const queryClient = useQueryClient()

	const [updateError, setUpdateError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('Unknown error, please try again.')
	const [updateSuccess, setUpdateSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { updateEnvironment } = useEnvironmentAPI()
	const { selectedEnvironment } = useCurrentEnv()
	const { currentRole } = useAppContext()

	const { handleSubmit, setValue, control, formState: { errors }} = useForm({ resolver: yupResolver(EnvironmentSchema) })

	const handleChangeEnvName = async (data: any) => {
		setIsLoading(true)
		const result = await updateEnvironment(data, String(selectedEnvironment?.id))
		if ('id' in result) {
			setIsLoading(false)
			setUpdateSuccess(true)
			queryClient.invalidateQueries('environments')
		} else {
			setIsLoading(false)
			setUpdateError(true)
			setErrorMessage(result.message)
		}
	}

	useEffect(() => {
		if (selectedEnvironment) {
			setValue('name', selectedEnvironment.name)
		}
	}, [selectedEnvironment])


	return (
		<>
			<form onSubmit={handleSubmit((data) => handleChangeEnvName(data))} style={{width: '100%'}} >
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
						Your environment has been updated.
					</Alert>
				</Snackbar>
				<Box display='flex' flexDirection='column' width='100%' padding={2}>
					<Typography variant='h6' color={theme => theme.palette.primary.main} fontWeight='bold'>Environment</Typography>
					<Controller
						render={({ field }) => (
							<TextField
								label='Environment name'
								fullWidth
								error={!!errors.name}
								helperText={errors.name?.message as string}
								disabled={currentRole !== 'admin'}
								sx={{ marginY: 2 }}
								{...field}
							/>
						)}
						name='name'
						control={control}
						defaultValue={''}
					/>
					{
						currentRole === 'admin' &&
						<Button type='submit' variant='contained' disabled={isLoading} sx={{height: 45, width: '100%'}}>
							{ isLoading ? <CircularProgress size={25} /> : 'Update' }
						</Button>
					}
				</Box>
			</form>
		</>

	)
}

export default GeneralEnvironmentSettings
