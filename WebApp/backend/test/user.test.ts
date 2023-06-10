const fetchUser = require('node-fetch')

describe('Testing for the /user routes', function() {

	it('Should responds 500 to /user', async () => {
		let res = await fetchUser('http://localhost:3001/api/user')
		expect(res.status).toEqual(500)
	})

	it ('Should responds 200 to /user with valid token', async () => {
		let validToken = await fetchUser('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		let res = await fetchUser('http://localhost:3001/api/user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${validToken}`,
				'X-Env-Id': 1
			}
		})
		expect(res.status).toEqual(200)
	})


})
