"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { LocationAutocomplete } from "@/components/LocationAutocomplete"

export function FlightSearchForm({ className }: { className?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [origin, setOrigin] = React.useState(searchParams.get("origin") || "")
  const [destination, setDestination] = React.useState(searchParams.get("destination") || "")
  const [departureDate, setDepartureDate] = React.useState(
    searchParams.get("departureDate") || format(new Date(), "yyyy-MM-dd")
  )
  const [returnDate, setReturnDate] = React.useState(searchParams.get("returnDate") || "")
  const [passengers, setPassengers] = React.useState(searchParams.get("adults") || "1")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (origin) params.set("origin", origin)
    if (destination) params.set("destination", destination)
    if (departureDate) params.set("departureDate", departureDate)
    if (returnDate) params.set("returnDate", returnDate)
    if (passengers) params.set("adults", passengers)

    router.push(`/flights?${params.toString()}`)
  }

  return (
    <Card className={cn("w-full max-w-4xl mx-auto border-0 shadow-lg bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60", className)}>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="origin">From</Label>
            <LocationAutocomplete
              value={origin}
              onChange={setOrigin}
              placeholder="Origin (e.g. JFK)"
            />
          </div>

          <div className="md:col-span-3 space-y-2">
            <Label htmlFor="destination">To</Label>
            <LocationAutocomplete
              value={destination}
              onChange={setDestination}
              placeholder="Destination (e.g. LHR)"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="departureDate">Departure</Label>
            <div className="relative">
              <Input
                type="date"
                id="departureDate"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="returnDate">Return (Optional)</Label>
            <Input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="md:col-span-1 space-y-2">
            <Label htmlFor="passengers">Adults</Label>
            <Input
              type="number"
              id="passengers"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              min={1}
              className="w-full"
            />
          </div>

          <div className="md:col-span-1">
            <Button type="submit" className="w-full" size="default">
              <Search className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Search</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
