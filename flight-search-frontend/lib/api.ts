import { Location, FlightResult } from "./types";

export async function searchFlights(params: URLSearchParams): Promise<FlightResult[]> {
    const res = await fetch(`/api/flights?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) throw await res.json();
    return res.json();
  }
  /**
 * Search airport/city locations via Next.js API proxy to FastAPI backend
 * @param keyword string typed by user
 * @returns array of Location
 */
export async function searchLocations(keyword: string): Promise<Location[]> {
  const res = await fetch(`/api/locations?keyword=${encodeURIComponent(keyword)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to fetch locations");
  }

  return res.json();
}
