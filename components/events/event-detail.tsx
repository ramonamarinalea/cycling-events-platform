"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, DollarSign, MapPin, Users, Mountain, Globe, CheckCircle } from "lucide-react"
import { EventWithRelations } from "@/types"
import { formatDateRange, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface EventDetailProps {
  event: EventWithRelations
}

export function EventDetail({ event }: EventDetailProps) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        {event.coverImage && !imageError ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            priority
          />
        ) : (
          <Image
            src={getFallbackImage()}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-white bg-white/20 backdrop-blur">
                {typeLabels[event.type]}
              </Badge>
              <Badge 
                className={`${difficultyColors[event.difficulty]} border-0`}
              >
                {event.difficulty}
              </Badge>
              {event.featured && (
                <Badge className="bg-yellow-500 text-black">Featured</Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {event.title}
            </h1>
            <div className="flex items-center text-white/90 text-lg">
              <MapPin size={20} className="mr-2" />
              <span>
                {event.city && `${event.city}, `}
                {event.region && `${event.region}, `}
                {event.country}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <CalendarDays className="text-blue-600 mb-2" size={24} />
                <h3 className="font-semibold mb-1">Date & Duration</h3>
                <p className="text-gray-600">{formatDateRange(event.startDate, event.endDate)}</p>
                <p className="text-sm text-gray-500">{event.duration} days</p>
              </div>

              {(event.priceMin || event.priceMax) && (
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <DollarSign className="text-green-600 mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Price</h3>
                  {event.priceMin && event.priceMax ? (
                    <p className="text-gray-600">
                      {formatPrice(event.priceMin, event.currency)} - {formatPrice(event.priceMax, event.currency)}
                    </p>
                  ) : event.priceMin ? (
                    <p className="text-gray-600">From {formatPrice(event.priceMin, event.currency)}</p>
                  ) : (
                    <p className="text-gray-600">Up to {formatPrice(event.priceMax!, event.currency)}</p>
                  )}
                </div>
              )}

              {(event.distance || event.elevation) && (
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <Mountain className="text-purple-600 mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Challenge</h3>
                  {event.distance && (
                    <p className="text-gray-600">{event.distance}km distance</p>
                  )}
                  {event.elevation && (
                    <p className="text-gray-600">{event.elevation}m elevation</p>
                  )}
                </div>
              )}

              {event.maxParticipants && (
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <Users className="text-orange-600 mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Participants</h3>
                  <p className="text-gray-600">{event.maxParticipants} max spots</p>
                  {event.currentBookings > 0 && (
                    <p className="text-sm text-gray-500">{event.currentBookings} already booked</p>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            {event.description && (
              <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            )}

            {/* Terrain */}
            {event.terrain.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
                <h2 className="text-2xl font-bold mb-4">Terrain</h2>
                <div className="flex flex-wrap gap-2">
                  {event.terrain.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {(event.included.length > 0 || event.amenities.length > 0) && (
              <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
                <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.included.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-green-700 mb-2">Included</h3>
                      <ul className="space-y-1">
                        {event.included.map((item, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle size={16} className="text-green-600 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {event.amenities.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-blue-700 mb-2">Amenities</h3>
                      <ul className="space-y-1">
                        {event.amenities.map((item, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle size={16} className="text-blue-600 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {event.notIncluded.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-red-700 mb-2">Not Included</h3>
                    <ul className="space-y-1">
                      {event.notIncluded.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border mb-6 sticky top-6">
              {event.organizer && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Organized by</h3>
                  <div className="flex items-center">
                    <span className="text-gray-700">{event.organizer.companyName}</span>
                    {event.organizer.verified && (
                      <CheckCircle size={16} className="text-blue-600 ml-2" />
                    )}
                  </div>
                </div>
              )}

              {event.websiteUrl && (
                <Button asChild className="w-full mb-4">
                  <a href={event.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <Globe size={16} className="mr-2" />
                    Visit Event Website
                  </a>
                </Button>
              )}

              {event.bookingUrl && event.bookingUrl !== event.websiteUrl && (
                <Button asChild variant="outline" className="w-full">
                  <a href={event.bookingUrl} target="_blank" rel="noopener noreferrer">
                    Book Now
                  </a>
                </Button>
              )}
            </div>

            {/* Languages */}
            {event.languages.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
                <h3 className="font-semibold mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {event.languages.map((lang) => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Images */}
            {event.images.length > 1 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold mb-3">More Photos</h3>
                <div className="grid grid-cols-2 gap-2">
                  {event.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${event.title} photo ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}