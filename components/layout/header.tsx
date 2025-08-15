"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { Menu, User, LogOut, Plus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { useState } from "react"

export function Header() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Back to Pedal Peak */}
          <div className="flex items-center space-x-6">
            <Link 
              href="https://pedal-peak.com" 
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Pedal Peak</span>
            </Link>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Logo className="h-8 w-8 text-black" />
            <span className="text-xl font-bold text-black" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Pedal Peak Events
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/events" className="text-sm text-gray-900 hover:text-black transition-colors">
              browse events
            </Link>
            <Link 
              href="https://pedal-peak.com" 
              className="text-sm text-gray-900 hover:text-black transition-colors"
            >
              main site
            </Link>
            <Link 
              href="https://pedal-peak.com/routes" 
              className="text-sm text-gray-900 hover:text-black transition-colors"
            >
              routes
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
            ) : session ? (
              <>
                <Button asChild variant="outline" className="border border-black text-black hover:bg-black hover:text-white">
                  <Link href="/events/new">
                    <Plus className="mr-2" size={16} />
                    Add Event
                  </Link>
                </Button>
                <div className="relative group">
                  <Button variant="ghost" className="flex items-center space-x-2 text-black hover:text-gray-600">
                    <User size={20} />
                    <span>{session.user?.name || session.user?.email}</span>
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-200">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/my-events"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Events
                    </Link>
                    <Link
                      href="/saved"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Saved Events
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => signIn()} className="text-black hover:text-gray-600">
                  Sign In
                </Button>
                <Button onClick={() => signIn()} className="bg-black text-white hover:bg-gray-800">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <Link
                href="https://pedal-peak.com"
                className="text-gray-700 hover:text-black py-2 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                ← Back to Pedal Peak
              </Link>
              <Link
                href="/events"
                className="text-gray-700 hover:text-black py-2 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                browse events
              </Link>
              <Link
                href="https://pedal-peak.com"
                className="text-gray-700 hover:text-black py-2 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                main site
              </Link>
              <Link
                href="https://pedal-peak.com/routes"
                className="text-gray-700 hover:text-black py-2 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                routes
              </Link>
              
              <hr className="my-2" />
              
              {session ? (
                <>
                  <Link
                    href="/events/new"
                    className="text-gray-700 hover:text-black py-2 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Add Event
                  </Link>
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:text-black py-2 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setMobileMenuOpen(false)
                    }}
                    className="text-left text-gray-700 hover:text-black py-2 text-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    signIn()
                    setMobileMenuOpen(false)
                  }}
                  className="text-left text-gray-700 hover:text-black py-2 text-sm"
                >
                  Sign In
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}