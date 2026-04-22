import jwt from 'jsonwebtoken';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return secret;
};

const getAccessTokenExpiry = () => process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const getRefreshTokenExpiry = () => process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

export const generateAccessToken = ({ userId, role }) => {
  const jwtSecret = getJwtSecret();

  return jwt.sign({ userId, role }, jwtSecret, {
    expiresIn: getAccessTokenExpiry(),
  });
};

export const generateRefreshToken = ({ userId, role }) => {
  const jwtSecret = getJwtSecret();

  return jwt.sign({ userId, role }, jwtSecret, {
    expiresIn: getRefreshTokenExpiry(),
  });
};

export const generateTokens = ({ userId, role }) => {
  const accessToken = generateAccessToken({ userId, role });
  const refreshToken = generateRefreshToken({ userId, role });

  return { accessToken, refreshToken };
};

export const verifyToken = (token) => {
  try {
    const jwtSecret = getJwtSecret();

    return jwt.verify(token, jwtSecret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw error;
  }
};

export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};
