import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from '../controllers/organizationController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', authorize('admin'), createOrganization);
router.get('/', getOrganizations);
router.get('/:id', getOrganizationById);
router.put('/:id', authorize('admin'), updateOrganization);
router.delete('/:id', authorize('admin'), deleteOrganization);

export default router;
