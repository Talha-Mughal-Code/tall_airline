"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Search, AlertCircle } from "lucide-react"

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

  // Validation errors
  const [departureError, setDepartureError] = React.useState<string>("")
  const [returnError, setReturnError] = React.useState<string>("")

  // Get today's date in YYYY-MM-DD format
  const today = format(new Date(), "yyyy-MM-dd")

  // Validate departure date
  const validateDepartureDate = (date: string) => {
    if (!date) {
      setDepartureError("Departure date is required")
      return false
    }
    if (date < today) {
      setDepartureError("Departure date cannot be in the past")
      return false
    }
    setDepartureError("")
    return true
  }

  // Validate return date
  const validateReturnDate = (date: string, departure: string) => {
    if (!date) {
      setReturnError("")
      return true // Return date is optional
    }
    if (date < today) {
      setReturnError("Return date cannot be in the past")
      return false
    }
    if (departure && date < departure) {
      setReturnError("Return date must be after departure date")
      return false
    }
    setReturnError("")
    return true
  }

  // Handle departure date change
  const handleDepartureDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setDepartureDate(newDate)
    validateDepartureDate(newDate)
    // Re-validate return date if it exists
    if (returnDate) {
      validateReturnDate(returnDate, newDate)
    }
  }

  // Handle return date change
  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setReturnDate(newDate)
    validateReturnDate(newDate, departureDate)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate before submission
    const isDepartureValid = validateDepartureDate(departureDate)
    const isReturnValid = validateReturnDate(returnDate, departureDate)

    if (!isDepartureValid || !isReturnValid) {
      return // Prevent submission if validation fails
    }

    const params = new URLSearchParams()
    if (origin) params.set("origin", origin)
    if (destination) params.set("destination", destination)
    if (departureDate) params.set("departureDate", departureDate)
    if (returnDate) params.set("returnDate", returnDate)
    if (passengers) params.set("adults", passengers)

    router.push(`/flights?${params.toString()}`)
  }

  // Validate on mount if dates are already set from URL params
  React.useEffect(() => {
    if (departureDate) {
      validateDepartureDate(departureDate)
    }
    if (returnDate && departureDate) {
      validateReturnDate(returnDate, departureDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount to validate initial URL params

  return (
    <Card className={cn("w-full max-w-6xl mx-auto border-2 border-blue-200 shadow-2xl bg-white/95 backdrop-blur-xl transition-all duration-300 hover:shadow-blue-300/30 hover:border-blue-300", className)}>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-5 items-end flex-wrap">
          <div className="flex-1 min-w-[140px] space-y-2 group relative">
            <Label htmlFor="origin" className="text-sm font-bold text-slate-800 group-focus-within:text-blue-600 transition-colors">
              From
            </Label>
            <div className="relative pb-6">
              <LocationAutocomplete
                value={origin}
                onChange={setOrigin}
                placeholder="Origin (e.g. JFK)"
              />
            </div>
          </div>

          <div className="flex-1 min-w-[140px] space-y-2 group relative">
            <Label htmlFor="destination" className="text-sm font-bold text-slate-800 group-focus-within:text-sky-600 transition-colors">
              To
            </Label>
            <div className="relative pb-6">
              <LocationAutocomplete
                value={destination}
                onChange={setDestination}
                placeholder="Destination (e.g. LHR)"
              />
            </div>
          </div>

          <div className="flex-1 min-w-[160px] space-y-2 group">
            <Label htmlFor="departureDate" className="text-sm font-bold text-slate-800 group-focus-within:text-blue-600 transition-colors">
              Departure
            </Label>
            <div className="relative pb-6">
              <Input
                type="date"
                id="departureDate"
                value={departureDate}
                onChange={handleDepartureDateChange}
                min={today}
                className={cn(
                  "w-full transition-all border-2 hover:border-blue-300 focus:ring-2 focus:ring-blue-200",
                  departureError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-200 focus:border-blue-500"
                )}
                required
              />
              <div className={cn("absolute bottom-0 left-0 right-0 flex items-center gap-1.5 text-xs text-red-600 h-5", departureError ? "opacity-100 visible" : "opacity-0 invisible")}>
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{departureError}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[160px] space-y-2 group">
            <Label htmlFor="returnDate" className="text-sm font-bold text-slate-800 group-focus-within:text-sky-600 transition-colors">
              Return <span className="text-xs font-normal text-slate-500">(Optional)</span>
            </Label>
            <div className="relative pb-6">
              <Input
                type="date"
                id="returnDate"
                value={returnDate}
                onChange={handleReturnDateChange}
                min={departureDate || today}
                className={cn(
                  "w-full transition-all border-2 hover:border-sky-300 focus:ring-2 focus:ring-sky-200",
                  returnError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-200 focus:border-sky-500"
                )}
              />
              <div className={cn("absolute bottom-0 left-0 right-0 flex items-center gap-1.5 text-xs text-red-600 h-5", returnError ? "opacity-100 visible" : "opacity-0 invisible")}>
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{returnError}</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 min-w-[100px] space-y-2 group">
            <Label htmlFor="passengers" className="text-sm font-bold text-slate-800 group-focus-within:text-cyan-600 transition-colors">
              Adults
            </Label>
            <div className="relative pb-6">
              <Input
                type="number"
                id="passengers"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                min={1}
                className="w-full transition-all border-2 border-slate-200 hover:border-cyan-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              />
            </div>
          </div>

          <div className="flex-shrink-0 min-w-[140px]">
            <div className="relative pb-6">
              <Button 
                type="submit" 
                className="w-full h-14 px-4 md:px-5 lg:px-6 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 hover:from-blue-600 hover:via-sky-600 hover:to-cyan-600 text-white font-black text-sm md:text-base shadow-2xl hover:shadow-blue-300/50 transition-all duration-300 transform hover:scale-110 rounded-xl border-0 relative overflow-hidden group" 
                size="default"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center gap-2 whitespace-nowrap">
                  <Search className="h-5 w-5 flex-shrink-0" />
                  <span>Search</span>
                </span>
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
