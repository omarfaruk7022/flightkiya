import React from "react";
import { FaPlane } from "react-icons/fa";

export default function TripHeader({
  bookingRef,
  bookingStatus,
  tripType,
  origin,
  destination,
}) {
  return (
    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Trip Details</h1>
        <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">
          {bookingStatus}
        </span>
      </div>
      <p className="mt-2">Booking Reference: {bookingRef}</p>
      <div className="mt-4 flex items-center">
        <FaPlane className="mr-2" />
        <span className="text-xl">
          {origin} to {destination}
        </span>
      </div>
      <p className="mt-2">{tripType} Trip</p>
    </div>
  );
}
