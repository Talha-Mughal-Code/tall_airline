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
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex-1 space-y-4 w-full">
                        <div className="flex items-center justify-between md:justify-start md:space-x-8">
                            <div className="text-center md:text-left">
                                <div className="text-2xl font-bold">{format(new Date(firstSegment.departure), "HH:mm")}</div>
                                <div className="text-muted-foreground">{firstSegment.from}</div>
                            </div>

                            <div className="flex flex-col items-center px-4 flex-1 md:flex-none">
                                <div className="text-sm text-muted-foreground mb-1">{formatDuration(flight.duration_minutes)}</div>
                                <div className="relative w-full md:w-32 h-[2px] bg-border flex items-center justify-center">
                                    <Plane className="h-4 w-4 absolute -top-2 rotate-90 text-primary" />
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                                </div>
                            </div>

                            <div className="text-center md:text-right">
                                <div className="text-2xl font-bold">{format(new Date(lastSegment.arrival), "HH:mm")}</div>
                                <div className="text-muted-foreground">{lastSegment.to}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">{airline}</Badge>
                            <span>{format(new Date(firstSegment.departure), "EEE, MMM d")}</span>
                        </div>
                    </div>

                    <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 flex flex-row md:flex-col items-center justify-between w-full md:w-auto min-w-[120px]">
                        <div className="text-2xl font-bold text-primary">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: flight.currency }).format(parseFloat(flight.price))}
                        </div>
                        <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md w-full md:w-auto mt-2 text-sm font-medium">
                            Select
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
