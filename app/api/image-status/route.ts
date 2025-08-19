import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get comprehensive image statistics
    const totalEvents = await prisma.event.count();
    
    const eventsWithImages = await prisma.event.count({
      where: {
        AND: [
          { coverImage: { not: null } },
          { coverImage: { not: '' } }
        ]
      }
    });

    const eventsWithoutImages = totalEvents - eventsWithImages;

    // Get sample events with their images
    const sampleEvents = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        coverImage: true,
        country: true,
        type: true,
        source: true
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    // Get sample of different image URLs
    const sampleImageUrls = await prisma.event.findMany({
      select: {
        coverImage: true
      },
      where: {
        coverImage: { not: null }
      },
      distinct: ['coverImage'],
      take: 10
    });

    return NextResponse.json({
      success: true,
      statistics: {
        totalEvents,
        eventsWithImages,
        eventsWithoutImages,
        coveragePercentage: Math.round((eventsWithImages / totalEvents) * 100)
      },
      sampleEvents: sampleEvents.map(event => ({
        title: event.title.substring(0, 50),
        country: event.country,
        type: event.type,
        source: event.source,
        hasImage: !!event.coverImage,
        imageUrl: event.coverImage?.substring(0, 80) + (event.coverImage?.length > 80 ? '...' : '')
      })),
      imagePatterns: sampleImageUrls.map(item => ({
        imageUrl: item.coverImage?.substring(0, 80) + (item.coverImage && item.coverImage.length > 80 ? '...' : '')
      }))
    });

  } catch (error: any) {
    console.error('Image status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check image status', details: error.message },
      { status: 500 }
    );
  }
}