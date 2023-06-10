const fetchEnvironment = require('node-fetch')

describe('Testing for the /environment routes', () => {

	it('Should responds 500 to /environment', async () => {
		let res = await fetchEnvironment('http://localhost:3001/api/environment')
		expect(res.status).toEqual(500)
	})


	it ('Should responds 404 to /environment with invalid token', async () => {
		let res = await fetchEnvironment('http://localhost:3001/api/environment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Token ' + 'InvalidToken',
				'X-Env-Id': 1
			}
		})
		expect(res.status).toEqual(404)
	})

	it ('Should responds 200 to /environment with valid token', async () => {
		let validToken = await fetchEnvironment('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchEnvironment('http://localhost:3001/api/environment', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`
			}
		})
		expect(res.status).toEqual(200)
	})


	it ('Should responds with only one environment', async () => {
		let validToken = await fetchEnvironment('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchEnvironment('http://localhost:3001/api/environment', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`
			}
		})

		const environments = await res.json()
		expect(environments.length).toEqual(1)
	})

	it ('Should responds with the environment 1', async () => {
		let validToken = await fetchEnvironment('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchEnvironment('http://localhost:3001/api/environment', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`
			}
		})

		const environments = await res.json()
		expect(environments[0].id).toEqual(1)
		expect(environments[0].name).toEqual('Environment 1')
		expect(environments[0].description).toEqual('Demo Environment 1')
	})


	it ('Should responds with 3 environment', async () => {
		let validToken = await fetchEnvironment('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'admin@pvonweb.com',
				password: 'adminadmin'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchEnvironment('http://localhost:3001/api/environment', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`
			}
		})

		const environments = await res.json()
		expect(environments.length).toEqual(3)
	})

	it ('Should responds with the environment 1, 2 and 3', async () => {
		let validToken = await fetchEnvironment('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'admin@pvonweb.com',
				password: 'adminadmin'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchEnvironment('http://localhost:3001/api/environment', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`
			}
		})

		const environments = await res.json()

		expect(environments[0].id).toEqual(1)
		expect(environments[0].name).toEqual('Environment 1')
		expect(environments[0].description).toEqual('Demo Environment 1')

		expect(environments[1].id).toEqual(2)
		expect(environments[1].name).toEqual('Environment 2')
		expect(environments[1].description).toEqual('Demo Environment 2')

		expect(environments[2].id).toEqual(3)
		expect(environments[2].name).toEqual('Environment 3')
		expect(environments[2].description).toEqual('Demo Environment 3')
	})

})
