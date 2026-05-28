import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const jwtToken = {
  sign: payload => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  },

  verify: token => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError')
        throw new Error('Token expired', { cause: err });
      if (err.name === 'JsonWebTokenError')
        throw new Error('Invalid token', { cause: err });
      throw new Error('Failed to verify token', { cause: err });
    }
  },
};
