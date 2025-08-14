#!/bin/bash

echo "🚀 Quick Database Setup for Cycling Events Platform"
echo ""

# Since automated database creation requires API keys, let's use the fastest manual method
echo "I've already added your environment variables to Vercel:"
echo "✅ NEXTAUTH_SECRET"  
echo "✅ NEXTAUTH_URL"
echo ""

echo "Now let's add a FREE PostgreSQL database in 2 minutes:"
echo ""
echo "🎯 FASTEST OPTION - Neon (Free):"
echo "1. Open: https://neon.tech"
echo "2. Click 'Sign Up' (use GitHub/Google for instant access)"
echo "3. Create project name: cycling-events"
echo "4. Copy the connection string (looks like: postgresql://...)"
echo "5. Go back to Vercel: https://vercel.com/ramonas-projects-30eebf44/cycling-events-platform/settings/environment-variables"
echo "6. Click 'Add New'"
echo "7. Name: DATABASE_URL"
echo "8. Value: [paste the Neon connection string]"
echo "9. Target: Production"
echo "10. Click 'Save'"

echo ""
echo "🚀 FINAL STEP - Populate Database:"
echo "Visit: https://cycling-events-platform-bpatopoxs-ramonas-projects-30eebf44.vercel.app/api/admin/seed"
echo "(This creates all 9 Swiss cycling events automatically!)"

echo ""
echo "🎉 Your platform will be live with real Swiss cycling events:"
echo "   🏔️  Swiss Alps Performance Training Camp (Verbier)"
echo "   🚵‍♀️ Women Only Alpine Experience (Interlaken)"  
echo "   🛤️  Swiss Alps Gravel Adventures (Davos)"
echo "   🏆 Alpenbrevet 2025 (Andermatt) - The legendary 5-pass challenge"
echo "   🎯 Gravel Ride & Race Bern 2025 - Switzerland's biggest gravel event"
echo "   ⭐ Plus 4 more premium events!"

echo ""
echo "Total time: ~3 minutes to have a fully functional platform! 🚴‍♂️"