import { Box, Container, Typography, Link } from '@mui/material'

import { PrivacyPolicy } from 'components/common'

const PrivacyView: React.FC = () => {

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
			<Container
				maxWidth='lg'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					flexDirection='column'
					marginBottom='10vh'
					padding='20px'
					borderRadius='10px'
					sx={{ backgroundColor: theme => theme.palette.secondary.main }}
				>
					<Typography variant='h4' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>Privacy Policy</Typography>
					<PrivacyPolicy/>
					<Box justifySelf='start' marginTop={2}>
						<Link href='/login' rel='noreferrer' underline='none'>
							<Typography variant='body2' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>Back to Login</Typography>
						</Link>
					</Box>
				</Box>
			</Container>
		</Box>
	)
}

export default PrivacyView
