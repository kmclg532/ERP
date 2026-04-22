import { verifyToken } from '../utils/tokenUtils.js';
import AppError from '../utils/errorHandler.js';

export const authenticate = (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError('No authentication token provided', 401);
    }

    // Verify token
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    req.user = decoded;

    next();
  } catch (error) {
    const statusCode = error.statusCode || 401;
    res.status(statusCode).json({
      success: false,
      error: {
        message: error.message || 'Authentication failed',
        status: statusCode,
      },
    });
  }
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required',
          status: 401,
        },
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'Insufficient permissions',
          status: 403,
        },
      });
    }

    next();
  };
};
