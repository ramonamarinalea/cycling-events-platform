import Link from "next/link"
import { ArrowRight, Calendar, Globe, Users, Shield, Search, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-white text-black">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Cycling Events & Adventures
            </h1>
            <p className="text-xl mb-8 text-gray-600 font-light max-w-2xl mx-auto">
              Discover unforgettable cycling experiences from training camps in the Swiss Alps 
              to weekend getaways exploring hidden gravel routes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
                <Link href="/events">
                  Browse Events
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border border-black text-black hover:bg-black hover:text-white">
                <Link href="/events/new">
                  List Your Event
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Why Choose Pedal Peak Events?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-black" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black">Swiss Focus</h3>
              <p className="text-gray-600">
                Curated events in the most beautiful Swiss cycling regions
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-black" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black">Verified Organizers</h3>
              <p className="text-gray-600">
                All organizers are verified for quality and reliability
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-black" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black">Community Driven</h3>
              <p className="text-gray-600">
                Built by cyclists, for cyclists - no egos, just pure cycling joy
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-black" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black">Smart Search</h3>
              <p className="text-gray-600">
                Filter by difficulty, terrain, dates, and more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Find Your Perfect Cycling Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Calendar className="text-blue-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">Training Camps</h3>
              <p className="text-gray-600 mb-4">
                Professional training camps with expert coaches, structured programs, and performance focus.
              </p>
              <Link href="/events?type=TRAINING_CAMP" className="text-blue-600 font-medium hover:underline">
                View Training Camps →
              </Link>
            </div>
            
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Globe className="text-green-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">Cycling Holidays</h3>
              <p className="text-gray-600 mb-4">
                Multi-day adventures combining cycling with cultural experiences and scenic routes.
              </p>
              <Link href="/events?type=CYCLING_HOLIDAY" className="text-green-600 font-medium hover:underline">
                Explore Holidays →
              </Link>
            </div>
            
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <Mountain className="text-purple-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">Weekend Getaways</h3>
              <p className="text-gray-600 mb-4">
                Short escapes perfect for exploring new regions without taking extended time off.
              </p>
              <Link href="/events?type=WEEKEND_GETAWAY" className="text-purple-600 font-medium hover:underline">
                Find Getaways →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Mallorca, Spain",
              "Girona, Spain",
              "Tuscany, Italy",
              "French Alps",
              "Colorado, USA",
              "Taiwan",
              "New Zealand",
              "Portugal"
            ].map((destination) => (
              <Link
                key={destination}
                href={`/events?country=${destination.split(", ")[1] || destination}`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <p className="font-medium">{destination}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of cyclists discovering amazing cycling experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/events">
                Find Your Next Ride
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/events/new">
                Organize an Event
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>Pedal Peak Events</h3>
              <p className="text-sm">
                Discover unforgettable cycling experiences worldwide
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/events" className="hover:text-white">All Events</Link></li>
                <li><Link href="/events?type=TRAINING_CAMP" className="hover:text-white">Training Camps</Link></li>
                <li><Link href="/events?type=CYCLING_HOLIDAY" className="hover:text-white">Holidays</Link></li>
                <li><Link href="/events?type=WEEKEND_GETAWAY" className="hover:text-white">Weekend Trips</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Organizers</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/events/new" className="hover:text-white">List Your Event</Link></li>
                <li><Link href="/organizer-guide" className="hover:text-white">Organizer Guide</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 Pedal Peak Events. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}