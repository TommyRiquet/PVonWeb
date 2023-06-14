const statSha256 = require('js-sha256').sha256
const fetchStatistics = require('node-fetch')

describe('Testing for the /statistics routes', function() {

	it('Should responds 200 to /statistics', async () => {
		let res = await fetchStatistics('http://localhost:3001/api/environement/statistics/')
		expect(res.status).toEqual(200)
	})

	it('Should responds 200 to /history', async () => {
		let res = await fetchStatistics('http://localhost:3001/api/environement/history/')
		expect(res.status).toEqual(200)
	})


	it ('Should responds 200 to /statistics with valid token', async () => {
		let validToken = await fetchStatistics('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: statSha256('demodemo' + 'PVW')
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchStatistics('http://localhost:3001/api/environment/statistics', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`
			}
		})
		expect(res.status).toEqual(200)
	})

	it ('Should responds 200 to /history with valid token', async () => {
		let validToken = await fetchStatistics('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: statSha256('demodemo' + 'PVW')
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchStatistics('http://localhost:3001/api/environment/history', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`
			}
		})
		expect(res.status).toEqual(200)
	})


})


describe('Testing for the /history routes', function() {


	it('Should responds 200 to /history', async () => {
		let res = await fetchStatistics('http://localhost:3001/api/environement/history/')
		expect(res.status).toEqual(200)
	})


	it ('Should responds 200 to /history with valid token', async () => {
		let validToken = await fetchStatistics('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: statSha256('demodemo' + 'PVW')
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchStatistics('http://localhost:3001/api/environment/history', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`
			}
		})
		expect(res.status).toEqual(200)
	})


	it ('Should responds with no history since there\'s no logs', async () => {
		let validToken = await fetchStatistics('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: statSha256('demodemo' + 'PVW')
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchStatistics('http://localhost:3001/api/environment/history', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`
			}
		})

		let json = await res.json()

		expect(json.length).toEqual(0)

	})


})
