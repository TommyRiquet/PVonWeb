import React, { FC } from 'react'

import { Grid } from '@mui/material'

import { WidgetHeader } from 'components/common'
import Item from './Item'

interface WidgetInterface {
	children?: React.ReactNode
    title?: string
    headerComponent?: React.ReactNode
    gridProps?: {
        xs?: number
        sm?: number
        md?: number
        lg?: number
        xl?: number
        sx?: any
    }
}


const Widget: FC<WidgetInterface> = ({title, children, gridProps, headerComponent}) => {

	return (
		<Grid item {...gridProps} sx={{height: '100%'}}>
			<Item variant='outlined' sx={{height: '100%', borderLeft: '2px solid'}}>
				<WidgetHeader title={title} >{headerComponent}</WidgetHeader>
				{children}
			</Item>
		</Grid>
	)
}

export default Widget