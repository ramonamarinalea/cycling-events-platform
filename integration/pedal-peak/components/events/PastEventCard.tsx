// components/events/PastEventCard.tsx
import { CyclingEvent } from "@/lib/events-api"
import { ExternalLink } from "lucide-react"

interface PastEventCardProps {
  event: CyclingEvent
}

export function PastEventCard({ event }: PastEventCardProps) {
  // Get default event URL when no booking/website URL is provided
  const getDefaultEventUrl = (event: CyclingEvent) => {
    if (event.country.toLowerCase().includes('spain')) {
      return 'https://www.spanish-cycling.com/events'
    }
    if (event.country.toLowerCase().includes('slovenia')) {
      return 'https://www.slovenia.info/en/things-to-do/active-holidays/cycling'
    }
    if (event.country.toLowerCase().includes('germany')) {
      return 'https://www.germany.travel/en/sports-and-recreation/cycling.html'
    }
    if (event.country.toLowerCase().includes('switzerland')) {
      return 'https://www.myswitzerland.com/en/experiences/sport/cycling/'
    }
    if (event.country.toLowerCase().includes('uk') || event.country.toLowerCase().includes('united kingdom')) {
      return 'https://www.britishcycling.org.uk/events'
    }
    // Default fallback
    return 'https://www.uci.org/events'
  }

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
      
      {/* Visit Button */}
      <div className="ml-4">
        <a
          href={event.bookingUrl || event.websiteUrl || getDefaultEventUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1 text-xs text-gray-600 hover:text-black border border-gray-300 hover:border-gray-400 transition-colors"
        >
          <ExternalLink size={10} />
          Visit
        </a>
      </div>
    </div>
  )
}