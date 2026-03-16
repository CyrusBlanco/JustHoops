/**
 * Application constants
 */

// Tab navigation options
export const TABS = {
  COURTS: 'courts',
  GAMES: 'games',
  PLAYERS: 'players',
  STATS: 'stats',
};

// Court status options
export const COURT_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  MAINTENANCE: 'maintenance',
};

// Game status options
export const GAME_STATUS = {
  LIVE: 'Live',
  SCHEDULED: 'Scheduled',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

// API endpoints (used by api service)
export const API_ENDPOINTS = {
  COURTS: '/api/courts',
  GAMES: '/api/games',
  PLAYERS: '/api/players',
  STATS: '/api/stats',
};