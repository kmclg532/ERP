import jwt from 'jsonwebtoken';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return secret;
};

const getAccessTokenExpiry = () => process.env.JWT_EXPIRES_IN || process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const getRefreshTokenExpiry = () => process.env.JWT_REFRESH_EXPIRES_IN || process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

export const generateAccessToken = ({ userId, role }) => {
  const jwtSecret = getJwtSecret();

  return jwt.sign({ userId, role, tokenType: 'access' }, jwtSecret, {
    expiresIn: getAccessTokenExpiry(),
  });
};

export const generateRefreshToken = ({ userId, role }) => {
  const jwtSecret = getJwtSecret();

  return jwt.sign({ userId, role, tokenType: 'refresh' }, jwtSecret, {
    expiresIn: getRefreshTokenExpiry(),
  });
};

export const generateTokens = ({ userId, role }) => {
  const accessToken = generateAccessToken({ userId, role });
  const refreshToken = generateRefreshToken({ userId, role });

  return { accessToken, refreshToken };
};

export const verifyToken = (token) => {
  if (!token || typeof token !== 'string') {
    throw new Error('Invalid or expired token');
  }

  try {
    const jwtSecret = getJwtSecret();

    return jwt.verify(token, jwtSecret, {
      algorithms: ['HS256'],
    });
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};
