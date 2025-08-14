#!/usr/bin/env node

// This script will test if the database is connected and seed it if successful

const fetch = require('node:fs').readFileSync ? require : () => { throw new Error('fetch not available') };

async function testAndSeed() {
  console.log('🧪 Testing database connection and seeding...');
  
  try {
    const response = await fetch('https://cycling-events-platform-bpatopoxs-ramonas-projects-30eebf44.vercel.app/api/admin/seed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log('🎉 SUCCESS! Database connected and seeded!');
      console.log(`✅ Created ${result.eventsCreated} Swiss cycling events`);
      console.log(`✅ Created ${result.organizersCreated} verified organizers`);
      console.log('');
      console.log('🚴‍♂️ Your platform is now LIVE with Swiss cycling events!');
      console.log('Visit: https://cycling-events-platform-bpatopoxs-ramonas-projects-30eebf44.vercel.app/events');
    } else {
      const error = await response.json();
      console.log('❌ Database connection failed');
      console.log('Error:', error.details);
      console.log('');
      console.log('Please ensure DATABASE_URL is set in Vercel environment variables');
      console.log('Instructions: run "node create-db-now.js" for setup guide');
    }
  } catch (error) {
    console.log('❌ Connection error:', error.message);
    console.log('Please ensure DATABASE_URL is configured correctly');
  }
}

// For now, just show the seeding URL since we need to set up the database first
console.log('🗄️ Database Setup Status Check');
console.log('');
console.log('First, set up your database using: node create-db-now.js');
console.log('');  
console.log('Then visit this URL to seed with Swiss events:');
console.log('https://cycling-events-platform-bpatopoxs-ramonas-projects-30eebf44.vercel.app/api/admin/seed');
console.log('');
console.log('Or test programmatically by running this script again after setup.');

// Uncomment this when database is ready:
// testAndSeed();