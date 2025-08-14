"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { EventFormData, eventFormSchema } from "@/lib/validations/event"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const eventTypes = [
  { value: "TRAINING_CAMP", label: "Training Camp" },
  { value: "CYCLING_HOLIDAY", label: "Cycling Holiday" },
  { value: "WEEKEND_GETAWAY", label: "Weekend Getaway" },
  { value: "TOUR", label: "Tour" },
  { value: "EXPEDITION", label: "Expedition" },
]

const difficulties = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
  { value: "EXPERT", label: "Expert" },
]

const terrainTypes = [
  { value: "ROAD", label: "Road" },
  { value: "GRAVEL", label: "Gravel" },
  { value: "MOUNTAIN", label: "Mountain Bike" },
  { value: "MIXED", label: "Mixed" },
]

export function EventForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      currency: "EUR",
      terrain: [],
      amenities: [],
      included: [],
      notIncluded: [],
      languages: [],
      images: [],
    },
  })

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const event = await response.json()
        router.push(`/events/${event.slug}`)
      } else {
        alert("Failed to create event")
      }
    } catch (error) {
      console.error("Error creating event:", error)
      alert("An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Information</h2>
        
        <div>
          <Label htmlFor="title">Event Title *</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="e.g., Mallorca Spring Training Camp"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Describe your event in detail..."
            rows={6}
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="type">Event Type *</Label>
          <select
            id="type"
            {...register("type")}
            className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
          >
            <option value="">Select a type</option>
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Location</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              {...register("country")}
              placeholder="e.g., Spain"
            />
            {errors.country && (
              <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              {...register("region")}
              placeholder="e.g., Mallorca"
            />
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register("city")}
              placeholder="e.g., Palma"
            />
          </div>

          <div>
            <Label htmlFor="venue">Venue</Label>
            <Input
              id="venue"
              {...register("venue")}
              placeholder="e.g., Hotel Cycling Paradise"
            />
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Dates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              type="date"
              {...register("startDate", { valueAsDate: true })}
            />
            {errors.startDate && (
              <p className="text-sm text-red-600 mt-1">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="endDate">End Date *</Label>
            <Input
              id="endDate"
              type="date"
              {...register("endDate", { valueAsDate: true })}
            />
            {errors.endDate && (
              <p className="text-sm text-red-600 mt-1">{errors.endDate.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Pricing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="priceMin">Minimum Price</Label>
            <Input
              id="priceMin"
              type="number"
              step="0.01"
              {...register("priceMin", { valueAsNumber: true })}
              placeholder="0.00"
            />
          </div>

          <div>
            <Label htmlFor="priceMax">Maximum Price</Label>
            <Input
              id="priceMax"
              type="number"
              step="0.01"
              {...register("priceMax", { valueAsNumber: true })}
              placeholder="0.00"
            />
            {errors.priceMax && (
              <p className="text-sm text-red-600 mt-1">{errors.priceMax.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              {...register("currency")}
              className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="CHF">CHF</option>
            </select>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Event Details</h2>
        
        <div>
          <Label htmlFor="difficulty">Difficulty Level *</Label>
          <select
            id="difficulty"
            {...register("difficulty")}
            className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background"
          >
            <option value="">Select difficulty</option>
            {difficulties.map((diff) => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
          {errors.difficulty && (
            <p className="text-sm text-red-600 mt-1">{errors.difficulty.message}</p>
          )}
        </div>

        <div>
          <Label>Terrain Types *</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            {terrainTypes.map((terrain) => (
              <label key={terrain.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={terrain.value}
                  {...register("terrain")}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{terrain.label}</span>
              </label>
            ))}
          </div>
          {errors.terrain && (
            <p className="text-sm text-red-600 mt-1">{errors.terrain.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="distance">Total Distance (km)</Label>
            <Input
              id="distance"
              type="number"
              step="0.1"
              {...register("distance", { valueAsNumber: true })}
              placeholder="e.g., 500"
            />
          </div>

          <div>
            <Label htmlFor="elevation">Total Elevation (m)</Label>
            <Input
              id="elevation"
              type="number"
              {...register("elevation", { valueAsNumber: true })}
              placeholder="e.g., 8000"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="maxParticipants">Maximum Participants</Label>
          <Input
            id="maxParticipants"
            type="number"
            {...register("maxParticipants", { valueAsNumber: true })}
            placeholder="e.g., 20"
          />
        </div>
      </div>

      {/* Links */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Links</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bookingUrl">Booking URL</Label>
            <Input
              id="bookingUrl"
              type="url"
              {...register("bookingUrl")}
              placeholder="https://..."
            />
          </div>

          <div>
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              type="url"
              {...register("websiteUrl")}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/events")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Event"}
        </Button>
      </div>
    </form>
  )
}