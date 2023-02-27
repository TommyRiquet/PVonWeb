import React from 'react'

import { Box, Typography, TextField, Button, Container } from '@mui/material'

import { PasswordTextField } from 'components/common'
import { useAuth } from 'contexts/AuthContext'

import theme from 'theme'


function LoginScreen() {
	const { login } = useAuth()
	const [errorMessage, setErrorMessage] = React.useState('')

	function handleSubmit(event: any) {
		event.preventDefault()
		login(
			event.target.email.value,
			event.target.password.value,
			() => {
				window.location.reload()
			},
			() => {
				setErrorMessage('Email ou mot de passe incorrect')
			}
		)
	}

	return (
		<Box>
			<Container
				maxWidth='sm'
				sx={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<form onSubmit={handleSubmit} style={{ width: '100%' }}>
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						flexDirection='column'
						marginBottom='10vh'
						padding='20px'
						borderRadius='10px'
						sx={{ backgroundColor: theme.palette.secondary.main }}
					>
						<Typography p={'10px 0'}>Login</Typography>
						<TextField
							label='Email'
							variant='outlined'
							sx={{ marginTop: '10px', minWidth: '54%' }}
							id='email'
						/>
						<PasswordTextField
							label='Mot de passe'
							variant='outlined'
							sx={{ marginTop: '10px' }}
							id='password'
						/>
						<Typography color='error' p={'10px 0'}>
							{errorMessage}
						</Typography>
						<Button
							variant='contained'
							sx={{ marginTop: '10px' }}
							type='submit'
						>
							Se connecter
						</Button>
					</Box>
				</form>
			</Container>
		</Box>
	)
}

export default LoginScreen
