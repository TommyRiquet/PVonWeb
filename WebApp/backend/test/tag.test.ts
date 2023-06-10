const fetchTag = require('node-fetch')

describe('Testing for the /tag routes', function() {

	it('Should responds 200 to transcript/tag', async () => {
		let res = await fetchTag('http://localhost:3001/api/transcript/tag/')
		expect(res.status).toEqual(200)
	})

	it ('Should responds 200 to /transcript/tag with valid token', async () => {
		let validToken = await fetchTag('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTag('http://localhost:3001/api/transcript/tag', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 1
			}
		})
		expect(res.status).toEqual(200)
	})

	it ('Should responds with all the demo tags', async () => {
		let validToken = await fetchTag('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTag('http://localhost:3001/api/transcript/tag', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 1
			}
		})

		let json = await res.json()

		expect(json.length).toEqual(3)
	})

	it ('Should responds with the 3 demo tags name', async () => {
		let validToken = await fetchTag('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTag('http://localhost:3001/api/transcript/tag', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 1
			}
		})

		let json = await res.json()

		expect(json[0].name).toEqual('Tag 1')
		expect(json[1].name).toEqual('Tag 2')
		expect(json[2].name).toEqual('Tag 3')
	})

	it ('Should responds with the 3 demo tags description', async () => {
		let validToken = await fetchTag('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTag('http://localhost:3001/api/transcript/tag', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 1
			}
		})

		let json = await res.json()

		expect(json[0].description).toEqual('Demo Tag 1')
		expect(json[1].description).toEqual('Demo Tag 2')
		expect(json[2].description).toEqual('Demo Tag 3')
	})


	it ('Should responds with 0 correponding tags for the environment 2', async () => {
		let validToken = await fetchTag('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'admin@pvonweb.com',
				password: 'adminadmin'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTag('http://localhost:3001/api/transcript/tag', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 2
			}
		})

		let json = await res.json()

		expect(json.length).toEqual(0)
	})

	it ('Should responds with 0 correponding tags for the environment 3', async () => {
		let validToken = await fetchTag('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'admin@pvonweb.com',
				password: 'adminadmin'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTag('http://localhost:3001/api/transcript/tag', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 3
			}
		})

		let json = await res.json()

		expect(json.length).toEqual(0)
	})


})
