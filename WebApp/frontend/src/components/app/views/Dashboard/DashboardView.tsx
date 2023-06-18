import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { Responsive, WidthProvider, Layout  } from 'react-grid-layout'

import { HistoryWidget, TranscriptWidget, TeamWidget, StatisticsWidget } from 'components/app/views/Dashboard/widgets'
import { Widget } from 'components/common'
import EnvironmentSelect from './EnvironmentSelect'

import { useGlobalContext } from 'contexts/GlobalContext'

import useStorage from 'hooks/useStorage'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'


const WidgetsList = {
	'HistoryWidget': <Widget title='History'><HistoryWidget/></Widget>,
	'TranscriptWidget': <Widget title='Transcripts'><TranscriptWidget/></Widget>,
	'TeamsWidget': <Widget title='Team'><TeamWidget/></Widget>,
	'StatisticsWidget': <Widget title='Statistics'><StatisticsWidget/></Widget>
}

const defaultLayout = [
	{ i: WidgetsList.HistoryWidget, x: 0, y: 0, w: 1, h: 4 },
	{ i: WidgetsList.TranscriptWidget, x: 1, y: 0, w: 1, h: 4 },
	{ i: WidgetsList.TeamsWidget, x: 2, y: 0, w: 1, h: 2 },
	{ i: WidgetsList.StatisticsWidget, x: 2, y: 1, w: 1, h: 2}
]

const DashboardView = () => {

	const { isMobile } = useGlobalContext()

	const { t } = useTranslation()

	const { getStorageItem, setStorageItem } = useStorage()



	const ResponsiveReactGridLayout = WidthProvider(Responsive)
	const widgetArray = defaultLayout

	const layouts = useMemo(() => {
		return getStorageItem('layout')
	}, [])

	const onLayoutChange = (layout: Layout[]) => {
		setStorageItem('layout', layout)
	}

	return (
		<Box flexGrow={1} padding={2}>
			<Box display='flex' flexDirection='row' justifyContent='space-between' paddingRight={3}>
				<Typography variant='h4' color={theme => theme.palette.primary.main} fontWeight='bold' paddingBottom={2}>{t('Dashboard')}</Typography>
				<EnvironmentSelect/>
			</Box>
			<ResponsiveReactGridLayout
				className='layout'
				breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
				cols={{lg: 3, md: 3, sm: 2, xs: 1, xxs: 1}}
				layouts={layouts !== undefined ? layouts : defaultLayout}
				onLayoutChange={onLayoutChange}
			>
				{
					widgetArray.map((widget, index) => {
						return (
							<Box
								className='reactGridItem'
								key={index}
								data-grid={{
									x: layouts === null || layouts === undefined ? widget.x : layouts[index].x,
									y: layouts === null || layouts === undefined ? widget.y : layouts[index].y,
									w: layouts === null || layouts === undefined ? widget.w : layouts[index].w,
									h: layouts === null || layouts === undefined ? widget.h : layouts[index].h,
									i: layouts === null || layouts === undefined ? widget.i : layouts[index].i,
									minW: 1,
									maxW: 1,
									minH: 2,
									maxH: 4,
									minX: 0,
									maxX: 2,
									minY: 0,
									maxY: 2,
									isDraggable: !isMobile,
									isResizable: !isMobile,
									isBounded: true
								}}
							>
								{widget.i}
							</Box>
						)})
				}
			</ResponsiveReactGridLayout>
		</Box>
	)
}

export default DashboardView
