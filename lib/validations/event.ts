import { z } from "zod"

export const eventFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(50, "Description must be at least 50 characters").max(5000),
  
  // Event Type
  type: z.enum(["TRAINING_CAMP", "CYCLING_HOLIDAY", "WEEKEND_GETAWAY", "TOUR", "EXPEDITION"]),
  
  // Location
  country: z.string().min(2, "Country is required"),
  region: z.string().optional(),
  city: z.string().optional(),
  venue: z.string().optional(),
  
  // Dates
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  
  // Pricing
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  currency: z.string().default("EUR"),
  
  // Details
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]),
  terrain: z.array(z.enum(["ROAD", "GRAVEL", "MOUNTAIN", "MIXED"])).min(1, "Select at least one terrain type"),
  distance: z.number().min(0).optional(),
  elevation: z.number().min(0).optional(),
  
  // Capacity
  maxParticipants: z.number().min(1).optional(),
  
  // URLs
  bookingUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  
  // Features
  amenities: z.array(z.string()).default([]),
  included: z.array(z.string()).default([]),
  notIncluded: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  
  // Images
  coverImage: z.string().optional(),
  images: z.array(z.string()).default([]),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
}).refine((data) => {
  if (data.priceMin !== undefined && data.priceMax !== undefined) {
    return data.priceMax >= data.priceMin
  }
  return true
}, {
  message: "Maximum price must be greater than minimum price",
  path: ["priceMax"],
})

export type EventFormData = z.infer<typeof eventFormSchema>