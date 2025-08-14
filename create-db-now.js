#!/usr/bin/env node

console.log('🗄️ Creating Database for Cycling Events Platform');
console.log('');

console.log('I\'ll walk you through the FASTEST 2-minute setup:');
console.log('');

console.log('🎯 Step 1: Create Free Database (Choose ONE option)');
console.log('');

console.log('OPTION A: Neon (Recommended - 30 seconds)');
console.log('1. Open: https://neon.tech');
console.log('2. Click "Sign up" → Use GitHub/Google');
console.log('3. Project name: cycling-events');
console.log('4. Copy the connection string');
console.log('');

console.log('OPTION B: Supabase (Alternative - 1 minute)');
console.log('1. Open: https://supabase.com');
console.log('2. "Start your project" → Sign up with GitHub');
console.log('3. "New project" → Name: cycling-events');
console.log('4. Settings → Database → Connection string (Transaction mode)');
console.log('');

console.log('OPTION C: Aiven (Free tier)');
console.log('1. Open: https://aiven.io');
console.log('2. Sign up → Create PostgreSQL service');
console.log('3. Choose free plan → Copy connection string');
console.log('');

console.log('🔧 Step 2: Add to Vercel (30 seconds)');
console.log('1. Go to: https://vercel.com/ramonas-projects-30eebf44/cycling-events-platform/settings/environment-variables');
console.log('2. Click "Add New"');
console.log('3. Name: DATABASE_URL');
console.log('4. Value: [paste your connection string]');
console.log('5. Click "Save"');
console.log('');

console.log('🚀 Step 3: Populate Database (10 seconds)');
console.log('Visit this URL: https://cycling-events-platform-bpatopoxs-ramonas-projects-30eebf44.vercel.app/api/admin/seed');
console.log('(This automatically creates all tables and adds 9 Swiss events!)');
console.log('');

console.log('✅ What you\'ll get:');
console.log('   🏔️  Swiss Alps Performance Training Camp (Verbier) - CHF 1,850-2,300');
console.log('   🚵‍♀️ Women Only Alpine Experience (Interlaken) - Female-focused camp');
console.log('   🛤️  Swiss Alps Gravel Adventures (Davos) - Engadin Valley gravel');
console.log('   🏆 Alpenbrevet 2025 (Andermatt) - LEGENDARY 5-pass challenge (SOLD OUT)');
console.log('   🎯 Gravel Ride & Race Bern 2025 - Biggest Swiss gravel event');
console.log('   📍 Lake Geneva cycling holiday with 4-star hotels');
console.log('   🎪 Tour de Suisse Amateur Experience - Ride the pro route!');
console.log('   ⭐ 2 more premium weekend getaways');
console.log('');

console.log('🎉 Total time: ~2 minutes for a fully operational platform!');
console.log('Your platform will have real Swiss events users can browse and potentially book.');

// Let's also create a simple test to verify the database connection
console.log('');
console.log('📋 Quick verification after setup:');
console.log('1. Visit your platform: https://cycling-events-platform-bpatopoxs-ramonas-projects-30eebf44.vercel.app');
console.log('2. Click "Browse Events" - you should see all 9 Swiss events');
console.log('3. Try filtering by "Switzerland" or "Gravel" - filters should work');
console.log('4. Click on any event to see full details');

console.log('');
console.log('Need help? I\'m here to assist with any step! 🚴‍♂️');