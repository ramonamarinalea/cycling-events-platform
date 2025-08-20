import { MapPin, Calendar, ExternalLink } from "lucide-react"
import { EventWithRelations } from "@/types"
import { formatDateRange, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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

        {/* Visit Button */}
        <div className="mt-2">
          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className="w-full text-xs h-7"
          >
            <a 
              href={event.bookingUrl || event.websiteUrl || getDefaultEventUrl(event)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1"
            >
              <ExternalLink size={10} />
              Visit Event
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}