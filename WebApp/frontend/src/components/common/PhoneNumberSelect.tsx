import React from 'react'

import { useTranslation } from 'react-i18next'
import { BaseTextFieldProps, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import { CountryIso2, defaultCountries, FlagEmoji, parseCountry, usePhoneInput } from 'react-international-phone'


export interface PhoneNumberSelectI extends BaseTextFieldProps {
  value: string
  onChange: (phone: string) => void
}

export const PhoneNumberSelect: React.FC<PhoneNumberSelectI> = ({ value, onChange, ...restProps }) => {

	const { t } = useTranslation()

	const countries = defaultCountries.filter((country) => {
		const { iso2 } = parseCountry(country)
		return ['be', 'fr', 'nl'].includes(iso2)
	})

	const { phone, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({ defaultCountry: 'be', value, countries: countries, onChange: (data) => { onChange(data.phone) }})

	return (
		<TextField
			variant='outlined'
			label={t('Phone Number')}
			color='primary'
			placeholder={t('Phone Number') as string}
			value={phone}
			onChange={handlePhoneValueChange}
			type='tel'
			inputRef={inputRef}
			InputProps={{
				startAdornment: (
					<InputAdornment
						position='start'
						style={{ marginRight: '2px', marginLeft: '-8px' }}
					>
						<Select
							MenuProps={{
								style: {
									height: '300px',
									width: '360px',
									top: '10px',
									left: '-34px'
								},
								transformOrigin: {
									vertical: 'top',
									horizontal: 'left'
								}
							}}
							sx={{
								width: 'max-content',
								fieldset: {
									display: 'none'
								},
								'&.Mui-focused:has(div[aria-expanded="false"])': {
									fieldset: {
										display: 'block'
									}
								},
								'.MuiSelect-select': {
									padding: '8px',
									paddingRight: '24px !important'
								},
								svg: { right: 0 }
							}}
							value={country}
							onChange={(e) => setCountry(e.target.value as CountryIso2)}
							renderValue={(value) => (
								<FlagEmoji iso2={value} style={{ display: 'flex' }} />
							)}
						>
							{
								countries.map((c) => {
									const country = parseCountry(c)
									return (
										<MenuItem key={country.iso2} value={country.iso2}>
											<FlagEmoji
												iso2={country.iso2}
												style={{ marginRight: '8px' }}
											/>
											<Typography marginRight='8px'>{country.name}</Typography>
											<Typography color='gray'>+{country.dialCode}</Typography>
										</MenuItem>
									)
								})
							}
						</Select>
					</InputAdornment>
				)
			}}
			{...restProps}
		/>
	)
}

export default PhoneNumberSelect
