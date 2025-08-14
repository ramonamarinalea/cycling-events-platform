# CycleGetaways - Cycling Events Platform

A comprehensive platform for discovering, sharing, and booking cycling holidays, training camps, and weekend getaways worldwide.

## Features

### Core Functionality
- **Event Discovery**: Browse cycling events with advanced filtering by type, difficulty, terrain, location, and price
- **User Submissions**: Allow users to submit their own events with detailed information
- **Authentication**: Secure user authentication with NextAuth.js (supports Google OAuth and credentials)
- **Smart Search**: Full-text search across event titles, descriptions, and locations
- **Responsive Design**: Mobile-first design that works on all devices

### Event Types Supported
- Training Camps
- Cycling Holidays
- Weekend Getaways
- Tours
- Expeditions

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Custom components with Radix UI primitives
- **Form Validation**: React Hook Form + Zod

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd cycling-events-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env.local` and update the values:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cycling_events?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Cloudinary (for image uploads - optional)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

4. **Set up the database**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Optional: Seed the database with sample data
npx prisma db seed
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
cycling-events-platform/
├── app/
│   ├── api/           # API routes
│   ├── events/        # Event pages
│   ├── auth/          # Authentication pages
│   └── layout.tsx     # Root layout
├── components/
│   ├── ui/            # Reusable UI components
│   ├── forms/         # Form components
│   ├── events/        # Event-specific components
│   └── layout/        # Layout components
├── lib/
│   ├── auth.ts        # NextAuth configuration
│   ├── prisma.ts      # Prisma client
│   ├── utils.ts       # Utility functions
│   └── validations/   # Zod schemas
├── prisma/
│   └── schema.prisma  # Database schema
└── types/             # TypeScript types
```

## Database Schema

The platform uses a PostgreSQL database with the following main models:

- **User**: User accounts and profiles
- **Event**: Cycling events with all details
- **Organizer**: Event organizer profiles
- **Review**: User reviews for events
- **Account/Session**: NextAuth authentication tables

## API Endpoints

### Events
- `GET /api/events` - List events with filters
- `POST /api/events` - Create new event (authenticated)
- `GET /api/events/[slug]` - Get event details
- `PATCH /api/events/[slug]` - Update event (owner only)
- `DELETE /api/events/[slug]` - Delete event (owner only)

### Authentication
- `/api/auth/*` - NextAuth endpoints

## Features Roadmap

### Phase 1 (MVP) ✅
- ✅ Basic event listing and submission
- ✅ User authentication
- ✅ Simple search and filtering
- ✅ Responsive design

### Phase 2 (In Progress)
- ⏳ Event detail pages
- ⏳ Image uploads with Cloudinary
- ⏳ Admin moderation dashboard
- ⏳ User profiles

### Phase 3 (Planned)
- Map-based discovery
- Review and rating system
- Email notifications
- Booking integration

### Phase 4 (Future)
- Web scraping for event aggregation
- API integrations (Strava, Komoot)
- Payment processing
- Advanced analytics

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm run start
```

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

## Deployment

The application can be deployed to any platform that supports Next.js:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Railway
- Heroku
- AWS Amplify
- Netlify

## Security Considerations

- All user inputs are validated with Zod schemas
- SQL injection prevention through Prisma ORM
- XSS protection via React's built-in escaping
- CSRF protection with NextAuth
- Secure session management
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.