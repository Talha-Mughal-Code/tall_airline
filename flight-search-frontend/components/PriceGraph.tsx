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

    // Generate gradient colors for bars (blue to sky to cyan)
    const getBarColor = (index: number, total: number) => {
        const colors = [
            '#3b82f6', // blue-500
            '#60a5fa', // blue-400
            '#0ea5e9', // sky-500
            '#06b6d4', // cyan-500
            '#22d3ee'  // cyan-400
        ]
        // Distribute colors across bars
        const colorIndex = Math.floor((index / total) * colors.length)
        return colors[Math.min(colorIndex, colors.length - 1)]
    }

    return (
        <Card className="border-2 border-blue-200/50 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-100 via-sky-100 to-cyan-100 border-b-2 border-blue-200">
                <CardTitle className="text-base font-black text-slate-800">Price Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                vertical={false} 
                                stroke="#bfdbfe" 
                                strokeOpacity={0.3}
                            />
                            <XAxis
                                dataKey="range"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#64748b', fontWeight: 600 }}
                            />
                            <YAxis
                                allowDecimals={false}
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#64748b', fontWeight: 600 }}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                                contentStyle={{ 
                                    borderRadius: '12px',
                                    border: '2px solid #3b82f6',
                                    background: 'linear-gradient(to bottom, #eff6ff, #e0f2fe)',
                                    boxShadow: '0 4px 6px rgba(59, 130, 246, 0.2)',
                                    fontWeight: 600
                                }}
                                labelStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                                itemStyle={{ color: '#1e40af', fontWeight: 600 }}
                            />
                            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={getBarColor(index, data.length)}
                                        style={{ 
                                            filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
                                        }}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
