import { useState } from 'react'

import { Box, Typography, TextField, Button, Container, Stack, Paper, Snackbar, Alert, Link, CircularProgress} from '@mui/material'

import { PasswordTextField } from 'components/common'
import { useAuth } from 'contexts/AuthContext'

import { sha256 } from 'js-sha256'

import logo from 'static/images/PVWlogo512.png'

import theme from 'theme'


function LoginScreen() {
	const { login } = useAuth()
	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false)

	function handleSubmit(event: any) {
		setLoading(true)
		event.preventDefault()
		login(
			event.target.email.value,
			sha256(event.target.password.value + 'PVW'),
			() => {
				setLoading(false)
			},
			(error) => error.json()
				.then((data: any) => {
					setLoading(false)
					if (data.message)
						setErrorMessage(data.message)
					else
						setErrorMessage('An error occured')
				})
		)
	}

	return (
		<Box
			sx={{
				background: 'linear-gradient(to left top, #347571, #449342);',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden'
			}}>
			<Snackbar
				open={errorMessage.length > 0}
				onClose={() => {setErrorMessage('')}}
			>
				<Alert onClose={() => {setErrorMessage('')}} severity='error'>
					{errorMessage}
				</Alert>
			</Snackbar>
			<Container
				maxWidth='sm'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
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
						<Box width='100%' display='flex' flexDirection='column' alignItems='center' justifyContent='space-between' marginBottom={1}>
							<img src={logo} alt='logo' style={{ width: '10vh'}}/>
						</Box>
						<Stack height='100%' width='100%' justifyContent='center' alignItems='center' spacing={3}>
							<Paper elevation={0} sx={{height: 70, width: '100%'}}>
								<TextField
									label='Email'
									variant='outlined'
									sx={{ marginTop: '10px', width: '100%' }}
									id='email'
								/>
							</Paper>
							<Paper elevation={0} sx={{height: 80, width: '100%'}}>
								<PasswordTextField
									label='Password'
									variant='outlined'
									id='password'
								/>
							</Paper>
							<Paper elevation={0} sx={{width: '100%'}}>
								<Stack justifyContent='right' alignItems='left' spacing={1}>
									<Button type='submit' variant='contained' disabled={loading} sx={{height: 45, width: '100%'}}>
										{ loading ? <CircularProgress size={25} /> : <Typography variant='body1' fontWeight='bold'>Login</Typography> }
									</Button>
								</Stack>
							</Paper>
						</Stack>
					</Box>
				</form>
			</Container>
			<Link href='/policy' rel='noreferrer' underline='none' sx={{position: 'absolute', bottom: 0, right: '47%', margin: 2}}>
				<Typography variant='body2' fontWeight='bold' textAlign='end' sx={{color: theme.palette.primary.contrastText}}>
					Privacy Policy
				</Typography>
			</Link>
		</Box>
	)
}

export default LoginScreen
