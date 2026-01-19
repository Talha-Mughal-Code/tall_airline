export interface FlightSegment {
    from: string;
    to: string;
    departure: string;
    arrival: string;
    carrier: string;
    duration: string;
  }
  
  export interface FlightResult {
    price: string;
    currency: string;
    stops: number;
    duration_minutes: number;
    segments: FlightSegment[];
  }
  
  export interface Location {
    iataCode: string;       // Airport or city IATA code
    name: string;           // Airport name
    cityName: string;       // City name
    countryName: string;    // Country name
  }