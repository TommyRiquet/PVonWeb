import { useState } from 'react'

import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'


const PasswordTextField = (props : any) => {

	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	return (
		<TextField
			{...props}
			type={isPasswordVisible ? 'text' : 'password'}
			InputProps={{
				endAdornment: (
					<InputAdornment position='end'>
						<IconButton onClick={() => {setIsPasswordVisible(!isPasswordVisible)}}>
							{isPasswordVisible ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				)
			}}
		/>
	)
}

export {PasswordTextField}