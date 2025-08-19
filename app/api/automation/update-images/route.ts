import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ImageHandler } from '@/lib/image-handler';

export async function POST(request: Request) {
  try {
    // Check for authorization
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const results = {
      updatedEvents: 0,
      errors: []
    };

    // Get all events without cover images or with placeholder images
    const eventsNeedingImages = await prisma.event.findMany({
      where: {
        OR: [
          { coverImage: null },
          { coverImage: '' },
          // Add more conditions for events with placeholder images
        ]
      },
      select: {
        id: true,
        title: true,
        type: true,
        country: true,
        sourceUrl: true,
        coverImage: true,
        images: true
      }
    });

    console.log(`Found ${eventsNeedingImages.length} events needing images`);

    for (const event of eventsNeedingImages) {
      try {
        console.log(`Processing images for: ${event.title}`);

        // Process images for this event
        const imageResult = await ImageHandler.processEventImage(
          event.sourceUrl,
          event.type,
          event.country,
          event.title
        );

        // Update the event with new images
        await prisma.event.update({
          where: { id: event.id },
          data: {
            coverImage: imageResult.coverImage,
            images: imageResult.images
          }
        });

        results.updatedEvents++;
        console.log(`Updated images for: ${event.title}`);

      } catch (error: any) {
        results.errors.push(`Error updating ${event.title}: ${error.message}`);
        console.error(`Error updating ${event.title}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated images for ${results.updatedEvents} events`,
      results
    });

  } catch (error: any) {
    console.error('Image update error:', error);
    return NextResponse.json(
      { error: 'Failed to update images', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Image update endpoint. Use POST to update images.',
    usage: 'POST /api/automation/update-images'
  });
}