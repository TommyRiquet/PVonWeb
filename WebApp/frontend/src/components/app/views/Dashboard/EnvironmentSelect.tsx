import { FC } from 'react'

import { Select, MenuItem } from '@mui/material'

import { useAppContext, useGlobalContext } from 'contexts'

const EnvironmentSelect: FC = () => {

	const { selectedEnvironment, listEnvironment, changeSelectedEnvironment } = useAppContext()

	const { isMobile } = useGlobalContext()

	const handleChangeEnvironment = (name: string) => {
		const environment = listEnvironment.find(environment => environment.name === name)
		if(environment){
			changeSelectedEnvironment(environment)
			window.location.reload()
		}
	}

	if(!listEnvironment || listEnvironment.length <= 1)
		return null

	return (
		<Select
			value={!isMobile && selectedEnvironment?.name}
			variant='outlined'
			size='small'
			onChange={(e) => handleChangeEnvironment(e.target.value as string)}
			sx={{
				'& .MuiOutlinedInput-notchedOutline': {
					border: 'none'
				},
				'& .MuiSelect-select': {
					padding: '0 0.5rem'
				}
			}}
		>
			{
				listEnvironment.map(environment => (
					<MenuItem key={environment.id} value={environment.name}>{environment.name}</MenuItem>
				))
			}
		</Select>
	)
}

export default EnvironmentSelect
