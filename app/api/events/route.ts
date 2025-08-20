import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, startDate, endDate, location, type, difficulty } = body

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        city: location,
        type,
        difficulty,
        published: false, // Events need approval
      },
    })

    return NextResponse.json({ event })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    
    // Get ALL events first
    const allEvents = await prisma.event.findMany({
      where: { published: true },
      include: {
        user: { select: { id: true, name: true, image: true } },
        organizer: { select: { id: true, companyName: true, verified: true } },
        _count: { select: { reviews: true, savedBy: true } },
      },
      orderBy: [{ featured: "desc" }, { startDate: "asc" }],
    })

    // FILTER OUT EVENTS WITHOUT URLs IN JAVASCRIPT
    const eventsWithUrls = allEvents.filter(event => 
      event.bookingUrl || event.websiteUrl
    )

    console.log(`🔧 FILTERED: ${allEvents.length} total events -> ${eventsWithUrls.length} events with URLs`)
    
    // Apply other filters
    const showPast = searchParams.get("past") === "true"
    let filteredEvents = eventsWithUrls.filter(event => {
      if (showPast) {
        return new Date(event.startDate) < new Date()
      } else {
        return new Date(event.startDate) >= new Date()
      }
    })

    // Apply search filter
    const search = searchParams.get("search")
    if (search) {
      const searchLower = search.toLowerCase()
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description?.toLowerCase().includes(searchLower) ||
        event.city?.toLowerCase().includes(searchLower) ||
        event.region?.toLowerCase().includes(searchLower)
      )
    }

    // Apply type filter
    const type = searchParams.get("type")
    if (type) {
      filteredEvents = filteredEvents.filter(event => event.type === type)
    }

    // Apply country filter
    const country = searchParams.get("country")
    if (country) {
      filteredEvents = filteredEvents.filter(event => 
        event.country?.toLowerCase().includes(country.toLowerCase())
      )
    }

    // Apply difficulty filter
    const difficulty = searchParams.get("difficulty")
    if (difficulty) {
      filteredEvents = filteredEvents.filter(event => event.difficulty === difficulty)
    }

    // Pagination
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit
    const events = filteredEvents.slice(skip, skip + limit)
    const total = filteredEvents.length

    console.log(`📊 RETURNING: ${events.length} events (page ${page} of ${Math.ceil(total / limit)})`)

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })

  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}