import { verifyToken } from '../utils/tokenUtils.js';
import AppError from '../utils/errorHandler.js';

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    const decoded = verifyToken(token);
    if (decoded.tokenType !== 'access') {
      throw new AppError('Invalid access token', 401);
    }

    req.userId = decoded.userId;
    req.user = decoded;

    next();
  } catch (error) {
    next(error instanceof AppError ? error : new AppError('Unauthorized', 401));
  }
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }

    next();
  };
};
