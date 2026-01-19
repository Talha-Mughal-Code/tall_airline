from fastapi import APIRouter, Query, HTTPException
from app.services.amadeus import search_locations_service

# Create a router object
router = APIRouter()

@router.get("/search")
async def search_locations(q: str = Query(..., min_length=2, description="City or airport keyword")):
    """
    Search airports and cities for autocomplete.
    Returns a list of locations with IATA codes, city names, and countries.
    """
    try:
        results = await search_locations_service(q)
        return {"locations": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
