import fetch from 'node-fetch'

export const fetchAPI = async (url: string) => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
	  		'Content-Type': 'application/json'
		}
	})

	return await response.json()
}
