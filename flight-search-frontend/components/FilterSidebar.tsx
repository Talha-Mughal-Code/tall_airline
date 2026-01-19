"use client"

import * as React from "react"
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
            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="space-y-4">
                        <h4 className="font-medium text-sm">Stops</h4>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="stop-0"
                                    checked={stops.includes("0")}
                                    onCheckedChange={(c) => handleStopChange("0", c)}
                                />
                                <Label htmlFor="stop-0">Non-stop</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="stop-1"
                                    checked={stops.includes("1")}
                                    onCheckedChange={(c) => handleStopChange("1", c)}
                                />
                                <Label htmlFor="stop-1">1 Stop</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="stop-2+"
                                    checked={stops.includes("2+")}
                                    onCheckedChange={(c) => handleStopChange("2+", c)}
                                />
                                <Label htmlFor="stop-2+">2+ Stops</Label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-sm">Price</h4>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="h-8"
                            />
                            <span>-</span>
                            <Input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="h-8"
                            />
                        </div>
                    </div>

                    {availableAirlines.length > 0 && (
                        <div className="space-y-4">
                            <h4 className="font-medium text-sm">Airlines</h4>
                            <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                {availableAirlines.map(airline => (
                                    <div key={airline} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`airline-${airline}`}
                                            checked={airlines.includes(airline)}
                                            onCheckedChange={(c) => handleAirlineChange(airline, c)}
                                        />
                                        <Label htmlFor={`airline-${airline}`}>{airline}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Button
                        variant="outline"
                        className="w-full"
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
