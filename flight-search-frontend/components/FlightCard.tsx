import { format } from "date-fns"
import { Plane, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface FlightSegment {
    from: string
    to: string
    departure: string
    arrival: string
    carrier: string
    duration: string
}

export interface Flight {
    price: string
    currency: string
    stops: number
    duration_minutes: number
    segments: FlightSegment[]
}

interface FlightCardProps {
    flight: Flight
}

function formatDuration(minutes: number) {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}h ${m}m`
}

export function FlightCard({ flight }: FlightCardProps) {
    const firstSegment = flight.segments[0]
    const lastSegment = flight.segments[flight.segments.length - 1]

    // Basic airline code mapping (mock) or just display code
    const airline = firstSegment.carrier

    return (
        <Card className="hover:shadow-xl hover:border-blue-400/50 transition-all duration-300 group cursor-pointer border-2 border-blue-200/50 hover:scale-[1.02] bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1 space-y-4 w-full">
                        <div className="flex items-center justify-between md:justify-start md:space-x-8">
                            <div className="text-center md:text-left">
                                <div className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {format(new Date(firstSegment.departure), "HH:mm")}
                                </div>
                                <div className="text-sm font-medium text-slate-600">{firstSegment.from}</div>
                            </div>

                            <div className="flex flex-col items-center px-4 flex-1 md:flex-none relative">
                                <Plane className="h-5 w-5 absolute -top-6 rotate-90 text-blue-600 animate-pulse z-10" />
                                <div className="text-xs font-semibold text-slate-700 mb-2 bg-gradient-to-r from-blue-100 to-sky-100 px-3 py-1.5 rounded-full border border-blue-200">
                                    {formatDuration(flight.duration_minutes)}
                                </div>
                                <div className="relative w-full md:w-40 h-[3px] bg-gradient-to-r from-blue-400/50 via-sky-500 to-cyan-500/50 flex items-center justify-center rounded-full">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/30 to-sky-300/30 blur-sm"></div>
                                </div>
                                <div className="text-xs font-medium text-slate-600 mt-2">
                                    {flight.stops === 0 ? (
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 font-semibold">
                                            Direct
                                        </Badge>
                                    ) : (
                                        <span className="text-blue-600 font-semibold">{flight.stops} stop{flight.stops > 1 ? "s" : ""}</span>
                                    )}
                                </div>
                            </div>

                            <div className="text-center md:text-right">
                                <div className="text-3xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                                    {format(new Date(lastSegment.arrival), "HH:mm")}
                                </div>
                                <div className="text-sm font-medium text-slate-600">{lastSegment.to}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm pt-2 border-t border-blue-100">
                            <Badge variant="outline" className="font-bold bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 border-blue-300">
                                {airline}
                            </Badge>
                            <span className="text-slate-600 font-medium">
                                {format(new Date(firstSegment.departure), "EEE, MMM d")}
                            </span>
                            {flight.segments.length > 1 && (
                                <span className="text-xs text-slate-500">
                                    {flight.segments.length} segment{flight.segments.length > 1 ? "s" : ""}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="border-t md:border-t-0 md:border-l border-blue-200 pt-4 md:pt-0 md:pl-6 flex flex-row md:flex-col items-center justify-between w-full md:w-auto min-w-[140px] gap-4">
                        <div className="space-y-1">
                            <div className="text-xs text-slate-600 font-semibold">Total Price</div>
                            <div className="text-3xl font-black bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: flight.currency }).format(parseFloat(flight.price))}
                            </div>
                        </div>
                        <button className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white hover:from-blue-600 hover:via-sky-600 hover:to-cyan-600 h-11 px-6 py-2 rounded-xl w-full md:w-auto text-sm font-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0">
                            Select Flight
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
