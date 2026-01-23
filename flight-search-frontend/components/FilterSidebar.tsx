"use client"

import * as React from "react"
import { Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FilterSidebarProps {
    stops: string[]
    setStops: (stops: string[]) => void
    minPrice: string
    setMinPrice: (price: string) => void
    maxPrice: string
    setMaxPrice: (price: string) => void
    airlines: string[]
    setAirlines: (airlines: string[]) => void
    availableAirlines: string[]
}

export function FilterSidebar({
    stops,
    setStops,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    airlines,
    setAirlines,
    availableAirlines
}: FilterSidebarProps) {

    const handleStopChange = (value: string, checked: boolean | string) => {
        if (checked) {
            setStops([...stops, value])
        } else {
            setStops(stops.filter(s => s !== value))
        }
    }

    const handleAirlineChange = (value: string, checked: boolean | string) => {
        if (checked) {
            setAirlines([...airlines, value])
        } else {
            setAirlines(airlines.filter(a => a !== value))
        }
    }

    return (
        <div className="space-y-6">
            <Card className="shadow-lg border-2 border-blue-200 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-100 via-sky-100 to-cyan-100 border-b-2 border-blue-200">
                    <CardTitle className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-sky-500 rounded-lg">
                            <Filter className="h-5 w-5 text-white" />
                        </div>
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm text-slate-700 uppercase tracking-wide">Stops</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                                <Checkbox
                                    id="stop-0"
                                    checked={stops.includes("0")}
                                    onCheckedChange={(c) => handleStopChange("0", c)}
                                />
                                <Label htmlFor="stop-0" className="cursor-pointer font-medium">Non-stop</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer">
                                <Checkbox
                                    id="stop-1"
                                    checked={stops.includes("1")}
                                    onCheckedChange={(c) => handleStopChange("1", c)}
                                />
                                <Label htmlFor="stop-1" className="cursor-pointer font-medium">1 Stop</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-cyan-50 transition-colors cursor-pointer">
                                <Checkbox
                                    id="stop-2+"
                                    checked={stops.includes("2+")}
                                    onCheckedChange={(c) => handleStopChange("2+", c)}
                                />
                                <Label htmlFor="stop-2+" className="cursor-pointer font-medium">2+ Stops</Label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm text-slate-700 uppercase tracking-wide">Price</h4>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="h-10 border-2 border-slate-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                            />
                            <span className="text-blue-400 font-medium">-</span>
                            <Input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="h-10 border-2 border-slate-200 hover:border-sky-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-colors"
                            />
                        </div>
                    </div>

                    {availableAirlines.length > 0 && (
                        <div className="space-y-4">
                            <h4 className="font-semibold text-sm text-slate-700 uppercase tracking-wide">Airlines</h4>
                            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                                {availableAirlines.map(airline => (
                                    <div key={airline} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer">
                                        <Checkbox
                                            id={`airline-${airline}`}
                                            checked={airlines.includes(airline)}
                                            onCheckedChange={(c) => handleAirlineChange(airline, c)}
                                        />
                                        <Label htmlFor={`airline-${airline}`} className="cursor-pointer font-medium">{airline}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Button
                        variant="outline"
                        className="w-full border-2 border-blue-300 hover:bg-gradient-to-r hover:from-blue-500 hover:via-sky-500 hover:to-cyan-500 hover:text-white hover:border-transparent font-bold transition-all hover:scale-105 shadow-md hover:shadow-lg"
                        onClick={() => {
                            setStops([])
                            setMinPrice("")
                            setMaxPrice("")
                            setAirlines([])
                        }}
                    >
                        Reset Filters
                    </Button>

                </CardContent>
            </Card>
        </div>
    )
}
