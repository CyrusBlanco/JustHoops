import { Router } from 'express';
const router = Router();
import Player from '../models/Player.js';

// GET all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single player
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new player
router.post('/', async (req, res) => {
  const player = new Player({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    position: req.body.position,
    jerseyNumber: req.body.jerseyNumber,
    height: req.body.height,
    weight: req.body.weight,
    team: req.body.team,
    status: req.body.status || 'active',
    avatar: req.body.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${req.body.name}`,
    stats: req.body.stats || {
      gamesPlayed: 0,
      points: 0,
      assists: 0,
      rebounds: 0,
      steals: 0,
      blocks: 0,
      avgPoints: 0,
      avgAssists: 0,
      avgRebounds: 0
    }
  });

  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update player
router.put('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    Object.keys(req.body).forEach(key => {
      if (key === 'stats' && req.body.stats) {
        player.stats = { ...player.stats, ...req.body.stats };
      } else {
        player[key] = req.body[key];
      }
    });

    const updatedPlayer = await player.save();
    res.json(updatedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE player
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    await player.deleteOne();
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;