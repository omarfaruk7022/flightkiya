import Navbar from "@/components/common/navbar/Navbar";
import FlightCard from "@/components/flightResult/flightCard/FlightCard";
import Booking from "@/components/flightbooking/Booking";
import React from "react";

export default function page() {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <div className="bg-[#F0F4F4] pt-20">
        <div className=" max-w-7xl min-h-screen mx-auto">
          <Booking />
        </div>
      </div>
    </div>
  );
}
