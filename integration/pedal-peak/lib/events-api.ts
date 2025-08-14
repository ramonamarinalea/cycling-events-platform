// lib/events-api.ts
export interface CyclingEvent {
  id: string
  title: string
  description: string
  type: 'TRAINING_CAMP' | 'CYCLING_HOLIDAY' | 'WEEKEND_GETAWAY' | 'TOUR' | 'EXPEDITION'
  country: string
  city: string | null
  region: string | null
  startDate: string
  endDate: string
  duration: number
  priceMin: number | null
  priceMax: number | null
  currency: string
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  terrain: string[]
  maxParticipants: number | null
  coverImage: string | null
  websiteUrl: string | null
  bookingUrl: string | null
  organizer: {
    companyName: string
    verified: boolean
  } | null
  featured: boolean
}

export interface EventsResponse {
  events: CyclingEvent[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export async function fetchEvents(params?: {
  past?: boolean
  type?: string
  difficulty?: string
  country?: string
  limit?: number
}): Promise<EventsResponse> {
  const searchParams = new URLSearchParams()
  
  if (params?.past) searchParams.append('past', 'true')
  if (params?.type) searchParams.append('type', params.type)
  if (params?.difficulty) searchParams.append('difficulty', params.difficulty)
  if (params?.country) searchParams.append('country', params.country)
  if (params?.limit) searchParams.append('limit', params.limit.toString())
  
  const url = `https://cycling-events-platform-fqme9nv27-ramonas-projects-30eebf44.vercel.app/api/events?${searchParams}`
  
  const response = await fetch(url, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  
  return response.json()
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  const startMonth = start.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
  const endMonth = end.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
  const startDay = start.getDate()
  const endDay = end.getDate()
  const year = start.getFullYear()
  
  if (start.toDateString() === end.toDateString()) {
    return `${startMonth} ${startDay}, ${year}`
  }
  
  if (start.getMonth() === end.getMonth()) {
    return `${startMonth} ${startDay}-${endDay}, ${year}`
  }
  
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}