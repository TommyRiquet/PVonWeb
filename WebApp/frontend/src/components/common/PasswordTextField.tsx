import { FC, useState } from 'react'

import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface PasswordTextFieldProps {
	label: string
	variant?: 'standard' | 'filled' | 'outlined'
	id?: string
}

const PasswordTextField: FC<PasswordTextFieldProps> = (props : any) => {

	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	return (
		<TextField
			{...props}
			type={isPasswordVisible ? 'text' : 'password'}
			sx={{ width: '100%'}}
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

export default PasswordTextField
