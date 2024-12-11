import React from "react";
import { FaPlane, FaClock } from "react-icons/fa";
import { format, parseISO } from "date-fns";

export default function FlightDetails({ flight }) {
  if (!flight) {
    return (
      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
        role="alert"
      >
        <p>Flight information is not available.</p>
      </div>
    );
  }

  const departureDate = flight.DepartureDateTime
    ? parseISO(flight.DepartureDateTime)
    : null;
  const arrivalDate = flight.ArrivalDateTime
    ? parseISO(flight.ArrivalDateTime)
    : null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <FaPlane className="mr-2 text-blue-600" />
          <span className="font-semibold">{flight.FlightNumber || "N/A"}</span>
        </div>
        <span className="text-sm text-gray-600">
          {flight.OperatingAirlineCode || "N/A"}
        </span>
      </div>
      <div className="flex justify-between mb-2">
        <div>
          <p className="font-semibold">
            {flight.DepartureAirportLocationCode || "N/A"}
          </p>
          {departureDate && (
            <>
              <p className="text-sm text-gray-600">
                {format(departureDate, "MMM d, yyyy")}
              </p>
              <p className="text-sm text-gray-600">
                {format(departureDate, "h:mm a")}
              </p>
            </>
          )}
        </div>
        <div className="text-right">
          <p className="font-semibold">
            {flight.ArrivalAirportLocationCode || "N/A"}
          </p>
          {arrivalDate && (
            <>
              <p className="text-sm text-gray-600">
                {format(arrivalDate, "MMM d, yyyy")}
              </p>
              <p className="text-sm text-gray-600">
                {format(arrivalDate, "h:mm a")}
              </p>
            </>
          )}
        </div>
      </div>
      {flight.JourneyDuration && (
        <div className="flex items-center text-sm text-gray-600">
          <FaClock className="mr-1" />
          <span>
            Duration: {Math.floor(parseInt(flight.JourneyDuration) / 60)}h{" "}
            {parseInt(flight.JourneyDuration) % 60}m
          </span>
        </div>
      )}
      <p className="text-sm mt-2">
        <span className="font-semibold">Baggage:</span>{" "}
        {flight.Baggage || "N/A"}
      </p>
    </div>
  );
}
