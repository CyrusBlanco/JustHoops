import express from 'express';
import {
  getCourts,
  getCourt,
  createCourt,
  updateCourt,
  deleteCourt,
  getCourtStats
} from '../controllers/courtController.js';
import { protect, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getCourts);
router.get('/stats', getCourtStats);
router.get('/:id', getCourt);

// Admin routes (require authentication + admin role)
router.post('/', protect, requireAdmin, createCourt);
router.put('/:id', protect, requireAdmin, updateCourt);
router.delete('/:id', protect, requireAdmin, deleteCourt);

export default router;