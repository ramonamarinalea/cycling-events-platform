import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const FALLBACK_IMAGES = {
  TRAINING_CAMP: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
  CYCLING_HOLIDAY: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13', 
  WEEKEND_GETAWAY: 'https://images.unsplash.com/photo-1544191696-15693c62e1b4',
  TOUR: 'https://images.unsplash.com/photo-1517654443271-14c4e7b6a20b',
  EXPEDITION: 'https://images.unsplash.com/photo-1544266503-7ad532c8e936'
};

const COUNTRY_IMAGES: Record<string, string> = {
  'Switzerland': 'https://images.unsplash.com/photo-1527095655060-4026c4af2b25',
  'Austria': 'https://images.unsplash.com/photo-1551262235-3c533c64e7ab',
  'Italy': 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b',
  'France': 'https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd',
  'Spain': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',
  'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b',
  'Netherlands': 'https://images.unsplash.com/photo-1534351450181-ea58bf205b9e',
  'Belgium': 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f',
  'Denmark': 'https://images.unsplash.com/photo-1568649084754-65fc5c6a8ecb',
  'Norway': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
  'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
  'Portugal': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b',
  'Czech Republic': 'https://images.unsplash.com/photo-1541849546-216549ae216d'
};

export async function POST() {
  try {
    // Get all events without proper images
    const events = await prisma.event.findMany({
      where: {
        OR: [
          { coverImage: null },
          { coverImage: '' }
        ]
      },
      select: {
        id: true,
        title: true,
        type: true,
        country: true,
        coverImage: true
      }
    });

    let updatedCount = 0;

    for (const event of events) {
      // Choose image based on country first, then event type
      let imageUrl = COUNTRY_IMAGES[event.country] || FALLBACK_IMAGES[event.type as keyof typeof FALLBACK_IMAGES] || FALLBACK_IMAGES.CYCLING_HOLIDAY;

      await prisma.event.update({
        where: { id: event.id },
        data: {
          coverImage: imageUrl,
          images: [imageUrl]
        }
      });

      updatedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} events with images`,
      eventsFixed: updatedCount
    });

  } catch (error: any) {
    console.error('Image fix error:', error);
    return NextResponse.json(
      { error: 'Failed to fix images', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Image fix endpoint ready',
    usage: 'POST to fix all events without images'
  });
}