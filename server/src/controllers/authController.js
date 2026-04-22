import asyncHandler from '../middlewares/asyncHandler.js';
import AppError from '../utils/errorHandler.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';
import User from '../models/User.js';
import { loginUser, validateRefreshToken } from '../services/auth/auth.service.js';
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from '../validators/validationSchemas.js';

export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Validate inputs
  validateRequired(firstName, 'First name');
  validateRequired(lastName, 'Last name');
  validateRequired(email, 'Email');
  validateRequired(password, 'Password');

  if (!validateEmail(email)) {
    throw new AppError('Invalid email format', 400);
  }

  if (password !== confirmPassword) {
    throw new AppError('Passwords do not match', 400);
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email is already registered', 409);
  }

  // Create new user
  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });

  await user.save();

  // Generate tokens
  const accessToken = generateAccessToken({ userId: user._id.toString(), role: user.role });
  const refreshToken = generateRefreshToken({ userId: user._id.toString(), role: user.role });

  // Set refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    data: {
      accessToken,
      user: user.toJSON(),
    },
    message: 'User registered successfully',
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser({ email, password });

  // Generate tokens
  const accessToken = generateAccessToken({ userId: user._id.toString(), role: user.role });
  const refreshToken = generateRefreshToken({ userId: user._id.toString(), role: user.role });

  // Set refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    data: {
      accessToken,
      user: user.toJSON(),
    },
    message: 'Login successful',
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('refreshToken');

  res.json({
    success: true,
    data: null,
    message: 'Logout successful',
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const tokenPayload = await validateRefreshToken(refreshToken);
  const accessToken = generateAccessToken(tokenPayload);

  res.json({
    success: true,
    data: {
      accessToken,
    },
    message: 'Token refreshed',
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    data: {
      user: user.toJSON(),
    },
    message: 'Current user fetched',
  });
});
