import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Authentication is currently being set up
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Sign-in functionality is coming soon. For now, you can browse all events without authentication.
            </p>
            
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link href="/events">
                  Browse Events
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Want to list your event?{" "}
            <Link href="mailto:events@pedal-peak.com" className="text-blue-600 hover:text-blue-500">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}