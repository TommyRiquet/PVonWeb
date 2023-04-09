const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET as string

function generateToken(id: number, name: string, email: string): string {
  const payload = {
    id: id,
    name: name,
    email: email
  }

  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

function verifyToken(token: string): { id: number, name: string, email: string } {
  return jwt.verify(token, secret) as { id: number, name: string, email: string }
}

export {
  generateToken,
  verifyToken
}
