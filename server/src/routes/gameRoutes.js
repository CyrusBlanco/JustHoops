import express from 'express';
import {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
  getLiveGames
} from '../controllers/gameController.js';
import { protect, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getGames);
router.get('/live', getLiveGames);
router.get('/:id', getGame);

// Admin routes
router.post('/', protect, requireAdmin, createGame);
router.put('/:id', protect, requireAdmin, updateGame);
router.delete('/:id', protect, requireAdmin, deleteGame);

export default router;