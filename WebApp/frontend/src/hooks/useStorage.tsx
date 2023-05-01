import _ from 'lodash'

const useStorage = () => {

	const getStorageItem = (key: string, defaultValue?: any) => {
		const keys = key.split('.')
		const item = localStorage.getItem(keys[0])

		if (!item)
			return defaultValue

		if (keys.length > 1) {
			return _.get(JSON.parse(item), keys.slice(1), defaultValue)
		}

		return JSON.parse(item)
	}

	const setStorageItem = (key: string, value: any) => {
		const keys = key.split('.')

		if(keys.length > 1) {
			const currentValue = getStorageItem(keys[0], {})
			_.set(currentValue, keys.slice(1), value)
			localStorage.setItem(keys[0], JSON.stringify(currentValue))
		}
		else {
			localStorage.setItem(keys[0], JSON.stringify(value))
		}
	}

	const clearStorage = () => {
		localStorage.clear()
	}

	return {
		getStorageItem,
		setStorageItem,
		clearStorage
	}
}

export default useStorage
