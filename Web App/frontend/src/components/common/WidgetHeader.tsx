import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import theme from 'theme'

export interface elementLabelDescription {
    label: string
    description: string
}

interface WidgetHeaderInterface {
    children?: React.ReactNode
	title?: string
    tooltipTexts?: (string | elementLabelDescription)[]
    isInternal?: boolean
}


const WidgetHeader: FC<WidgetHeaderInterface> = ({children, title, isInternal}) => {
	return (
		<Box display='flex' width='100%' alignContent='center' alignItems='center' justifyContent='space-between' paddingBottom={theme.spacing(1)}>
			<Box display='flex'>
				{isInternal}
				<Typography color='primary' textTransform={'capitalize'} variant='h5'>{title}</Typography>
			</Box>
			{children}
		</Box>
	)
}

export default WidgetHeader