const fetchAuth = require('node-fetch')

describe('Testing for the /auth routes', function() {

	it('Should responds 200 to /auth', async () => {
		let res = await fetchAuth('http://localhost:3001/api/auth')
		expect(res.status).toEqual(200)
	})

	it('Test if login is successful with valid credentials', async () => {
		const validLoginCredentials = {
		  email: 'demo@pvonweb.com',
		  password: 'demodemo'
		}
		const validLoginResponse = await fetchAuth('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify(validLoginCredentials),
			headers: { 'Content-Type': 'application/json' }
		})

		expect(validLoginResponse.status).toEqual(200)
	  })

	  it('Test if login fails with invalid credentials', async () => {
		const invalidLoginCredentials = {
		  email: 'user@example.com',
		  password: 'wrongpassword'
		}
		const invalidLoginResponse = await fetchAuth('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify(invalidLoginCredentials),
			headers: { 'Content-Type': 'application/json' }
		})

		expect(invalidLoginResponse.status).toEqual(401)
		expect(invalidLoginResponse.statusText).toEqual('Unauthorized')
	  })

	  it('Test if login fails with empty credentials', async () => {
		const emptyLoginCredentials = {
		  email: '',
		  password: ''
		}
		const emptyLoginResponse = await fetchAuth('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify(emptyLoginCredentials),
			headers: { 'Content-Type': 'application/json' }
		})

		expect(emptyLoginResponse.status).toEqual(401)
		expect(emptyLoginResponse.statusText).toEqual('Unauthorized')
	  })

	  it('Test if token verification success with valid token', async () => {
		let validToken = await fetchAuth('http://localhost:3001/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'demo@pvonweb.com',
				password: 'demodemo'
			}),
			headers: { 'Content-Type': 'application/json' }
		}).then(res => res.json()).then(json => json.token)

		const res = await fetchAuth('http://localhost:3001/api/auth/verify', {
			method: 'POST',
			body: JSON.stringify({ token: validToken }),
			headers: { 'Content-Type': 'application/json' }
		})

		expect(res.status).toEqual(200)
		expect(res.statusText).toEqual('OK')
	  })

	it('Test if token verification fails with an invalid token', async () => {
		const invalidToken = 'InvalidToken'
		const invalidTokenResponse = await fetchAuth('http://localhost:3001/api/auth/verify', {
			method: 'POST',
			body: JSON.stringify({ token: invalidToken }),
			headers: { 'Content-Type': 'application/json' }
		})

		expect(invalidTokenResponse.status).toEqual(500)
		expect(invalidTokenResponse.statusText).toEqual('Internal Server Error')
	  })

	  it('Test if token verification fails with an empty token', async () => {
		const emptyToken = ''
		const emptyTokenResponse = await fetchAuth('http://localhost:3001/api/auth/verify', {
			method: 'POST',
			body: JSON.stringify({ token: emptyToken }),
			headers: { 'Content-Type': 'application/json' }
		})

		expect(emptyTokenResponse.status).toEqual(500)
		expect(emptyTokenResponse.statusText).toEqual('Internal Server Error')
	  })


})
