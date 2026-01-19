"use client"

import { useEffect, useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Plane, ArrowLeft, AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FlightCard, Flight } from "@/components/FlightCard"
import { PriceGraph } from "@/components/PriceGraph"
import { FilterSidebar } from "@/components/FilterSidebar"
import { FlightSearchForm } from "@/components/FlightSearchForm"

function FlightResults() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allFlights, setAllFlights] = useState<Flight[]>([])

  // Filter states
  const [stops, setStops] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [airlines, setAirlines] = useState<string[]>([])

  const fetchFlights = async () => {
    setLoading(true)
    setError(null)
    const params = new URLSearchParams(searchParams.toString())

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/flights/search?${params.toString()}`)
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.detail || "Failed to fetch flights")
      }
      const data = await res.json()
      setAllFlights(data.flights)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchParams.toString()) {
      fetchFlights()
    }
  }, [searchParams])

  // Extract available airlines from results for filter
  const availableAirlines = useMemo(() => {
    const startSet = new Set<string>()
    allFlights.forEach(f => {
      // Assuming first segment carrier is the main airline for simplicity
      if (f.segments.length > 0) {
        startSet.add(f.segments[0].carrier)
      }
    })
    return Array.from(startSet)
  }, [allFlights])

  // Apply filters
  const filteredFlights = useMemo(() => {
    return allFlights.filter(flight => {
      // Stops filter
      if (stops.length > 0) {
        const flightStops = flight.stops.toString()
        const stopsMatch = stops.some(s => {
          if (s === "2+") return flight.stops >= 2
          return flightStops === s
        })
        if (!stopsMatch) return false
      }

      // Price filter
      const price = parseFloat(flight.price)
      if (minPrice && price < parseFloat(minPrice)) return false
      if (maxPrice && price > parseFloat(maxPrice)) return false

      // Airline filter
      if (airlines.length > 0) {
        const flightAirline = flight.segments[0]?.carrier
        if (!airlines.includes(flightAirline)) return false
      }

      return true
    })
  }, [allFlights, stops, minPrice, maxPrice, airlines])


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
            <Plane className="h-6 w-6" />
            <span className="hidden md:inline">SkySearch</span>
          </Link>

          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            {/* Compact Search Params Display or Mini Form (optional) */}
            <div className="text-sm text-muted-foreground flex items-center space-x-2">
              <span>{searchParams.get("origin")}</span>
              <ArrowLeft className="h-4 w-4 rotate-180" />
              <span>{searchParams.get("destination")}</span>
              <span className="mx-2">•</span>
              <span>{searchParams.get("departureDate")}</span>
              {searchParams.get("returnDate") && (
                <>
                  <span className="mx-2">-</span>
                  <span>{searchParams.get("returnDate")}</span>
                </>
              )}
            </div>
          </div>

          <Button variant="ghost" asChild>
            <Link href="/">New Search</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <FilterSidebar
              stops={stops}
              setStops={setStops}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              airlines={airlines}
              setAirlines={setAirlines}
              availableAirlines={availableAirlines}
            />
          </aside>

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-6">

            {/* Price Graph */}
            {!loading && !error && filteredFlights.length > 0 && (
              <PriceGraph flights={filteredFlights} />
            )}

            {/* Error State */}
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p>Finding the best flights for you...</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredFlights.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg font-medium">No flights found.</p>
                <p>Try adjusting your filters or search criteria.</p>
              </div>
            )}

            {/* Flight List */}
            <div className="space-y-4">
              {filteredFlights.map((flight, index) => (
                <FlightCard key={index} flight={flight} />
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <FlightResults />
    </Suspense>
  )
}
