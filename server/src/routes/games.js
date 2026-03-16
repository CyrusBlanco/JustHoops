import { Router } from 'express';
const router = Router();
import Game from '../models/Game.js';

// GET all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ date: -1, time: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single game
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new game
router.post('/', async (req, res) => {
  const game = new Game({
    type: req.body.type,
    teamA: req.body.teamA,
    teamB: req.body.teamB,
    courtId: req.body.courtId,
    courtName: req.body.courtName,
    date: req.body.date,
    time: req.body.time,
    duration: req.body.duration || 60,
    status: req.body.status || 'Scheduled',
    scoreA: req.body.scoreA || 0,
    scoreB: req.body.scoreB || 0,
    spectators: req.body.spectators || 0
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update game
router.put('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    Object.keys(req.body).forEach(key => {
      game[key] = req.body[key];
    });

    const updatedGame = await game.save();
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE game
router.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    await game.deleteOne();
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;