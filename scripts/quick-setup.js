#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Setting up your Cycling Events Platform...');

// Step 1: Check if we have environment variables
console.log('\n📋 Step 1: Environment Setup');
console.log('We need to set up a PostgreSQL database and environment variables.');
console.log('\nPlease follow these steps:');
console.log('1. Go to https://vercel.com/dashboard');
console.log('2. Select your cycling-events-platform project');
console.log('3. Go to Settings > Storage');
console.log('4. Click "Create Database" > Select "Postgres"');
console.log('5. Name it: cycling-events-db');
console.log('6. This will automatically add DATABASE_URL to your environment');

console.log('\n⚙️  Also add these environment variables in Vercel:');
console.log('NEXTAUTH_SECRET="' + generateRandomString(32) + '"');
console.log('NEXTAUTH_URL="https://cycling-events-platform-bpatopoxs-ramonas-projects-30eebf44.vercel.app"');

console.log('\n🎯 After setting up the database:');
console.log('1. Go to: https://cycling-events-platform-bpatopoxs-ramonas-projects-30eebf44.vercel.app/api/admin/seed');
console.log('2. This will populate your database with 9 Swiss cycling events!');

console.log('\n✅ Your platform will then be fully operational with:');
console.log('   • 4 verified organizers (Kudos Cycling, SunVelo, Swiss Cycling, Gravel Bern)');
console.log('   • 9 premium cycling events in Switzerland');
console.log('   • Road and gravel cycling options');
console.log('   • Training camps, holidays, and weekend getaways');
console.log('   • Price range: CHF 85-2,650');

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}