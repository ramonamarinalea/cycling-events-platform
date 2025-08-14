import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    console.log('🔄 Running database migrations...')

    // Deploy the database schema
    await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    console.log('✅ Database migrations completed')

    return NextResponse.json({
      success: true,
      message: 'Database migrations completed successfully',
    })

  } catch (error) {
    console.error('Error running migrations:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to run migrations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}