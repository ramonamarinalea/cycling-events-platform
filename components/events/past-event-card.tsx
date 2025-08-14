import Image from "next/image"
import { MapPin, Calendar, Users, DollarSign, Mountain } from "lucide-react"
import { EventWithRelations } from "@/types"
import { formatDateRange, formatPrice } from "@/lib/utils"

interface PastEventCardProps {
  event: EventWithRelations
}

export function PastEventCard({ event }: PastEventCardProps) {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      {/* Gray overlay for past events */}
      <div className="absolute inset-0 bg-gray-500 bg-opacity-30 z-10"></div>
      
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
          <span className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold z-20">
            Past Event
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 relative z-20">
        {/* Type and Difficulty */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-gray-500">
            {typeLabels[event.type]}
          </span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded opacity-60 ${
              difficultyColors[event.difficulty]
            }`}
          >
            {event.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-600">
          {event.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin size={14} className="mr-1" />
          <span>
            {event.city && `${event.city}, `}
            {event.region && `${event.region}, `}
            {event.country}
          </span>
        </div>

        {/* Dates */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{formatDateRange(event.startDate, event.endDate)}</span>
          <span className="ml-2 text-xs text-gray-400">
            ({event.duration} days)
          </span>
        </div>

        {/* Price */}
        {(event.priceMin || event.priceMax) && (
          <div className="flex items-center text-sm font-medium mb-3 text-gray-500">
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
              className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded opacity-60"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
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
          <div className="text-xs text-gray-400 mb-3">
            By {event.organizer.companyName}
            {event.organizer.verified && (
              <span className="ml-1 text-gray-400">✓</span>
            )}
          </div>
        )}

        {/* No action buttons - SEO only */}
        <div className="text-xs text-gray-400 text-center py-2">
          Event Completed
        </div>
      </div>
    </div>
  )
}