import asyncHandler from '../middlewares/asyncHandler.js';
import AppError from '../utils/errorHandler.js';
import Organization from '../models/Organization.js';

export const createOrganization = asyncHandler(async (req, res) => {
  const { name, description, email, phone, address } = req.body;

  // Validate required fields
  if (!name || !email) {
    throw new AppError('Name and email are required', 400);
  }

  const organization = new Organization({
    name,
    description,
    email,
    phone,
    address,
    createdBy: req.userId,
  });

  await organization.save();

  res.status(201).json({
    success: true,
    data: organization,
    message: 'Organization created successfully',
  });
});

export const getOrganizations = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [organizations, total] = await Promise.all([
    Organization.find()
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'firstName lastName email'),
    Organization.countDocuments(),
  ]);

  res.json({
    success: true,
    data: organizations,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

export const getOrganizationById = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id).populate(
    'createdBy',
    'firstName lastName email'
  );

  if (!organization) {
    throw new AppError('Organization not found', 404);
  }

  res.json({
    success: true,
    data: organization,
  });
});

export const updateOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!organization) {
    throw new AppError('Organization not found', 404);
  }

  res.json({
    success: true,
    data: organization,
    message: 'Organization updated successfully',
  });
});

export const deleteOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.findByIdAndDelete(req.params.id);

  if (!organization) {
    throw new AppError('Organization not found', 404);
  }

  res.json({
    success: true,
    message: 'Organization deleted successfully',
  });
});
