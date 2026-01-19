import React from "react";
import { FlightResult } from "@/lib/types";

interface FlightResultsProps {
  flights: FlightResult[];
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights }) => {
  if (!flights || flights.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No flights found.
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      {flights.map((flight, idx) => (
        <div
          key={idx}
          className="border rounded-xl p-4 shadow hover:shadow-lg transition duration-200"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">
              {flight.price} {flight.currency}
            </span>
            <span className="text-sm text-gray-500">
              {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop(s)`} |{" "}
              {Math.floor(flight.duration_minutes / 60)}h{" "}
              {flight.duration_minutes % 60}m
            </span>
          </div>

          <div className="space-y-2">
            {flight.segments.map((seg, i) => (
              <div key={i} className="flex justify-between text-sm text-gray-700">
                <div>
                  <span className="font-medium">{seg.from}</span> →{" "}
                  <span className="font-medium">{seg.to}</span>
                </div>
                <div>
                  {new Date(seg.departure).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{" "}
                  -{" "}
                  {new Date(seg.arrival).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="italic">{seg.carrier}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
