import express from 'express';
import {
  getPlayers,
  getPlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getTopPlayers
} from '../controllers/playerController.js';
import { protect, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPlayers);
router.get('/top', getTopPlayers);
router.get('/:id', getPlayer);

// Admin routes
router.post('/', protect, requireAdmin, createPlayer);
router.put('/:id', protect, requireAdmin, updatePlayer);
router.delete('/:id', protect, requireAdmin, deletePlayer);

export default router;