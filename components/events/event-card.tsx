import Link from "next/link"
import Image from "next/image"
import { MapPin, Calendar, Users, DollarSign, Mountain } from "lucide-react"
import { EventWithRelations } from "@/types"
import { formatDateRange, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface EventCardProps {
  event: EventWithRelations
}

export function EventCard({ event }: EventCardProps) {
  const [imageError, setImageError] = useState(false)

  const difficultyColors = {
    BEGINNER: "bg-green-100 text-green-800",
    INTERMEDIATE: "bg-yellow-100 text-yellow-800",
    ADVANCED: "bg-orange-100 text-orange-800",
    EXPERT: "bg-red-100 text-red-800",
  }

  const typeLabels = {
    TRAINING_CAMP: "Training Camp",
    CYCLING_HOLIDAY: "Cycling Holiday",
    WEEKEND_GETAWAY: "Weekend Getaway",
    TOUR: "Tour",
    EXPEDITION: "Expedition",
  }

  // Get fallback image based on event type and country
  const getFallbackImage = () => {
    const typeImages = {
      TRAINING_CAMP: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
      CYCLING_HOLIDAY: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13',
      WEEKEND_GETAWAY: 'https://images.unsplash.com/photo-1544191696-15693c62e1b4',
      TOUR: 'https://images.unsplash.com/photo-1517654443271-14c4e7b6a20b',
      EXPEDITION: 'https://images.unsplash.com/photo-1544266503-7ad532c8e936'
    }
    return typeImages[event.type] || typeImages.CYCLING_HOLIDAY
  }

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {event.coverImage && !imageError ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <Image
            src={getFallbackImage()}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {event.featured && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Featured
          </span>
        )}
        {/* Image overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Type and Difficulty */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-gray-600">
            {typeLabels[event.type]}
          </span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              difficultyColors[event.difficulty]
            }`}
          >
            {event.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          <Link href={`/events/${event.slug}`} className="hover:text-blue-600">
            {event.title}
          </Link>
        </h3>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin size={14} className="mr-1" />
          <span>
            {event.city && `${event.city}, `}
            {event.region && `${event.region}, `}
            {event.country}
          </span>
        </div>

        {/* Dates */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{formatDateRange(event.startDate, event.endDate)}</span>
          <span className="ml-2 text-xs text-gray-500">
            ({event.duration} days)
          </span>
        </div>

        {/* Price */}
        {(event.priceMin || event.priceMax) && (
          <div className="flex items-center text-sm font-medium mb-3">
            <DollarSign size={14} className="mr-1" />
            {event.priceMin && event.priceMax ? (
              <span>
                {formatPrice(event.priceMin, event.currency)} -{" "}
                {formatPrice(event.priceMax, event.currency)}
              </span>
            ) : event.priceMin ? (
              <span>From {formatPrice(event.priceMin, event.currency)}</span>
            ) : (
              <span>Up to {formatPrice(event.priceMax!, event.currency)}</span>
            )}
          </div>
        )}

        {/* Terrain */}
        <div className="flex flex-wrap gap-1 mb-3">
          {event.terrain.map((t) => (
            <span
              key={t}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          {event.maxParticipants && (
            <div className="flex items-center">
              <Users size={12} className="mr-1" />
              <span>
                {event.maxParticipants} spots
              </span>
            </div>
          )}
          {event._count && (
            <div className="flex items-center gap-3">
              <span>{event._count.reviews} reviews</span>
              <span>{event._count.savedBy} saved</span>
            </div>
          )}
        </div>

        {/* Organizer */}
        {event.organizer && (
          <div className="text-xs text-gray-600 mb-3">
            By {event.organizer.companyName}
            {event.organizer.verified && (
              <span className="ml-1 text-blue-600">✓</span>
            )}
          </div>
        )}

        {/* Action Button - Always visible */}
        <Button asChild className="w-full">
          <a 
            href={event.bookingUrl || event.websiteUrl || getDefaultEventUrl(event)} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {event.bookingUrl ? 'Book Event' : 'Visit Event'}
          </a>
        </Button>
      </div>
    </div>
  )
}