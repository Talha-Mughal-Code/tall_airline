"use client"

import { useEffect, useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Sparkles, Plane, ArrowLeft, AlertCircle, Loader2 } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 flex flex-col">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-sky-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tl from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl" />
      </div>

      <header className="bg-white/90 backdrop-blur-xl border-b-2 border-blue-200/50 sticky top-0 z-30 shadow-lg relative">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl group hover:scale-105 transition-transform relative z-10">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl shadow-md group-hover:scale-110 transition-transform">
              <Sparkles className="h-5 w-5 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <span className="hidden md:inline bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent font-black">
              WanderWings
            </span>
          </Link>

          <div className="flex-1 max-w-2xl mx-4 hidden md:block relative z-10">
            <div className="text-sm font-medium text-slate-700 flex items-center space-x-3 bg-gradient-to-r from-blue-100/80 via-sky-100/80 to-cyan-100/80 backdrop-blur-sm px-5 py-3 rounded-full border border-blue-200/50 shadow-sm">
              <span className="font-bold text-slate-900">{searchParams.get("origin")}</span>
              <ArrowLeft className="h-4 w-4 rotate-180 text-blue-600" />
              <span className="font-bold text-slate-900">{searchParams.get("destination")}</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            asChild 
            className="border-2 border-blue-300 hover:bg-gradient-to-r hover:from-blue-500 hover:via-sky-500 hover:to-cyan-500 hover:text-white hover:border-transparent transition-all duration-300 font-bold shadow-md hover:shadow-lg relative z-10"
          >
            <Link href="/">New Search</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1 relative z-10">
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
              <div className="bg-gradient-to-r from-red-50 to-blue-50 border-2 border-red-300 text-red-700 p-6 rounded-xl flex items-center gap-3 shadow-lg">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 flex-shrink-0 text-red-600" />
                </div>
                <div>
                  <p className="font-bold mb-1">Error loading flights</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200 shadow-lg">
                <Loader2 className="h-10 w-10 animate-spin mb-4 text-blue-600" />
                <p className="text-lg font-bold text-slate-800">Finding the best flights for you...</p>
                <p className="text-sm mt-2 text-slate-600">This may take a few seconds</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredFlights.length === 0 && (
              <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-blue-300 shadow-lg">
                <div className="p-4 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full w-fit mx-auto mb-4">
                  <Plane className="h-12 w-12 text-blue-600" />
                </div>
                <p className="text-lg font-bold text-slate-800 mb-2">No flights found</p>
                <p className="text-sm text-slate-600">Try adjusting your filters or search criteria</p>
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
