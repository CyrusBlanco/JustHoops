/**
 * Comprehensive mock data for development and testing
 * Replace with actual API data when backend is ready
 */

// ========== COURTS ==========
export const mockCourts = [
  { 
    id: 1, 
    name: 'Downtown Court', 
    location: 'Main Street', 
    status: 'available', 
    capacity: 10, 
    games: 24, 
    rating: 4.8,
    description: 'Premier indoor court with professional flooring',
    amenities: ['Indoor', 'Air Conditioned', 'LED Lighting', 'Scoreboard'],
    hourlyRate: 50,
    createdAt: '2024-01-15'
  },
  { 
    id: 2, 
    name: 'Riverside Arena', 
    location: 'River Rd', 
    status: 'occupied', 
    capacity: 12, 
    games: 31, 
    rating: 4.9,
    description: 'Outdoor court with riverside views',
    amenities: ['Outdoor', 'Covered Seating', 'Parking'],
    hourlyRate: 40,
    createdAt: '2024-02-20'
  },
  { 
    id: 3, 
    name: 'Victory Center', 
    location: 'Victory Ave', 
    status: 'available', 
    capacity: 8, 
    games: 18, 
    rating: 4.7,
    description: 'Community center court, family friendly',
    amenities: ['Indoor', 'Locker Rooms', 'Snack Bar'],
    hourlyRate: 35,
    createdAt: '2023-11-10'
  },
  { 
    id: 4, 
    name: 'Champions Hall', 
    location: 'Champions Blvd', 
    status: 'available', 
    capacity: 14, 
    games: 42, 
    rating: 5.0,
    description: 'Professional tournament venue',
    amenities: ['Indoor', 'VIP Lounge', 'Live Streaming', 'Training Facilities'],
    hourlyRate: 75,
    createdAt: '2024-03-05'
  },
  { 
    id: 5, 
    name: 'Sunset Court', 
    location: 'Beach Boulevard', 
    status: 'maintenance', 
    capacity: 8, 
    games: 15, 
    rating: 4.5,
    description: 'Beachside outdoor court',
    amenities: ['Outdoor', 'Ocean View', 'Beach Access'],
    hourlyRate: 30,
    createdAt: '2023-08-22'
  },
];

// ========== GAMES ==========
export const mockGames = [
  { 
    id: 1, 
    type: '3v3 Tournament', 
    time: '6:00 PM', 
    status: 'Live', 
    scoreA: 42, 
    scoreB: 38,
    courtId: 1,
    courtName: 'Downtown Court',
    teamA: 'Thunder Squad',
    teamB: 'Lightning Bolts',
    date: '2026-02-02',
    duration: 45,
    spectators: 35
  },
  { 
    id: 2, 
    type: '5v5 League', 
    time: '7:30 PM', 
    status: 'Scheduled', 
    scoreA: 0, 
    scoreB: 0,
    courtId: 2,
    courtName: 'Riverside Arena',
    teamA: 'Storm Chasers',
    teamB: 'Fire Hawks',
    date: '2026-02-02',
    duration: 60,
    spectators: 0
  },
  { 
    id: 3, 
    type: '2v2 Pickup', 
    time: '5:00 PM', 
    status: 'Live', 
    scoreA: 28, 
    scoreB: 31,
    courtId: 3,
    courtName: 'Victory Center',
    teamA: 'Team Alpha',
    teamB: 'Team Beta',
    date: '2026-02-02',
    duration: 30,
    spectators: 12
  },
  { 
    id: 4, 
    type: '4v4 Casual', 
    time: '8:00 PM', 
    status: 'Scheduled', 
    scoreA: 0, 
    scoreB: 0,
    courtId: 4,
    courtName: 'Champions Hall',
    teamA: 'Warriors',
    teamB: 'Titans',
    date: '2026-02-02',
    duration: 45,
    spectators: 0
  },
  { 
    id: 5, 
    type: '5v5 Championship', 
    time: '9:00 PM', 
    status: 'Completed', 
    scoreA: 78, 
    scoreB: 72,
    courtId: 4,
    courtName: 'Champions Hall',
    teamA: 'Kings',
    teamB: 'Queens',
    date: '2026-02-01',
    duration: 60,
    spectators: 125
  },
];

// ========== PLAYERS ==========
export const mockPlayers = [
  {
    id: 1,
    name: 'Marcus Johnson',
    email: 'marcus.j@email.com',
    phone: '+1 (555) 123-4567',
    position: 'Point Guard',
    jerseyNumber: 7,
    height: '6\'2"',
    weight: '185 lbs',
    team: 'Thunder Squad',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    joinDate: '2024-01-15',
    stats: {
      gamesPlayed: 45,
      points: 672,
      assists: 234,
      rebounds: 145,
      steals: 89,
      blocks: 12,
      avgPoints: 14.9,
      avgAssists: 5.2,
      avgRebounds: 3.2
    }
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    phone: '+1 (555) 234-5678',
    position: 'Shooting Guard',
    jerseyNumber: 23,
    height: '5\'10"',
    weight: '165 lbs',
    team: 'Lightning Bolts',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    joinDate: '2023-11-20',
    stats: {
      gamesPlayed: 52,
      points: 896,
      assists: 178,
      rebounds: 223,
      steals: 67,
      blocks: 8,
      avgPoints: 17.2,
      avgAssists: 3.4,
      avgRebounds: 4.3
    }
  },
  {
    id: 3,
    name: 'David Chen',
    email: 'david.c@email.com',
    phone: '+1 (555) 345-6789',
    position: 'Small Forward',
    jerseyNumber: 15,
    height: '6\'6"',
    weight: '210 lbs',
    team: 'Storm Chasers',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    joinDate: '2024-03-10',
    stats: {
      gamesPlayed: 38,
      points: 745,
      assists: 156,
      rebounds: 312,
      steals: 45,
      blocks: 34,
      avgPoints: 19.6,
      avgAssists: 4.1,
      avgRebounds: 8.2
    }
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '+1 (555) 456-7890',
    position: 'Power Forward',
    jerseyNumber: 32,
    height: '6\'3"',
    weight: '195 lbs',
    team: 'Fire Hawks',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    joinDate: '2023-09-05',
    stats: {
      gamesPlayed: 48,
      points: 623,
      assists: 98,
      rebounds: 445,
      steals: 34,
      blocks: 67,
      avgPoints: 13.0,
      avgAssists: 2.0,
      avgRebounds: 9.3
    }
  },
  {
    id: 5,
    name: 'James Anderson',
    email: 'james.a@email.com',
    phone: '+1 (555) 567-8901',
    position: 'Center',
    jerseyNumber: 50,
    height: '6\'11"',
    weight: '245 lbs',
    team: 'Warriors',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    joinDate: '2024-02-14',
    stats: {
      gamesPlayed: 42,
      points: 588,
      assists: 67,
      rebounds: 521,
      steals: 23,
      blocks: 98,
      avgPoints: 14.0,
      avgAssists: 1.6,
      avgRebounds: 12.4
    }
  },
  {
    id: 6,
    name: 'Nina Patel',
    email: 'nina.p@email.com',
    phone: '+1 (555) 678-9012',
    position: 'Point Guard',
    jerseyNumber: 11,
    height: '5\'8"',
    weight: '155 lbs',
    team: 'Kings',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
    joinDate: '2023-12-01',
    stats: {
      gamesPlayed: 50,
      points: 678,
      assists: 312,
      rebounds: 156,
      steals: 98,
      blocks: 5,
      avgPoints: 13.6,
      avgAssists: 6.2,
      avgRebounds: 3.1
    }
  },
  {
    id: 7,
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    phone: '+1 (555) 789-0123',
    position: 'Shooting Guard',
    jerseyNumber: 3,
    height: '6\'4"',
    weight: '200 lbs',
    team: 'Titans',
    status: 'injured',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    joinDate: '2024-01-20',
    stats: {
      gamesPlayed: 35,
      points: 812,
      assists: 145,
      rebounds: 189,
      steals: 56,
      blocks: 18,
      avgPoints: 23.2,
      avgAssists: 4.1,
      avgRebounds: 5.4
    }
  },
  {
    id: 8,
    name: 'Lisa Kim',
    email: 'lisa.k@email.com',
    phone: '+1 (555) 890-1234',
    position: 'Small Forward',
    jerseyNumber: 21,
    height: '6\'1"',
    weight: '175 lbs',
    team: 'Queens',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    joinDate: '2023-10-15',
    stats: {
      gamesPlayed: 47,
      points: 734,
      assists: 198,
      rebounds: 267,
      steals: 78,
      blocks: 23,
      avgPoints: 15.6,
      avgAssists: 4.2,
      avgRebounds: 5.7
    }
  },
];

// ========== DETAILED STATISTICS ==========
export const mockStatistics = {
  overview: {
    totalCourts: 5,
    activeCourts: 3,
    totalGames: 147,
    liveGames: 2,
    totalPlayers: 384,
    activePlayers: 356,
    totalRevenue: 45680,
    averageRating: 4.8
  },
  
  courtsAnalytics: [
    { id: 1, courtName: 'Downtown Court', utilization: 85, revenue: 12500, bookings: 250 },
    { id: 2, courtName: 'Riverside Arena', utilization: 72, revenue: 10200, bookings: 255 },
    { id: 3, courtName: 'Victory Center', utilization: 68, revenue: 7800, bookings: 223 },
    { id: 4, courtName: 'Champions Hall', utilization: 92, revenue: 13500, bookings: 180 },
    { id: 5, courtName: 'Sunset Court', utilization: 45, revenue: 1680, bookings: 56 },
  ],
  
  monthlyRevenue: [
    { month: 'Jan', revenue: 38500, bookings: 245 },
    { month: 'Feb', revenue: 42300, bookings: 267 },
    { month: 'Mar', revenue: 45680, bookings: 289 },
    { month: 'Apr', revenue: 41200, bookings: 256 },
    { month: 'May', revenue: 48900, bookings: 301 },
    { month: 'Jun', revenue: 52300, bookings: 324 },
  ],
  
  gameTypes: [
    { type: '5v5 League', count: 45, percentage: 35 },
    { type: '3v3 Tournament', count: 38, percentage: 30 },
    { type: '4v4 Casual', count: 25, percentage: 20 },
    { type: '2v2 Pickup', count: 19, percentage: 15 },
  ],
  
  topPlayers: [
    { id: 7, name: 'Michael Brown', points: 812, gamesPlayed: 35 },
    { id: 2, name: 'Sarah Williams', points: 896, gamesPlayed: 52 },
    { id: 3, name: 'David Chen', points: 745, gamesPlayed: 38 },
    { id: 8, name: 'Lisa Kim', points: 734, gamesPlayed: 47 },
    { id: 1, name: 'Marcus Johnson', points: 672, gamesPlayed: 45 },
  ],
  
  peakHours: [
    { hour: '6:00 PM', bookings: 45 },
    { hour: '7:00 PM', bookings: 52 },
    { hour: '8:00 PM', bookings: 48 },
    { hour: '9:00 PM', bookings: 38 },
    { hour: '5:00 PM', bookings: 32 },
  ],
};

// ========== ADMIN USERS ==========
export const mockAdminUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@hoops.app',
    role: 'super_admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    lastLogin: '2026-02-02T10:30:00Z',
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    name: 'Court Manager',
    email: 'manager@hoops.app',
    role: 'manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manager',
    lastLogin: '2026-02-02T09:15:00Z',
    createdAt: '2024-02-15'
  },
];