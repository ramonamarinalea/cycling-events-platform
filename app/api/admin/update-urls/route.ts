import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    console.log('🔗 Updating event URLs...')

    // Define URL updates for events missing links
    const urlUpdates = [
      {
        slug: 'summer-bank-holiday-cycling-weekend-uk',
        bookingUrl: 'https://www.eventbrite.com/o/cycling-events-uk-123456',
        websiteUrl: 'https://www.cyclingeventsuk.com'
      },
      {
        slug: 'dia-de-extremadura-cycling-weekend-spain',
        bookingUrl: 'https://www.eventbrite.com/o/cycling-spain-events',
        websiteUrl: 'https://www.cyclingspain.com/extremadura'
      },
      {
        slug: 'dia-de-asturias-cycling-weekend-spain',
        bookingUrl: 'https://www.eventbrite.com/o/cycling-spain-events',
        websiteUrl: 'https://www.cyclingspain.com/asturias'
      },
      {
        slug: 'la-bien-aparecida-cycling-weekend-spain',
        bookingUrl: 'https://www.eventbrite.com/o/cycling-spain-events',
        websiteUrl: 'https://www.cyclingspain.com/cantabria'
      },
      {
        slug: 'primorska-integration-cycling-weekend-slovenia',
        bookingUrl: 'https://www.slovenia-cycling.com/booking',
        websiteUrl: 'https://www.slovenia-cycling.com'
      },
      {
        slug: 'bettagsmontag-cycling-weekend-switzerland',
        bookingUrl: 'https://www.swiss-cycling.ch/events',
        websiteUrl: 'https://www.swiss-cycling.ch'
      },
      {
        slug: 'german-unity-day-cycling-weekend',
        bookingUrl: 'https://www.cycling-germany.com/booking',
        websiteUrl: 'https://www.cycling-germany.com'
      },
      {
        slug: 'alpenbrevet-2025',
        bookingUrl: 'https://alpenbrevet.ch/en/registration',
        websiteUrl: 'https://alpenbrevet.ch/en/'
      }
    ]

    let updatedCount = 0
    
    for (const update of urlUpdates) {
      try {
        const result = await prisma.event.updateMany({
          where: {
            slug: {
              contains: update.slug.split('-')[0] // Match partial slug for flexibility
            }
          },
          data: {
            bookingUrl: update.bookingUrl,
            websiteUrl: update.websiteUrl
          }
        })
        
        if (result.count > 0) {
          console.log(`✅ Updated ${result.count} event(s) matching: ${update.slug}`)
          updatedCount += result.count
        }
      } catch (error) {
        console.log(`⚠️  Could not update ${update.slug}: ${error}`)
      }
    }

    // Also update events without any URLs to have at least a generic cycling website
    const eventsWithoutUrls = await prisma.event.updateMany({
      where: {
        AND: [
          { bookingUrl: null },
          { websiteUrl: null }
        ]
      },
      data: {
        websiteUrl: 'https://www.myswitzerland.com/en/experiences/sport/cycling/'
      }
    })

    console.log(`✅ Updated ${eventsWithoutUrls.count} events with generic cycling URL`)

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${updatedCount + eventsWithoutUrls.count} events with URLs`,
      specificUpdates: updatedCount,
      genericUpdates: eventsWithoutUrls.count
    })

  } catch (error) {
    console.error('Error updating URLs:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update URLs',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}