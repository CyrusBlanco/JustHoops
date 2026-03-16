import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Game type is required'],
    enum: ['3v3 Tournament', '5v5 League', '2v2 Pickup', '4v4 Casual', '5v5 Championship']
  },
  courtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: [true, 'Court is required']
  },
  courtName: {
    type: String,
    required: true
  },
  teamA: {
    type: String,
    required: [true, 'Team A name is required']
  },
  teamB: {
    type: String,
    required: [true, 'Team B name is required']
  },
  scoreA: {
    type: Number,
    default: 0,
    min: 0
  },
  scoreB: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Live', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  date: {
    type: Date,
    required: [true, 'Game date is required']
  },
  time: {
    type: String,
    required: [true, 'Game time is required']
  },
  duration: {
    type: Number,
    default: 60,  // in minutes
    min: 15
  },
  spectators: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Index for faster queries
gameSchema.index({ date: 1, status: 1 });
gameSchema.index({ courtId: 1 });

const Game = mongoose.model('Game', gameSchema);

export default Game;