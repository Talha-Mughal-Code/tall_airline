"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "cmdk"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@radix-ui/react-popover"

interface Location {
    iataCode: string
    name: string
    cityName: string
    countryName: string
}

interface LocationAutocompleteProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export function LocationAutocomplete({
    value,
    onChange,
    placeholder = "Search location...",
    className,
}: LocationAutocompleteProps) {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [locations, setLocations] = React.useState<Location[]>([])

    React.useEffect(() => {
        if (query.length < 2) {
            setLocations([])
            return
        }

        const fetchLocations = async () => {
            setLoading(true)
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/locations/search?q=${query}`
                )
                if (response.ok) {
                    const data = await response.json()
                    setLocations(data.locations)
                }
            } catch (error) {
                console.error("Failed to fetch locations", error)
            } finally {
                setLoading(false)
            }
        }

        const timeoutId = setTimeout(fetchLocations, 300)
        return () => clearTimeout(timeoutId)
    }, [query])

    const selectedLocation = locations.find((l) => l.iataCode === value)
        || (value ? { iataCode: value, cityName: value, name: value } : null)

    return (
        <Popover open={open} onOpenChange={setOpen} modal={false}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between", className)}
                >
                    {value
                        ? `${value} - ${selectedLocation?.cityName || ''}`
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                className="w-[var(--radix-popover-trigger-width)] max-w-[400px] p-0 bg-white shadow-2xl border-2 border-blue-200 rounded-lg"
                align="start"
                sideOffset={4}
                side="bottom"
                avoidCollisions={true}
                collisionPadding={8}
                style={{ zIndex: 99999 }}
            >
                <Command shouldFilter={false}>
                    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                        <input
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Search city or airport..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <CommandList className="max-h-[300px] overflow-y-auto">
                        {loading && <div className="p-4 text-center text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin inline mr-2" />Loading...</div>}
                        {!loading && locations.length === 0 && query.length >= 2 && (
                            <div className="py-6 text-center text-sm">No locations found.</div>
                        )}
                        <CommandGroup>
                            {!loading && locations.map((location) => (
                                <CommandItem
                                    key={location.iataCode}
                                    value={location.iataCode}
                                    onSelect={() => {
                                        onChange(location.iataCode)
                                        setOpen(false)
                                    }}
                                    className="flex items-center px-2 py-1.5 text-sm cursor-default hover:bg-accent hover:text-accent-foreground rounded-sm"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === location.iataCode ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium">{location.cityName} ({location.iataCode})</span>
                                        <span className="text-xs text-muted-foreground">{location.name}, {location.countryName}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
