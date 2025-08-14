import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { EventForm } from "@/components/forms/event-form"

export default async function NewEventPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Create New Event</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <EventForm />
      </div>
    </div>
  )
}