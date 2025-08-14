import Link from "next/link"
import Image from "next/image"
import { MapPin, Calendar, Users, DollarSign, Mountain } from "lucide-react"
import { EventWithRelations } from "@/types"
import { formatDateRange, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  event: EventWithRelations
}

export function EventCard({ event }: EventCardProps) {
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Mountain size={48} />
          </div>
        )}
        {event.featured && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Featured
          </span>
        )}
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
                {event.currentBookings}/{event.maxParticipants} spots
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

        {/* Action Button */}
        <Button asChild className="w-full">
          <Link href={`/events/${event.slug}`}>View Details</Link>
        </Button>
      </div>
    </div>
  )
}