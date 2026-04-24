import User from '../../models/User.js';
import AppError from '../../utils/errorHandler.js';
import { verifyToken } from '../../utils/tokenUtils.js';
import { validateEmail, validateRequired } from '../../validators/validationSchemas.js';

export const loginUser = async ({ email, password }) => {
  validateRequired(email, 'Email');
  validateRequired(password, 'Password');

  if (!validateEmail(email)) {
    throw new AppError('Invalid email format', 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  if (!user.isActive) {
    throw new AppError('Your account has been deactivated', 403);
  }

  user.lastLogin = new Date();
  await user.save();

  return user;
};

export const validateRefreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError('Authentication required', 401);
  }

  let decoded;
  try {
    decoded = verifyToken(refreshToken);
  } catch (error) {
    throw new AppError('Invalid or expired refresh token', 401);
  }

  if (decoded.tokenType !== 'refresh') {
    throw new AppError('Invalid refresh token', 401);
  }

  const user = await User.findById(decoded.userId);
  if (!user || !user.isActive) {
    throw new AppError('Unauthorized', 401);
  }

  return {
    userId: user._id.toString(),
    role: user.role,
  };
};
