"use client";
import biman from "@/public/images/biman-bd.png";
import arrowRight from "@/public/icons/arrow-right.svg";
import right from "@/public/icons/right-arrow1.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPhoneAlt, FaFacebookMessenger } from "react-icons/fa";
import { fetchData } from "@/utils/fetcher";
import flightStore from "@/store";
import { useQuery } from "@tanstack/react-query";
import { revalidateFlight } from "@/utils/revalidateFlight";

export default function FlightCard() {
  const [openDetailsIndex, setOpenDetailsIndex] = useState(null);
  const [openRefundableIndex, setOpenRefundableIndex] = useState(null);
  const [flightId, setFlightId] = useState(null);
  const { flightResults, setSelectedFlight } = flightStore();

  // if (!flights?.length) {
  //   return <p className="text-center mt-10">No flight data found.</p>;
  // }

  const toggleDetails = (index) => {
    setOpenDetailsIndex(openDetailsIndex === index ? null : index);
  };

  const toggleRefundable = (index) => {
    setOpenRefundableIndex(openRefundableIndex === index ? null : index);
  };
  const router = useRouter();

  const {
    data: flightData,
    error,
    isLoading,
    refetch: revalidateFlightQuery,
  } = useQuery({
    queryKey: ["revalidateFlight", flightId],
    queryFn: ({ queryKey }) => {
      const [, flight_id] = queryKey;
      if (typeof flight_id !== "string") {
        throw new Error("Invalid flight ID");
      }
      return revalidateFlight(flight_id);
    },
    enabled: false, // Disable automatic fetching
  });

  const handleRevalidateFlight = (flight_id) => {
    setFlightId(flight_id);
    revalidateFlightQuery();
  };

  useEffect(() => {
    if (flightData?.data && flightData?.success == true) {
      router.push(`/booking`);
      setSelectedFlight(flightData?.data);
    }
  }, [flightData]);
  console.log(flightResults);

  return (
    <section className="flex gap-[60px] w-full py-8">
      <div className="flex">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {flightResults?.map((flight, index) => {
            const segment = flight?.segments?.[0];
            const fare = flight?.fares;
            const imageurl = flight?.airline_img || biman; // Fallback image

            if (!segment || !fare) return null;

            return (
              <div key={index} className="space-y-8 lg:w-[1000px] md:w-[900px]">
                <div className="bg-white relative rounded-2xl shadow-md p-5 md:p-6">
                  {/* Flight Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Airline Logo and Name */}
                    <div className="flex items-center gap-4">
                      <Image
                        src={imageurl}
                        alt="airline logo"
                        width={40}
                        height={40}
                        priority
                        className="w-10 h-10 sm:w-12 sm:h-12"
                      />
                      <span className="text-xs sm:text-sm font-medium">
                        {segment?.operating_airline || "Unknown Airline"}
                      </span>
                    </div>

                    {/* Flight Information */}
                    <div className="flex flex-col justify-between sm:col-span-2 md:col-span-1">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span>
                          {segment?.DepartureDateTime
                            ? new Date(
                                segment.DepartureDateTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                            : "N/A"}
                        </span>
                        <span>
                          {segment?.ArrivalDateTime
                            ? new Date(
                                segment.ArrivalDateTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center justify-center flex-col space-y-2">
                        <span className="text-xs sm:text-sm">
                          {segment?.stops === 0
                            ? "Non-stop"
                            : `${segment.stops} Stops`}
                        </span>
                        <Image src={arrowRight} alt="Flight Path Arrow" />
                      </div>
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span>
                          {segment?.DepartureAirportLocationCode || "N/A"}
                        </span>
                        <span>
                          {segment?.ArrivalAirportLocationCode || "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Fare Information */}
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right space-y-1 sm:space-y-2">
                        {fare.BaseFare && (
                          <p className="text-xs sm:text-sm text-gray-500 line-through">
                            ${fare.BaseFare}
                          </p>
                        )}
                        <p className="text-yellow-600 text-xl sm:text-2xl font-bold">
                          ${fare.TotalFare || "N/A"}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleRevalidateFlight(flight?.flight_id)
                        }
                        className="bg-purple-600 text-white py-1 px-4 sm:py-2 sm:px-6 rounded-lg flex items-center justify-center space-x-2 mt-3 sm:mt-0"
                      >
                        <span>Select</span>
                        <Image src={right} alt="Right Arrow" />
                      </button>
                    </div>
                  </div>

                  {/* Expandable Details Section */}
                  <div className="border-t pt-3 pb-3 sm:pt-4 sm:pb-4 flex flex-col sm:flex-row justify-between items-start text-xs sm:text-sm px-3 sm:px-5">
                    {/* Flight Details */}
                    <div className="mb-3 sm:mb-0">
                      <button
                        className="text-blue-600"
                        onClick={() => toggleDetails(index)}
                      >
                        Flight Details {openDetailsIndex === index ? "▲" : "▼"}
                      </button>
                      {openDetailsIndex === index && (
                        <div className="mt-2 border p-3 rounded-lg bg-gray-50 space-y-1 sm:space-y-2">
                          <p>
                            <strong>Flight Number:</strong>{" "}
                            {segment?.OperatingFlightNumber || "N/A"}
                          </p>
                          <p>
                            <strong>Cabin Class:</strong>{" "}
                            {segment?.CabinClassCode || "N/A"}
                          </p>
                          <p>
                            <strong>Baggage Info:</strong>{" "}
                            {segment?.CheckinBaggage?.[0]?.Value || "N/A"}{" "}
                            Checked,{" "}
                            {segment?.CabinBaggage?.[0]?.Value || "N/A"}{" "}
                            Carry-on
                          </p>
                          <p>
                            <strong>Equipment:</strong>{" "}
                            {segment?.Equipment || "N/A"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Refund Information */}
                    <div>
                      <button
                        className="text-blue-600"
                        onClick={() => toggleRefundable(index)}
                      >
                        Partially Refundable{" "}
                        {openRefundableIndex === index ? "▲" : "▼"}
                      </button>
                      {openRefundableIndex === index && (
                        <div className="mt-2 border p-3 rounded-lg bg-gray-50 space-y-1 sm:space-y-2">
                          <p>
                            <strong>Refund Allowed:</strong>{" "}
                            {flight.penaltiesData?.RefundAllowed ? "Yes" : "No"}
                          </p>
                          <p>
                            <strong>Refund Penalty:</strong>{" "}
                            {flight.penaltiesData?.RefundPenaltyAmount || "N/A"}{" "}
                            {flight.penaltiesData?.Currency || "N/A"}
                          </p>
                          <p>
                            <strong>Change Allowed:</strong>{" "}
                            {flight.penaltiesData?.ChangeAllowed ? "Yes" : "No"}
                          </p>
                          <p>
                            <strong>Change Penalty:</strong>{" "}
                            {flight.penaltiesData?.ChangePenaltyAmount || "N/A"}{" "}
                            {flight.penaltiesData?.Currency || "N/A"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:w-[300px] lg:w-[300px] lg:h-[300px] md:h-[300px] bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4">
          <h2 className="text-white text-lg font-semibold text-center">
            We’re here for you 24/7
          </h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-yellow-400 rounded-full">
              <FaPhoneAlt className="text-white text-xl" />
            </div>
            <span className="text-blue-900 font-semibold">
              +1 (347) 698-6704
            </span>
          </div>
          <hr className="border-gray-300" />
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-yellow-400 rounded-full">
              <FaFacebookMessenger className="text-white text-xl" />
            </div>
            <span className="text-blue-900 font-semibold">
              m.me/Flightkiya.com
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
