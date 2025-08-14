"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { Bike, Menu, User, LogOut, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Bike className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">CycleGetaways</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/events" className="text-gray-700 hover:text-blue-600">
              Browse Events
            </Link>
            <Link href="/events/map" className="text-gray-700 hover:text-blue-600">
              Map View
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
            ) : session ? (
              <>
                <Button asChild variant="outline">
                  <Link href="/events/new">
                    <Plus className="mr-2" size={16} />
                    Add Event
                  </Link>
                </Button>
                <div className="relative group">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User size={20} />
                    <span>{session.user?.name || session.user?.email}</span>
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
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
                <Button variant="ghost" onClick={() => signIn()}>
                  Sign In
                </Button>
                <Button onClick={() => signIn()}>
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
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/events"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Events
              </Link>
              <Link
                href="/events/map"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Map View
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <hr className="my-2" />
              
              {session ? (
                <>
                  <Link
                    href="/events/new"
                    className="text-gray-700 hover:text-blue-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Add Event
                  </Link>
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:text-blue-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      setMobileMenuOpen(false)
                    }}
                    className="text-left text-gray-700 hover:text-blue-600 py-2"
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
                  className="text-left text-gray-700 hover:text-blue-600 py-2"
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