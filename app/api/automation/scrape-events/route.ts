import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EventType, Difficulty, Terrain, EventSource } from '@prisma/client';
import { ImageHandler } from '@/lib/image-handler';

// European country codes for holiday fetching
const EUROPEAN_COUNTRIES = [
  'AT', 'BE', 'CH', 'DE', 'DK', 'ES', 'FR', 'GB', 'IT', 'NL',
  'NO', 'PT', 'SE', 'CZ', 'PL', 'HR', 'SI', 'GR'
];

const COUNTRY_NAMES: Record<string, string> = {
  'AT': 'Austria', 'BE': 'Belgium', 'CH': 'Switzerland',
  'DE': 'Germany', 'DK': 'Denmark', 'ES': 'Spain',
  'FR': 'France', 'GB': 'United Kingdom', 'IT': 'Italy',
  'NL': 'Netherlands', 'NO': 'Norway', 'PT': 'Portugal',
  'SE': 'Sweden', 'CZ': 'Czech Republic', 'PL': 'Poland',
  'HR': 'Croatia', 'SI': 'Slovenia', 'GR': 'Greece'
};

interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
}

async function fetchHolidays(year: number): Promise<Holiday[]> {
  const allHolidays: Holiday[] = [];
  
  for (const countryCode of EUROPEAN_COUNTRIES) {
    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`
      );
      
      if (response.ok) {
        const holidays = await response.json();
        holidays.forEach((holiday: any) => {
          allHolidays.push({
            ...holiday,
            countryCode
          });
        });
      }
    } catch (error) {
      console.error(`Error fetching holidays for ${countryCode}:`, error);
    }
  }
  
  return allHolidays;
}

async function createHolidayEvents(holidays: Holiday[]) {
  const events = [];
  
  for (const holiday of holidays) {
    const holidayDate = new Date(holiday.date);
    const dayOfWeek = holidayDate.getDay();
    
    // Check if it creates a long weekend (Monday or Friday)
    if (dayOfWeek === 1 || dayOfWeek === 5) {
      let startDate: Date;
      let endDate: Date;
      
      if (dayOfWeek === 1) { // Monday
        startDate = new Date(holidayDate);
        startDate.setDate(holidayDate.getDate() - 2); // Saturday
        endDate = new Date(holidayDate);
      } else { // Friday
        startDate = new Date(holidayDate);
        endDate = new Date(holidayDate);
        endDate.setDate(holidayDate.getDate() + 2); // Sunday
      }
      
      const country = COUNTRY_NAMES[holiday.countryCode] || holiday.countryCode;
      
      // Process images for holiday event
      const holidayImages = await ImageHandler.processEventImage(
        null, // No source URL for holidays
        'WEEKEND_GETAWAY',
        country,
        `${holiday.localName} Cycling Weekend - ${country}`
      );
      
      events.push({
        title: `${holiday.localName} Cycling Weekend - ${country}`,
        description: `Special cycling weekend during ${holiday.name} holiday. Perfect time for a cycling getaway in ${country}.`,
        type: EventType.WEEKEND_GETAWAY,
        country,
        startDate,
        endDate,
        duration: 3,
        difficulty: Difficulty.INTERMEDIATE,
        terrain: [Terrain.ROAD, Terrain.MIXED],
        source: EventSource.API,
        sourceUrl: 'https://date.nager.at',
        coverImage: holidayImages.coverImage,
        images: holidayImages.images,
        published: true,
        verified: false
      });
    }
  }
  
  return events;
}

// Enhanced cycling events with proper image handling
async function getEnhancedCyclingEvents() {
  const now = new Date();
  const events = [];
  
  // Alpenbrevet event with image processing
  const alpenbrevet = {
    title: 'Alpenbrevet ' + (now.getFullYear() + 1),
    slug: `alpenbrevet-${now.getFullYear() + 1}`,
    description: 'The classic alpine cycling challenge through Swiss mountain passes',
    type: EventType.TOUR,
    country: 'Switzerland',
    region: 'Alps',
    city: 'Andermatt',
    startDate: new Date(now.getFullYear() + 1, 7, 30), // August 30
    endDate: new Date(now.getFullYear() + 1, 7, 31),
    duration: 2,
    difficulty: Difficulty.EXPERT,
    terrain: [Terrain.ROAD],
    distance: 270,
    elevation: 7000,
    websiteUrl: 'https://alpenbrevet.ch',
    source: EventSource.SCRAPED,
    sourceUrl: 'https://alpenbrevet.ch',
    languages: ['German', 'English', 'French'],
    published: true,
    verified: false
  };

  // Process images for Alpenbrevet
  const alpenbrevetImages = await ImageHandler.processEventImage(
    alpenbrevet.sourceUrl,
    alpenbrevet.type,
    alpenbrevet.country,
    alpenbrevet.title
  );
  
  events.push({
    ...alpenbrevet,
    coverImage: alpenbrevetImages.coverImage,
    images: alpenbrevetImages.images
  });
  
  // Swiss Gravel Challenge with image processing
  const gravel = {
    title: 'Swiss Gravel Challenge',
    slug: `swiss-gravel-challenge-${now.getFullYear() + 1}`,
    description: 'Epic gravel adventure through Swiss countryside',
    type: EventType.TOUR,
    country: 'Switzerland',
    region: 'Central Switzerland',
    startDate: new Date(now.getFullYear() + 1, 5, 15), // June 15
    endDate: new Date(now.getFullYear() + 1, 5, 16),
    duration: 2,
    difficulty: Difficulty.ADVANCED,
    terrain: [Terrain.GRAVEL, Terrain.MIXED],
    distance: 150,
    elevation: 3000,
    websiteUrl: 'https://ridegravel.ch',
    source: EventSource.SCRAPED,
    sourceUrl: 'https://ridegravel.ch',
    published: true,
    verified: false
  };

  // Process images for Gravel event
  const gravelImages = await ImageHandler.processEventImage(
    gravel.sourceUrl,
    gravel.type,
    gravel.country,
    gravel.title
  );
  
  events.push({
    ...gravel,
    coverImage: gravelImages.coverImage,
    images: gravelImages.images
  });

  // Mallorca Training Camp
  const mallorca = {
    title: 'Mallorca Spring Training Camp ' + (now.getFullYear() + 1),
    slug: `mallorca-training-camp-${now.getFullYear() + 1}`,
    description: 'Professional training camp in cycling paradise with daily coached rides',
    type: EventType.TRAINING_CAMP,
    country: 'Spain',
    region: 'Mallorca',
    city: 'Port de Pollença',
    startDate: new Date(now.getFullYear() + 1, 2, 15), // March 15
    endDate: new Date(now.getFullYear() + 1, 2, 22),
    duration: 8,
    difficulty: Difficulty.ADVANCED,
    terrain: [Terrain.ROAD],
    distance: 600,
    elevation: 8000,
    priceMin: 1200,
    priceMax: 1800,
    maxParticipants: 30,
    amenities: ['Professional coaching', 'Massage therapy', 'Bike rental'],
    included: ['Hotel', 'Breakfast', 'Dinner', 'Airport transfer'],
    languages: ['English', 'Spanish', 'German'],
    source: EventSource.SCRAPED,
    published: true,
    verified: false
  };

  const mallorcaImages = await ImageHandler.processEventImage(
    null, // No specific source URL
    mallorca.type,
    mallorca.country,
    mallorca.title
  );

  events.push({
    ...mallorca,
    coverImage: mallorcaImages.coverImage,
    images: mallorcaImages.images
  });

  // Dolomites Cycling Holiday
  const dolomites = {
    title: 'Dolomites Cycling Adventure ' + (now.getFullYear() + 1),
    slug: `dolomites-cycling-${now.getFullYear() + 1}`,
    description: 'Explore the stunning Dolomites on two wheels through mountain passes',
    type: EventType.CYCLING_HOLIDAY,
    country: 'Italy',
    region: 'Dolomites',
    city: 'Cortina d\'Ampezzo',
    startDate: new Date(now.getFullYear() + 1, 5, 20), // June 20
    endDate: new Date(now.getFullYear() + 1, 5, 27),
    duration: 8,
    difficulty: Difficulty.ADVANCED,
    terrain: [Terrain.ROAD],
    distance: 700,
    elevation: 12000,
    priceMin: 1500,
    priceMax: 2200,
    source: EventSource.SCRAPED,
    published: true,
    verified: false
  };

  const dolomitesImages = await ImageHandler.processEventImage(
    null,
    dolomites.type,
    dolomites.country,
    dolomites.title
  );

  events.push({
    ...dolomites,
    coverImage: dolomitesImages.coverImage,
    images: dolomitesImages.images
  });
  
  return events;
}

export async function GET(request: Request) {
  try {
    // Temporarily disable auth for testing image system
    console.log('Running with image enhancements...');
    
    const results = {
      cyclingEvents: 0,
      holidayEvents: 0,
      errors: []
    };
    
    // Fetch and save cycling events with enhanced image handling
    const cyclingEvents = await getEnhancedCyclingEvents();
    for (const event of cyclingEvents) {
      try {
        // Check if event already exists
        const existing = await prisma.event.findFirst({
          where: {
            OR: [
              { slug: event.slug },
              {
                title: event.title,
                startDate: event.startDate
              }
            ]
          }
        });
        
        if (!existing) {
          await prisma.event.create({
            data: event
          });
          results.cyclingEvents++;
        }
      } catch (error: any) {
        results.errors.push(`Cycling event error: ${error.message}`);
      }
    }
    
    // Fetch and save holiday events with enhanced image handling
    const currentYear = new Date().getFullYear();
    const holidays = await fetchHolidays(currentYear + 1);
    const holidayEvents = await createHolidayEvents(holidays);
    
    for (const event of holidayEvents) {
      try {
        // Generate slug
        const baseSlug = event.title.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[-\s]+/g, '-');
        const dateStr = event.startDate.toISOString().split('T')[0].replace(/-/g, '');
        const slug = `${baseSlug}-${dateStr}`;
        
        // Check if event already exists
        const existing = await prisma.event.findFirst({
          where: {
            OR: [
              { slug },
              {
                title: event.title,
                startDate: event.startDate
              }
            ]
          }
        });
        
        if (!existing) {
          await prisma.event.create({
            data: {
              ...event,
              slug
            }
          });
          results.holidayEvents++;
        }
      } catch (error: any) {
        results.errors.push(`Holiday event error: ${error.message}`);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Added ${results.cyclingEvents} cycling events and ${results.holidayEvents} holiday events`,
      results
    });
    
  } catch (error: any) {
    console.error('Automation error:', error);
    return NextResponse.json(
      { error: 'Failed to run automation', details: error.message },
      { status: 500 }
    );
  }
}