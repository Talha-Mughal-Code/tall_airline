"use client"

import { useMemo } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Flight } from "./FlightCard"

interface PriceGraphProps {
    flights: Flight[]
}

export function PriceGraph({ flights }: PriceGraphProps) {
    const data = useMemo(() => {
        if (!flights.length) return []

        // Create buckets for prices
        const prices = flights.map(f => parseFloat(f.price))
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)

        // If only one price or no range, show single bar
        if (minPrice === maxPrice) {
            return [{
                range: `$${Math.floor(minPrice)}`,
                count: prices.length,
                min: minPrice
            }]
        }

        const bucketCount = 5
        const step = (maxPrice - minPrice) / bucketCount

        const buckets = Array.from({ length: bucketCount }, (_, i) => {
            const start = minPrice + (i * step)
            const end = start + step
            return {
                range: `$${Math.floor(start)} - $${Math.floor(end)}`,
                min: start,
                max: end,
                count: 0
            }
        })

        prices.forEach(price => {
            const bucket = buckets.find(b => price >= b.min && price <= b.max)
                || buckets[buckets.length - 1] // Handle rounding edge case for max value
            if (bucket) {
                bucket.count++
            }
        })

        return buckets
    }, [flights])

    if (!flights.length) return null

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Price Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="range"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                allowDecimals={false}
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px' }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill="hsl(var(--primary))" />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
