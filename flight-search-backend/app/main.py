from fastapi import FastAPI
from app.routes import flights, locations

app = FastAPI(title="Flight Search API")

# Register routes
app.include_router(flights.router, prefix="/api/flights", tags=["Flights"])
app.include_router(locations.router, prefix="/api/locations", tags=["Locations"])

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
