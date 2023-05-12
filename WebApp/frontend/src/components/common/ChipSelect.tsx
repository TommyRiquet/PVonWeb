import React from 'react'

import { Box, Select, MenuItem, SelectChangeEvent, Chip, InputLabel, FormControl } from '@mui/material'

interface Chip {
	name: string
}
interface ChipSelectI {
	label: string
	allChips: Chip[]
	selectedChips: Chip[]
	handleChange: (event: SelectChangeEvent<string>) => void
}


const ChipSelect: React.FC<ChipSelectI> = ({ label, allChips, selectedChips, handleChange }) => {

	return (
		<FormControl fullWidth>
			<InputLabel id='chip-select-label'>{label}</InputLabel>
			<Select
				fullWidth
				multiple
				size='small'
				labelId='chip-select-label'
				label={label}
				value={selectedChips.map((item) => item.name) as any}
				onChange={handleChange}
				sx={{
					marginY: 0.5,
					minHeight: '50px'
				}}
				renderValue={(selected: any) => (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{
							selected.map((value: string) => (
								<Chip key={value} label={value} />
							))
						}
					</Box>
				)}
			>
				{
					allChips.map((chip) => {
						return (
							<MenuItem key={chip.name} value={chip.name}>
								{chip.name}
							</MenuItem>
						)
					})
				}
			</Select>
		</FormControl>
	)
}

export default ChipSelect
