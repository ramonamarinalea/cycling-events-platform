# Database Setup Instructions

## Option 1: Vercel Postgres (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `cycling-events-platform`
3. Go to the "Storage" tab
4. Click "Create Database"
5. Select "Postgres"
6. Name it: `cycling-events-db`
7. Select region: `us-east-1` (or closest to your users)
8. Click "Create"

This will automatically add the following environment variables to your Vercel project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` 
- `POSTGRES_URL_NO_SSL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## Option 2: Alternative Database Providers

### Supabase (Free Tier Available)
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Get your database URL from Settings > Database
4. Format: `postgresql://postgres:[password]@[host]:5432/[database]`

### Railway (Simple Setup)
1. Go to [Railway](https://railway.app)
2. Create new project
3. Add PostgreSQL service
4. Copy connection string

### Neon (Serverless Postgres)
1. Go to [Neon](https://neon.tech)
2. Create new project
3. Copy connection string

## Step 2: Add Environment Variables

After creating the database, add these environment variables to Vercel:

```bash
# In Vercel Dashboard > Project > Settings > Environment Variables
DATABASE_URL="your_postgres_connection_string"
NEXTAUTH_URL="https://your-vercel-url.vercel.app"
NEXTAUTH_SECRET="your-secret-key-generate-a-random-string"

# Optional: OAuth providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

## Step 3: Run Database Migration

After setting up the database URL, run:

```bash
# This will create all tables in your database
npx vercel env pull .env.local
npx prisma migrate deploy
```

## Step 4: Seed the Database

Make a POST request to your seeding endpoint:

```bash
curl -X POST https://your-vercel-url.vercel.app/api/admin/seed
```

Or visit the URL in your browser to trigger the seeding.

## Step 5: Verify Setup

Visit your live site and check:
1. Events page shows all Swiss cycling events
2. Event submission form works
3. Search and filtering function properly

Your platform will then be fully operational with real Swiss cycling events!