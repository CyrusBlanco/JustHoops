/* eslint-disable no-undef */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hoops';

async function createAdminUser() {
  try {
    // Connect to MongoDB (modern approach - no deprecated options)
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@hoops.com' });
    
    if (existingAdmin) {
      console.log('  Admin user already exists');
      console.log('   Email:', existingAdmin.email);
      console.log('   Username:', existingAdmin.username);
      console.log('   Role:', existingAdmin.role);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@hoops.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('\n Admin user created successfully!\n');
    console.log('Email:', admin.email);
    console.log(' Username:', admin.username);
    console.log(' Password: admin123');
    console.log(' Role:', admin.role);
    console.log('\n  Please change the password after first login!\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(' Error creating admin user:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

createAdminUser();