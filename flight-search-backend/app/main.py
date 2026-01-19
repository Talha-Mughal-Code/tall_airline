from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import flights, locations

app = FastAPI(title="Flight Search API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(flights.router, prefix="/api/flights", tags=["Flights"])
app.include_router(locations.router, prefix="/api/locations", tags=["Locations"])

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
