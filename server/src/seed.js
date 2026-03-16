import dotenv from 'dotenv';
import connectDB from './config/database.js';
import Court from './models/Court.js';
import Game from './models/Game.js';
import Player from './models/Player.js';

dotenv.config();

// Connect to database
connectDB();

// Sample data
const courts = [
  {
    name: 'Downtown Court',
    location: 'Main Street',
    description: 'Premier indoor court with professional flooring',
    status: 'available',
    capacity: 10,
    hourlyRate: 50,
    amenities: ['Indoor', 'Air Conditioned', 'LED Lighting', 'Scoreboard'],
    rating: 4.8,
    games: 24
  },
  {
    name: 'Riverside Arena',
    location: 'River Rd',
    description: 'Outdoor court with riverside views',
    status: 'occupied',
    capacity: 12,
    hourlyRate: 40,
    amenities: ['Outdoor', 'Covered Seating', 'Parking'],
    rating: 4.9,
    games: 31
  },
  {
    name: 'Victory Center',
    location: 'Victory Ave',
    description: 'Community center court, family friendly',
    status: 'available',
    capacity: 8,
    hourlyRate: 35,
    amenities: ['Indoor', 'Locker Rooms', 'Snack Bar'],
    rating: 4.7,
    games: 18
  },
  {
    name: 'Champions Hall',
    location: 'Champions Blvd',
    description: 'Professional tournament venue',
    status: 'available',
    capacity: 14,
    hourlyRate: 75,
    amenities: ['Indoor', 'VIP Lounge', 'Live Streaming', 'Training Facilities'],
    rating: 5.0,
    games: 42
  },
  {
    name: 'Sunset Court',
    location: 'Beach Boulevard',
    description: 'Beachside outdoor court',
    status: 'maintenance',
    capacity: 8,
    hourlyRate: 30,
    amenities: ['Outdoor', 'Ocean View', 'Beach Access'],
    rating: 4.5,
    games: 15
  }
];

const players = [
  {
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
    stats: {
      gamesPlayed: 45,
      points: 672,
      assists: 234,
      rebounds: 145,
      steals: 89,
      blocks: 12
    }
  },
  {
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
    stats: {
      gamesPlayed: 52,
      points: 896,
      assists: 178,
      rebounds: 223,
      steals: 67,
      blocks: 8
    }
  },
  {
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
    stats: {
      gamesPlayed: 38,
      points: 745,
      assists: 156,
      rebounds: 312,
      steals: 45,
      blocks: 34
    }
  },
  {
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
    stats: {
      gamesPlayed: 48,
      points: 623,
      assists: 98,
      rebounds: 445,
      steals: 34,
      blocks: 67
    }
  },
  {
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
    stats: {
      gamesPlayed: 42,
      points: 588,
      assists: 67,
      rebounds: 521,
      steals: 23,
      blocks: 98
    }
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log(' Starting database seeding...');

    // Clear existing data
    await Court.deleteMany({});
    await Game.deleteMany({});
    await Player.deleteMany({});
    console.log(' Cleared existing data');

    // Insert courts
    const createdCourts = await Court.insertMany(courts);
    console.log(` Inserted ${createdCourts.length} courts`);

    // Insert players
    const createdPlayers = await Player.insertMany(players);
    console.log(` Inserted ${createdPlayers.length} players`);

    // Create games
    const games = [
      {
        type: '3v3 Tournament',
        courtId: createdCourts[0]._id,
        courtName: createdCourts[0].name,
        teamA: 'Thunder Squad',
        teamB: 'Lightning Bolts',
        scoreA: 42,
        scoreB: 38,
        status: 'Live',
        date: new Date(),
        time: '6:00 PM',
        duration: 45,
        spectators: 35
      },
      {
        type: '5v5 League',
        courtId: createdCourts[1]._id,
        courtName: createdCourts[1].name,
        teamA: 'Storm Chasers',
        teamB: 'Fire Hawks',
        scoreA: 0,
        scoreB: 0,
        status: 'Scheduled',
        date: new Date(),
        time: '7:30 PM',
        duration: 60,
        spectators: 0
      },
      {
        type: '2v2 Pickup',
        courtId: createdCourts[2]._id,
        courtName: createdCourts[2].name,
        teamA: 'Team Alpha',
        teamB: 'Team Beta',
        scoreA: 28,
        scoreB: 31,
        status: 'Live',
        date: new Date(),
        time: '5:00 PM',
        duration: 30,
        spectators: 12
      }
    ];

    const createdGames = await Game.insertMany(games);
    console.log(`Inserted ${createdGames.length} games`);

    console.log('');
    console.log(' Database seeding completed successfully!');
    console.log('');
    console.log(' Summary:');
    console.log(`   - Courts: ${createdCourts.length}`);
    console.log(`   - Players: ${createdPlayers.length}`);
    console.log(`   - Games: ${createdGames.length}`);
    console.log('');

    // eslint-disable-next-line no-undef
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

// Run seeding
seedDatabase();