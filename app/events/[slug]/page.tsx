import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { EventDetail } from "@/components/events/event-detail"

interface EventPageProps {
  params: {
    slug: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await prisma.event.findUnique({
    where: {
      slug: params.slug,
      published: true
    },
    include: {
      organizer: true,
      user: true,
      reviews: {
        include: {
          user: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      },
      _count: {
        select: {
          reviews: true,
          savedBy: true
        }
      }
    }
  })

  if (!event) {
    notFound()
  }

  return <EventDetail event={event} />
}

export async function generateStaticParams() {
  const events = await prisma.event.findMany({
    where: {
      published: true
    },
    select: {
      slug: true
    }
  })

  return events.map((event) => ({
    slug: event.slug
  }))
}

export async function generateMetadata({ params }: EventPageProps) {
  const event = await prisma.event.findUnique({
    where: {
      slug: params.slug,
      published: true
    }
  })

  if (!event) {
    return {
      title: "Event Not Found"
    }
  }

  return {
    title: `${event.title} - Pedal Peak Events`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.coverImage ? [event.coverImage] : []
    }
  }
}