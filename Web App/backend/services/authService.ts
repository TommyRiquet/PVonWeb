const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET as string;

function generateToken(test: string): string {
  const payload = {
    id: '1',
    username: 'test',
    email: 'test',
  };

  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

function verifyToken(token: string): { id: number; username: string; email: string } {
  return jwt.verify(token, secret) as { id: number; username: string; email: string };
}

export default {
  generateToken,
  verifyToken,
};
