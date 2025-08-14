#!/usr/bin/env node

// For development/testing, we can use SQLite temporarily
// But for production, PostgreSQL is required

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up temporary SQLite database for development...');

// Create a simple SQLite connection string for development
const sqliteUrl = 'file:./dev.db';

// Update the .env.local file
const envContent = `# Database (development)
DATABASE_URL="${sqliteUrl}"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="8tD3afM3lOvjbfR2eXkG1aTVWcm9Ax5o"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
`;

try {
  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Created .env.local with SQLite database');
  
  console.log('');
  console.log('🛠️ Now run these commands to set up locally:');
  console.log('npm run dev                    # Start development server');
  console.log('npx prisma migrate dev --name init  # Create database tables');
  console.log('npx prisma db seed            # Add Swiss cycling events');
  console.log('');
  console.log('🌐 For production (required for live site):');
  console.log('Use: node create-db-now.js to set up PostgreSQL on Vercel');
  console.log('');
  console.log('🎯 This gives you:');
  console.log('✅ Local development with SQLite');
  console.log('✅ All 9 Swiss cycling events');
  console.log('✅ Full platform functionality');
  
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
}

console.log('');
console.log('📋 Next steps:');
console.log('1. Run: npm run dev');
console.log('2. Run: npx prisma migrate dev --name init');  
console.log('3. Run: npx prisma db seed');
console.log('4. Visit: http://localhost:3000');
console.log('');
console.log('Your local platform will have all Swiss cycling events! 🚴‍♂️');