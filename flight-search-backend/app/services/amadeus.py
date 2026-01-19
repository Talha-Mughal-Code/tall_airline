import os
import httpx
from dotenv import load_dotenv
from app.utils.duration import parse_iso8601_duration

load_dotenv()

AMADEUS_CLIENT_ID = os.getenv("AMADEUS_CLIENT_ID")
AMADEUS_CLIENT_SECRET = os.getenv("AMADEUS_CLIENT_SECRET")

TOKEN_URL = "https://test.api.amadeus.com/v1/security/oauth2/token"
FLIGHT_SEARCH_URL = "https://test.api.amadeus.com/v2/shopping/flight-offers"
LOCATIONS_URL = "https://test.api.amadeus.com/v1/reference-data/locations"


async def get_amadeus_token() -> str:
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            TOKEN_URL,
            data={
                "grant_type": "client_credentials",
                "client_id": AMADEUS_CLIENT_ID,
                "client_secret": AMADEUS_CLIENT_SECRET,
            },
        )
        resp.raise_for_status()
        return resp.json()["access_token"]


async def search_flights_service(
    origin: str,
    destination: str,
    departure_date: str,
    return_date: str | None,
    adults: int,
    non_stop: bool | str | None,
):
    token = await get_amadeus_token()

    adults = int(adults)
    non_stop_bool = (
        non_stop if isinstance(non_stop, bool)
        else str(non_stop).lower() == "true"
    )

    params = {
        "originLocationCode": origin.upper(),
        "destinationLocationCode": destination.upper(),
        "departureDate": departure_date,
        "adults": adults,
        "max": 20,
    }

    if return_date:
        params["returnDate"] = return_date
        params["nonStop"] = non_stop_bool

    headers = {
        "Authorization": f"Bearer {token}",
    }

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.get(
            FLIGHT_SEARCH_URL,
            headers=headers,
            params=params,
        )

        if resp.status_code != 200:
            # expose Amadeus error instead of hiding it
            raise Exception(resp.json())

        data = resp.json()

    results = []
    for offer in data.get("data", []):
        price = offer.get("price", {}).get("total")
        currency = offer.get("price", {}).get("currency")

        segments = []
        total_duration = 0

        for itinerary in offer.get("itineraries", []):
            for seg in itinerary.get("segments", []):
                segments.append({
                    "from": seg["departure"]["iataCode"],
                    "to": seg["arrival"]["iataCode"],
                    "departure": seg["departure"]["at"],
                    "arrival": seg["arrival"]["at"],
                    "carrier": seg["carrierCode"],
                    "duration": seg["duration"],
                })
                total_duration += parse_iso8601_duration(seg["duration"])

        results.append({
            "price": price,
            "currency": currency,
            "stops": max(len(segments) - 1, 0),
            "duration_minutes": total_duration,
            "segments": segments,
        })

    return results


async def search_locations_service(keyword: str):
    token = await get_amadeus_token()

    headers = {
        "Authorization": f"Bearer {token}",
    }

    params = {
        "subType": "AIRPORT,CITY",
        "keyword": keyword.upper(),
    }

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.get(
            LOCATIONS_URL,
            headers=headers,
            params=params,
        )
        resp.raise_for_status()
        data = resp.json()

    results = []
    for item in data.get("data", []):
        results.append({
            "iataCode": item.get("iataCode"),
            "name": item.get("name"),
            "cityName": item.get("address", {}).get("cityName"),
            "countryName": item.get("address", {}).get("countryName"),
        })

    return results
