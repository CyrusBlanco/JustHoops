import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Player name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    enum: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center']
  },
  jerseyNumber: {
    type: Number,
    required: [true, 'Jersey number is required'],
    min: [0, 'Jersey number cannot be negative'],
    max: [99, 'Jersey number cannot exceed 99']
  },
  height: {
    type: String  // e.g., "6'2"" 
  },
  weight: {
    type: String  // e.g., "185 lbs"
  },
  team: {
    type: String,
    required: [true, 'Team is required']
  },
  status: {
    type: String,
    enum: ['active', 'injured', 'inactive'],
    default: 'active'
  },
  avatar: {
    type: String  // URL to avatar image
  },
  stats: {
    gamesPlayed: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    steals: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },
    avgPoints: { type: Number, default: 0 },
    avgAssists: { type: Number, default: 0 },
    avgRebounds: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Calculate averages before saving
playerSchema.pre('save', function(next) {
  if (this.stats.gamesPlayed > 0) {
    this.stats.avgPoints = +(this.stats.points / this.stats.gamesPlayed).toFixed(1);
    this.stats.avgAssists = +(this.stats.assists / this.stats.gamesPlayed).toFixed(1);
    this.stats.avgRebounds = +(this.stats.rebounds / this.stats.gamesPlayed).toFixed(1);
  }
  next();
});

// Index for faster searches
playerSchema.index({ name: 'text', team: 'text' });
//playerSchema.index({ email: 1 });

const Player = mongoose.model('Player', playerSchema);

export default Player;