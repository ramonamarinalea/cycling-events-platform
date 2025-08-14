import { MapPin, Calendar } from "lucide-react"
import { EventWithRelations } from "@/types"
import { formatDateRange, formatPrice } from "@/lib/utils"

interface PastEventCardProps {
  event: EventWithRelations
}

export function PastEventCard({ event }: PastEventCardProps) {
  const typeLabels = {
    TRAINING_CAMP: "Training Camp",
    CYCLING_HOLIDAY: "Cycling Holiday",
    WEEKEND_GETAWAY: "Weekend Getaway",
    TOUR: "Tour",
    EXPEDITION: "Expedition",
  }

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 opacity-60">
      {/* Compact Content */}
      <div className="space-y-1">
        {/* Title and Type */}
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-gray-600 line-clamp-1 flex-1">
            {event.title}
          </h3>
          <span className="text-xs text-gray-400 ml-2">
            {typeLabels[event.type]}
          </span>
        </div>

        {/* Location and Date in one line */}
        <div className="flex items-center text-xs text-gray-500 gap-3">
          <div className="flex items-center">
            <MapPin size={10} className="mr-1" />
            <span>{event.city}, {event.country}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={10} className="mr-1" />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>
        </div>

        {/* Price and Organizer */}
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>
            {event.priceMin && event.priceMax ? 
              `${formatPrice(event.priceMin, event.currency)} - ${formatPrice(event.priceMax, event.currency)}` :
              'Price N/A'
            }
          </span>
          {event.organizer && (
            <span>
              {event.organizer.companyName}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}