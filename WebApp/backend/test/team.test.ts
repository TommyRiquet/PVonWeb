const fetchTeam = require('node-fetch')

describe('Testing for the /team routes', function() {

	it ('Should responds 200 to /team/members with valid token', async () => {
		let validToken = await fetchTeam('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTeam('http://localhost:3001/api/team/members', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 1
			}
		})
		expect(res.status).toEqual(200)
	})

	it ('Should responds with the corresponding team members for environement 1', async () => {
		let validToken = await fetchTeam('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTeam('http://localhost:3001/api/team/members', {
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

	it ('Should responds with the corresponding team members for environement 2', async () => {
		let validToken = await fetchTeam('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'admin@pvonweb.com',
				password: 'adminadmin'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTeam('http://localhost:3001/api/team/members', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 2
			}
		})

		let json = await res.json()

		expect(json.length).toEqual(2)
	})

	it ('Should responds with the corresponding team members for environement 3', async () => {
		let validToken = await fetchTeam('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'admin@pvonweb.com',
				password: 'adminadmin'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchTeam('http://localhost:3001/api/team/members', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 3
			}
		})

		let json = await res.json()

		expect(json.length).toEqual(2)
	})

})
