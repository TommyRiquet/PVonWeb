import { FC, useState } from 'react'

import { Box, Tabs, Tab, Typography } from '@mui/material'


interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

export interface TabData {
	label: string | JSX.Element
	content: React.ReactNode
	tab: string
  }

interface TopTabsProps {
	tabDataList: TabData[]
  }



function TabPanel({ children, value, index, ...other }: TabPanelProps) {
	return (
		<Box
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			sx={{width: '100%', height: '100%', padding: 3}}
			{...other}
		>
			{value === index && (
				<Box>
					{children}
				</Box>
			)}
		</Box>
	)
}


const TabsBox :FC<TopTabsProps> = ({tabDataList}) => {
	const [selectedTab, setSelectedTab] = useState<number>(0)

	const handleChange = (_: React.SyntheticEvent, newTab: number) => {
		setSelectedTab(newTab)
	}

	return (
		<Box display='flex' flexDirection='column' width='100%' height='100%'>
			<Tabs value={selectedTab} onChange={handleChange} sx={{ ml: '2rem', height: '3rem' }} textColor='secondary' TabIndicatorProps={{style: {display: 'none'}}}>
				{
					tabDataList.map((tabData, idx) => {
						return (
							<Tab
								label={
									<Typography fontWeight='bold'>{tabData.label}</Typography>
								}
								key={tabData.tab}
								sx={{
									height: selectedTab === idx ? '3.2rem' : '3rem',
									marginX: 1,
									alignSelf: 'end',
									color: 'white',
									transition: 'all 0.3s ease-in-out',
									backgroundColor: selectedTab === idx ? 'primary.dark': 'primary.main',
									borderWidth: '1px 1px 0 1px',
									borderStyle: 'solid',
									borderColor: 'whitesmoke',
									borderRadius: '1rem 1rem 0 0'
								}}/>
						)
					})
				}
			</Tabs>
			<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100%' borderRadius={2} sx={{backgroundColor: 'whitesmoke'}}>
				{tabDataList.map((tabData, idx) => (
					<TabPanel value={selectedTab} index={idx} key={tabData.tab}>
						{tabData.content}
					</TabPanel>
				))}
			</Box>
		</Box>
	)
}

export default TabsBox
