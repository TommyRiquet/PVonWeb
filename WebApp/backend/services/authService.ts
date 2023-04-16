const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET as string

function generateToken(id: number): string {
  const payload = {
    id: id
  }

  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

function verifyToken(token: string): { id: number } {
  return jwt.verify(token, secret) as { id: number }
}

export {
  generateToken,
  verifyToken
}
