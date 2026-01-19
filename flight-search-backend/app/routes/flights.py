from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.services.amadeus import search_flights_service

# Create a router object
router = APIRouter()

@router.get("/search")
async def search_flights(
    origin: str = Query(..., min_length=3, max_length=3, description="Origin IATA code"),
    destination: str = Query(..., min_length=3, max_length=3, description="Destination IATA code"),
    departure_date: str = Query(..., description="YYYY-MM-DD"),
    return_date: Optional[str] = Query(None, description="YYYY-MM-DD for round-trip"),
    adults: int = Query(1, ge=1, description="Number of adults"),
    non_stop: Optional[bool] = Query(False, description="Only non-stop flights"),
):
    """
    Search flights using Amadeus Flight Offers API.
    Returns normalized JSON ready for frontend display.
    """
    try:
        results = await search_flights_service(
            origin, destination, departure_date, return_date, adults, non_stop
        )
        return {"flights": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
