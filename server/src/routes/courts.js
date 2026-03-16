import { Router } from 'express';
const router = Router();
import Court from '../models/Court.js';

// GET all courts
router.get('/', async (req, res) => {
  try {
    const courts = await Court.find().sort({ createdAt: -1 });
    res.json(courts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single court
router.get('/:id', async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }
    res.json(court);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new court
router.post('/', async (req, res) => {
  const court = new Court({
    name: req.body.name,
    location: req.body.location,
    status: req.body.status || 'available',
    capacity: req.body.capacity,
    hourlyRate: req.body.hourlyRate,
    rating: req.body.rating || 0,
    description: req.body.description || '',
    amenities: req.body.amenities || [],
    games: req.body.games || 0
  });

  try {
    const newCourt = await court.save();
    res.status(201).json(newCourt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update court
router.put('/:id', async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }

    Object.keys(req.body).forEach(key => {
      court[key] = req.body[key];
    });

    const updatedCourt = await court.save();
    res.json(updatedCourt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE court
router.delete('/:id', async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }

    await court.deleteOne();
    res.json({ message: 'Court deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;