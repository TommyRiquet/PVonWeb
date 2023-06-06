const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET as string

function generateToken(email: string): string {
	const payload = {
		email: email
	}

	return jwt.sign(payload, secret, { expiresIn: '10h' })
}

function verifyToken(token: string): { email: string } {
	return jwt.verify(token, secret) as { email: string }
}

export {
	generateToken,
	verifyToken
}
