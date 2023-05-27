import { FC, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { Box, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'


interface CopyToClipboardButtonI {
    label: string
}


const CopyToClipboardButton: FC<CopyToClipboardButtonI> = ({label}) => {

	const { t } = useTranslation()

	const [ tooltipText, setTooltipText ] = useState(t('Copy to clipboard'))
	const [ isOpen, setIsOpen ] = useState(false)

	const handleClick = () => {
		navigator.clipboard.writeText(label)
		setTooltipText(t('Copied'))
		setIsOpen(true)
		setTimeout(resetTooltip, 1500)
	}

	const resetTooltip = () => {
		setIsOpen(false)
		setTimeout(() => setTooltipText(t('Copy to clipboard')), 200)
	}

	return (
		<Box display='flex' justifyContent='center' alignItems='center' marginLeft={1}>
			<Tooltip title={tooltipText} onClose={resetTooltip} placement='top' open={isOpen} arrow >
				<Box display='flex' alignItems='flex-end' onClick={handleClick} onMouseEnter={() => setIsOpen(true)} onMouseLeave={resetTooltip} sx={{cursor: 'pointer'}}>
					<ContentCopyIcon sx={{fontSize: 'large'}} color='primary'/>
				</Box>
			</Tooltip>
		</Box>
	)
}

export default CopyToClipboardButton
