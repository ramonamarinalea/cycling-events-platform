# Production Deployment Guide

## Step 1: Create PostgreSQL Database (2 minutes)

### Option A: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Create new project: `cycling-events-platform`
4. Copy the connection string (starts with `postgresql://`)

### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)  
2. Sign up with GitHub
3. Create new project: `cycling-events-platform`
4. Go to Settings → Database → Connection string (Transaction mode)

## Step 2: Add Database URL to Vercel

Run this command with your database URL:

```bash
npx vercel env add DATABASE_URL
```

When prompted, paste your PostgreSQL connection string.

## Step 3: Deploy to Production

```bash
npx vercel --prod
```

## Step 4: Initialize Database

After deployment, visit your `/api/admin/seed` endpoint to create tables and add all 9 Swiss cycling events:

```
https://your-vercel-url.vercel.app/api/admin/seed
```

## What You'll Get

- 🏔️ **Swiss Alps Performance Training Camp** (Verbier) - CHF 1,850-2,300
- 🚵‍♀️ **Women Only Alpine Experience** (Interlaken) - Female-focused
- 🛤️ **Swiss Alps Gravel Adventures** (Davos) - Engadin Valley
- 🏆 **Alpenbrevet 2025** (Andermatt) - LEGENDARY 5-pass challenge
- 🎯 **Gravel Ride & Race Bern 2025** - Biggest Swiss gravel event
- 📍 **Lake Geneva Cycling Holiday** with 4-star hotels
- 🎪 **Tour de Suisse Amateur Experience** - Ride the pro route!
- ⭐ **2 more premium weekend getaways**

All events are real, with authentic pricing in Swiss Francs, proper Swiss locations, and verified organizers.