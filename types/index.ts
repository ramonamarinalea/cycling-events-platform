import { Event, User, Organizer, Review } from "@prisma/client"

export type EventWithRelations = Event & {
  user: User | null
  organizer: Organizer | null
  reviews: Review[]
  savedBy: User[]
  _count?: {
    reviews: number
    savedBy: number
  }
}

export type SafeUser = Omit<User, "password">

export interface EventFilters {
  type?: string
  difficulty?: string
  terrain?: string
  country?: string
  minPrice?: number
  maxPrice?: number
  startDate?: Date
  endDate?: Date
  search?: string
}