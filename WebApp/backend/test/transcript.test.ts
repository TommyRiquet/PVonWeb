const fetchTranscript = require('node-fetch')

describe('Testing for the /transcript routes', function() {

	it('Should responds 200 to /transcript', async () => {
		let res = await fetchTranscript('http://localhost:3001/api/transcript/')
		expect(res.status).toEqual(200)
	})

	it ('Should responds 200 to /transcript with valid token', async () => {
		let validToken = await fetchTranscript('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTranscript('http://localhost:3001/api/transcript', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 1
			}
		})
		expect(res.status).toEqual(200)
	})

	it ('Should responds with an empty list', async () => {
		let validToken = await fetchTranscript('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTranscript('http://localhost:3001/api/transcript', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 1
			}
		})

		let json = await res.json()

		expect(json.length).toEqual(0)
	})



})
