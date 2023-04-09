import React from 'react'

import { Box, CircularProgress } from '@mui/material'


const Loading: React.FC= () => {

	return (
		<Box width='100%' height='100%' padding={4} display='flex' justifyContent='center' alignItems='center'>
			<CircularProgress/>
		</Box>
	)
}

export default Loading
