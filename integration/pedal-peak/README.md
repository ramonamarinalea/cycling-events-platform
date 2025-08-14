# Pedal Peak Events Integration Guide

This guide shows you how to add the cycling events list as `/events` on your pedal-peak.com website.

## 🚀 Quick Integration Steps

### 1. Add the Events API Component

Create a new file `lib/events-api.ts` in your pedal-peak.com project:

```typescript
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
  
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  
  return response.json()
}
```

### 2. Add Event Components

Copy these files to your `components/` directory:

**`components/events/EventCard.tsx`:**
```typescript
// components/events/EventCard.tsx
import Image from "next/image"
import { CyclingEvent, formatDateRange, formatPrice } from "@/lib/events-api"

interface EventCardProps {
  event: CyclingEvent
}

export function EventCard({ event }: EventCardProps) {
  const formatDateBadge = (startDate: string, endDate: string) => {
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

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'TRAINING_CAMP': return 'Training Camp'
      case 'CYCLING_HOLIDAY': return 'Cycling Holiday'
      case 'WEEKEND_GETAWAY': return 'Weekend Getaway'
      case 'TOUR': return 'Tour'
      case 'EXPEDITION': return 'Expedition'
      default: return 'Cycling Event'
    }
  }

  const priceRange = event.priceMin && event.priceMax 
    ? `${formatPrice(event.priceMin, event.currency)} - ${formatPrice(event.priceMax, event.currency)}`
    : event.priceMin 
      ? `From ${formatPrice(event.priceMin, event.currency)}`
      : 'Price TBA'

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden">
        {/* Event Image */}
        <div className="aspect-[4/3] relative">
          {event.coverImage ? (
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Date Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-white px-3 py-2 text-xs font-bold tracking-wide text-black">
              {formatDateBadge(event.startDate, event.endDate)}
            </div>
          </div>
          
          {/* Featured Badge */}
          {event.featured && (
            <div className="absolute top-4 right-4">
              <div className="bg-black px-3 py-2 text-xs font-bold tracking-wide text-white">
                FEATURED
              </div>
            </div>
          )}
          
          {/* Event Details Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-2">
              <span className="text-sm font-light tracking-wide opacity-90">
                {getEventTypeLabel(event.type)}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold tracking-tight mb-2 leading-tight">
              {event.title}
            </h3>
            
            <p className="text-sm opacity-90 mb-3 line-clamp-2">
              {event.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-sm opacity-90">
                {event.city && event.country && `${event.city}, ${event.country}`}
              </div>
              <div className="text-sm font-medium">
                {event.duration} day{event.duration !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-white p-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-black mb-1">
                {priceRange}
              </div>
              {event.organizer && (
                <div className="text-sm text-gray-600">
                  by {event.organizer.companyName}
                  {event.organizer.verified && (
                    <span className="ml-1 text-black">✓</span>
                  )}
                </div>
              )}
            </div>
            
            {event.websiteUrl && (
              <a
                href={event.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-black text-white font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
              >
                Book Your Spot
              </a>
            )}
          </div>
          
          {/* Additional Info */}
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            {event.maxParticipants && (
              <span>{event.maxParticipants} spots available</span>
            )}
            <span className="capitalize">{event.difficulty.toLowerCase()} level</span>
            <span>{event.terrain.join(', ').toLowerCase()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**`components/events/PastEventCard.tsx`:**
```typescript
// components/events/PastEventCard.tsx
import { CyclingEvent } from "@/lib/events-api"

interface PastEventCardProps {
  event: CyclingEvent
}

export function PastEventCard({ event }: PastEventCardProps) {
  const formatDateBadge = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
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

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 opacity-60">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-sm font-medium text-gray-700 line-clamp-1">
            {event.title}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1">
            COMPLETED
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{event.city && event.country && `${event.city}, ${event.country}`}</span>
          <span>{formatDateBadge(event.startDate, event.endDate)}</span>
          <span>{event.duration} day{event.duration !== 1 ? 's' : ''}</span>
        </div>
      </div>
      
      <div className="text-right">
        {event.organizer && (
          <div className="text-xs text-gray-500 mb-1">
            {event.organizer.companyName}
          </div>
        )}
        <div className="text-xs text-gray-400 capitalize">
          {event.difficulty.toLowerCase()} • {event.terrain.join(', ').toLowerCase()}
        </div>
      </div>
    </div>
  )
}
```

### 3. Create the Events Page

**`app/events/page.tsx`:**
```typescript
// app/events/page.tsx
"use client"

import { useState, useEffect } from "react"
import { EventCard } from "@/components/events/EventCard"
import { PastEventCard } from "@/components/events/PastEventCard"
import { fetchEvents, CyclingEvent } from "@/lib/events-api"

const eventTypes = [
  { value: "", label: "All Events" },
  { value: "TRAINING_CAMP", label: "Training Camps" },
  { value: "CYCLING_HOLIDAY", label: "Cycling Holidays" },
  { value: "WEEKEND_GETAWAY", label: "Weekend Getaways" },
  { value: "TOUR", label: "Tours" },
]

const difficulties = [
  { value: "", label: "All Levels" },
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
  { value: "EXPERT", label: "Expert" },
]

export default function EventsPage() {
  const [events, setEvents] = useState<CyclingEvent[]>([])
  const [pastEvents, setPastEvents] = useState<CyclingEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingPast, setLoadingPast] = useState(false)
  const [filters, setFilters] = useState({
    type: "",
    difficulty: "",
    country: "",
  })

  useEffect(() => {
    fetchEventsData()
    fetchPastEventsData()
  }, [filters])

  const fetchEventsData = async () => {
    setLoading(true)
    try {
      const params: any = {}
      
      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value
      })
      
      const data = await fetchEvents(params)
      setEvents(data.events)
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPastEventsData = async () => {
    setLoadingPast(true)
    try {
      const data = await fetchEvents({ past: true, limit: 10 })
      setPastEvents(data.events)
    } catch (error) {
      console.error("Error fetching past events:", error)
    } finally {
      setLoadingPast(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-6xl font-bold tracking-tight text-black mb-6" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Cycling Events & Adventures
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Discover unforgettable cycling experiences from training camps in the Swiss Alps 
            to weekend getaways exploring hidden gravel routes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="px-4 py-2 border border-gray-300 bg-white text-black text-sm font-medium focus:outline-none focus:border-black"
          >
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange("difficulty", e.target.value)}
            className="px-4 py-2 border border-gray-300 bg-white text-black text-sm font-medium focus:outline-none focus:border-black"
          >
            {difficulties.map((diff) => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Country"
            value={filters.country}
            onChange={(e) => handleFilterChange("country", e.target.value)}
            className="px-4 py-2 border border-gray-300 bg-white text-black text-sm font-medium placeholder-gray-500 focus:outline-none focus:border-black"
          />

          {(filters.type || filters.difficulty || filters.country) && (
            <button
              onClick={() => setFilters({ type: "", difficulty: "", country: "" })}
              className="px-4 py-2 text-sm text-gray-600 hover:text-black font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200 w-2/3"></div>
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <h3 className="text-2xl font-bold text-black mb-4">No Events Found</h3>
            <p className="text-gray-600">Try adjusting your filters to find more events.</p>
          </div>
        )}

        {/* Past Events Section */}
        {(pastEvents.length > 0 || loadingPast) && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-black mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>Past Events</h2>
              <p className="text-gray-600">Previous cycling adventures for reference</p>
            </div>
            
            {loadingPast ? (
              <div className="space-y-2 max-w-4xl mx-auto">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 max-w-4xl mx-auto">
                {pastEvents.map((event) => (
                  <PastEventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-24 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Events are sourced from verified cycling organizers including training camps, 
            cycling holidays, and weekend adventures. All events link directly to the organizer's booking system.
          </p>
        </div>
      </div>
    </div>
  )
}
```

### 4. Add to Navigation

Add the events link to your main navigation:

```tsx
<Link href="/events" className="...">
  Events
</Link>
```

## 🎨 Styling Notes

All components use:
- **Satoshi font family** (matches your existing design)
- **Sharp corners** (no rounded borders)
- **Grayscale images** with color on hover
- **Black/white color scheme**
- **Minimalist aesthetic**
- **Responsive grid layout**

## 📡 API Endpoints

The events are served from:
- **Future events**: `GET /api/events`
- **Past events**: `GET /api/events?past=true`
- **Filtered**: `GET /api/events?type=TRAINING_CAMP&difficulty=ADVANCED`

## 📚 Data Source

Events include authentic Swiss cycling experiences:
- Kudos Cycling training camps
- SunVelo holidays
- Alpenbrevet official event
- Gravel Ride & Race Bern
- And more verified organizers

All events link directly to organizer booking pages.