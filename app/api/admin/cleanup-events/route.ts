import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(req: NextRequest) {
  try {
    console.log('🗑️  Removing events without proper booking/website URLs...')

    // Delete events that have both bookingUrl and websiteUrl as null
    const deletedEvents = await prisma.event.deleteMany({
      where: {
        AND: [
          { bookingUrl: null },
          { websiteUrl: null }
        ]
      }
    })

    console.log(`✅ Deleted ${deletedEvents.count} events without URLs`)

    // Get remaining events count for verification
    const remainingEvents = await prisma.event.count({
      where: {
        published: true
      }
    })

    return NextResponse.json({
      success: true,
      message: `Successfully removed ${deletedEvents.count} events without URLs`,
      deletedCount: deletedEvents.count,
      remainingEvents: remainingEvents
    })

  } catch (error) {
    console.error('Error cleaning up events:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to cleanup events',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    // Just return info about events that would be deleted (dry run)
    const eventsWithoutUrls = await prisma.event.findMany({
      where: {
        AND: [
          { bookingUrl: null },
          { websiteUrl: null }
        ]
      },
      select: {
        id: true,
        title: true,
        country: true,
        startDate: true,
        published: true
      }
    })

    const eventsWithUrls = await prisma.event.count({
      where: {
        OR: [
          { bookingUrl: { not: null } },
          { websiteUrl: { not: null } }
        ]
      }
    })

    return NextResponse.json({
      eventsToDelete: eventsWithoutUrls,
      deleteCount: eventsWithoutUrls.length,
      eventsWithUrls: eventsWithUrls,
      totalEvents: eventsWithoutUrls.length + eventsWithUrls
    })

  } catch (error) {
    console.error('Error checking events:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check events',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}