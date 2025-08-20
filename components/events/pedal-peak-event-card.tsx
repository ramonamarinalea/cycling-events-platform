import Image from "next/image"
import { EventWithRelations } from "@/types"
import { formatDateRange, formatPrice } from "@/lib/utils"

interface PedalPeakEventCardProps {
  event: EventWithRelations
}

export function PedalPeakEventCard({ event }: PedalPeakEventCardProps) {
  // Get default event URL when no booking/website URL is provided
  const getDefaultEventUrl = (event: EventWithRelations) => {
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

  const formatDateBadge = (startDate: Date, endDate: Date) => {
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
            
            <a
              href={event.bookingUrl || event.websiteUrl || getDefaultEventUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-black text-white font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
            >
              {event.bookingUrl ? 'Book Your Spot' : 'Visit Event'}
            </a>
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