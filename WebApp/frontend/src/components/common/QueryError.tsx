import React, { useEffect, useState } from 'react'


import { Box, Typography } from '@mui/material'
import SignalWifiConnectedNoInternet4SharpIcon from '@mui/icons-material/SignalWifiConnectedNoInternet4Sharp'
import GppBadIcon from '@mui/icons-material/GppBad'
import ErrorIcon from '@mui/icons-material/Error'
import StorageIcon from '@mui/icons-material/Storage'
import HelpIcon from '@mui/icons-material/Help'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'

import _ from 'lodash'


export enum ErrorType {
    NETWORK = 'network',
    PERMISSION = 'permission',
    INTERNAL = 'internal',
    UNKNOWN = 'unknown',
    NOT_FOUND = 'not_found',
    BAD_REQUEST = 'bad_request',
}

const errorDetail = {
	[ErrorType.NETWORK]: {
		text: 'Network Error',
		icon: <SignalWifiConnectedNoInternet4SharpIcon color={'disabled'} sx={{fontSize: '80px'}}/>
	},
	[ErrorType.PERMISSION]: {
		text: 'Permission Denied',
		icon: <GppBadIcon color={'disabled'} sx={{fontSize: '80px'}}/>
	},
	[ErrorType.INTERNAL]: {
		text: 'Internal Error',
		icon: <StorageIcon color={'disabled'} sx={{fontSize: '80px'}}/>
	},
	[ErrorType.UNKNOWN]: {
		text: 'Unknown Error',
		icon: <ErrorIcon color={'disabled'} sx={{fontSize: '80px'}}/>
	},
	[ErrorType.NOT_FOUND]: {
		text: 'Not Found',
		icon: <HelpIcon color={'disabled'} sx={{fontSize: '80px'}}/>
	},
	[ErrorType.BAD_REQUEST]: {
		text: 'Bad Request',
		icon: <ThumbDownAltIcon color={'disabled'} sx={{fontSize: '80px'}}/>
	}
}

interface QueryErrorProps {
  error?: any
  statusCode?: number
}

const QueryError: React.FC<QueryErrorProps> = ({error, statusCode}) => {

	const [errorType, setErrorType] = useState<ErrorType>(ErrorType.UNKNOWN)

	useEffect(() => {
		const status = statusCode || _.get(error, 'response.status')
		const message = _.get(error, 'message')
		if (status === 400) {
			setErrorType(ErrorType.BAD_REQUEST)
		} else if (status === 403 || status === 401) {
			setErrorType(ErrorType.PERMISSION)
		} else if (status === 404) {
			setErrorType(ErrorType.NOT_FOUND)
		} else if(status === 500) {
			setErrorType(ErrorType.INTERNAL)
		} else if (message === 'Network Error') {
			setErrorType(ErrorType.NETWORK)
		} else {
			setErrorType(ErrorType.UNKNOWN)
		}
	}, [error, statusCode])

	return (
		<Box width='100%' height='100%' padding={4} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
			{errorDetail[errorType].icon}
			<Typography variant='h6' color='gray'>{errorDetail[errorType].text}</Typography>
		</Box>
	)
}

export default QueryError
