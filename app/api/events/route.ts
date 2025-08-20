import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { eventFormSchema } from "@/lib/validations/event"
import { generateSlug, getDurationInDays } from "@/lib/utils"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = eventFormSchema.parse(body)

    // Generate unique slug
    let slug = generateSlug(validatedData.title)
    let slugSuffix = 0
    let uniqueSlug = slug
    
    while (await prisma.event.findUnique({ where: { slug: uniqueSlug } })) {
      slugSuffix++
      uniqueSlug = `${slug}-${slugSuffix}`
    }

    // Calculate duration
    const duration = getDurationInDays(validatedData.startDate, validatedData.endDate)

    // Create event
    const event = await prisma.event.create({
      data: {
        ...validatedData,
        slug: uniqueSlug,
        duration,
        userId: session.user.id,
        source: "USER",
        published: false, // Events need moderation before publishing
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error("Error creating event:", error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    
    // Check if showing past events
    const showPast = searchParams.get("past") === "true"
    
    console.log("🔥 FILTERING EVENTS - ONLY SHOWING WITH URLs")
    
    // Build filters - STRICTLY ONLY show events with working links
    const where: any = {
      published: true, // Only show published events
      NOT: {
        AND: [
          { bookingUrl: null },
          { websiteUrl: null }
        ]
      }
    }
    
    // Store additional conditions
    const additionalConditions: any[] = []
    
    // Filter by past or future events
    if (showPast) {
      additionalConditions.push({
        startDate: { lt: new Date() } // Only show past events
      })
    } else {
      additionalConditions.push({
        startDate: { gte: new Date() } // Only show future events
      })
    }

    // Type filter
    const type = searchParams.get("type")
    if (type) {
      additionalConditions.push({ type: type })
    }

    // Difficulty filter
    const difficulty = searchParams.get("difficulty")
    if (difficulty) {
      additionalConditions.push({ difficulty: difficulty })
    }

    // Country filter
    const country = searchParams.get("country")
    if (country) {
      additionalConditions.push({
        country: {
          contains: country,
          mode: "insensitive",
        }
      })
    }

    // Search filter
    const search = searchParams.get("search")
    if (search) {
      additionalConditions.push({
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { city: { contains: search, mode: "insensitive" } },
          { region: { contains: search, mode: "insensitive" } },
        ]
      })
    }

    // Date range filter
    const startDate = searchParams.get("startDate")
    if (startDate) {
      additionalConditions.push({
        startDate: { gte: new Date(startDate) }
      })
    }

    const endDate = searchParams.get("endDate")
    if (endDate) {
      additionalConditions.push({
        endDate: { lte: new Date(endDate) }
      })
    }

    // Price range filter
    const minPrice = searchParams.get("minPrice")
    if (minPrice) {
      additionalConditions.push({
        priceMin: { gte: parseFloat(minPrice) }
      })
    }

    const maxPrice = searchParams.get("maxPrice")
    if (maxPrice) {
      additionalConditions.push({
        priceMax: { lte: parseFloat(maxPrice) }
      })
    }

    // Combine URL filter with additional conditions
    if (additionalConditions.length > 0) {
      where.AND = additionalConditions
    }

    // Pagination
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit

    // Get events with relations
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          organizer: {
            select: {
              id: true,
              companyName: true,
              verified: true,
            },
          },
          _count: {
            select: {
              reviews: true,
              savedBy: true,
            },
          },
        },
        orderBy: [
          { featured: "desc" },
          { startDate: "asc" },
        ],
        skip,
        take: limit,
      }),
      prisma.event.count({ where }),
    ])

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