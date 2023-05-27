import { FC } from 'react'

import { useTranslation } from 'react-i18next'
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

	const { t } = useTranslation()

	return (
		<Grid item {...gridProps} sx={{height: '100%'}}>
			<Item variant='outlined' sx={{
				height: '100%',
				backgroundColor: 'white',
				boxShadow: 2,
				border: '1px solid',
				borderColor: 'divider',
				color: theme => theme.palette.primary.main
			}}>
				<WidgetHeader title={t(title as string) as string} >{headerComponent}</WidgetHeader>
				{children}
			</Item>
		</Grid>
	)
}

export default Widget
