"use client";
import biman from "@/public/images/biman-bd.png";
import plane from "@/public/images/plane.gif";
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
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import airline from "@/public/images/airline.jpg";
import { Calendar, Clock, Luggage, Plane } from "lucide-react";

export default function FlightCard({ flight, index }) {
  const [openDetailsIndex, setOpenDetailsIndex] = useState(null);
  const [openRefundableIndex, setOpenRefundableIndex] = useState(null);
  const [flightId, setFlightId] = useState(null);
  const { setSelectedFlight, timer } = flightStore();

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
    enabled: false,
    retry: false,
  });

  const handleRevalidateFlight = (flight_id) => {
    setFlightId(flight_id);
  };

  useEffect(() => {
    if (flightId) {
      revalidateFlightQuery();
    }
  }, [flightId]);
  useEffect(() => {
    if (flightData?.data && flightData?.success == true) {
      router.push(`/booking`);
      setSelectedFlight(flightData?.data);
    } else {
      if (flightData?.error?.message) {
        toast.error(flightData?.error?.message);
      } else {
        toast.error(error);
      }
    }
  }, [flightData]);

  const segment = flight?.segments?.[0];
  const fare = flight?.fares;
  const imageurl = flight?.airline_img || biman; // Fallback image

  if (!segment || !fare) return null;

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
  //         <p className="mt-2">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  return (
    <section className="">
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-orange-500/30 backdrop-blur-sm flex items-center justify-center z-50 ">
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Wikimania2023_Animated_Sticker_Airplane.gif/600px-Wikimania2023_Animated_Sticker_Airplane.gif?20230727043952"
              alt="Processing"
              className="w-[200px]"
            />
            <p>Please wait, your request is processing...</p>
          </div>
        </div>
      )}
      <div className="space-y-8 w-full">
        <div className="bg-white relative rounded-2xl shadow-md p-5 md:p-6">
          {/* Flight Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
            {flight?.flights?.map((fly) => (
              <div className="grid grid-cols-1 md:grid-cols-2 col-span-2">
                <div className="flex items-center gap-4">
                  <Image
                    src={fly?.airline_img ? fly?.airline_img : airline}
                    alt="airline logo"
                    width={40}
                    height={40}
                    priority
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover"
                  />
                  <span className="text-xs sm:text-sm font-medium">
                    {fly?.airline || "Unknown Airline"}
                  </span>
                </div>

                {/* Flight Information */}
                <div className="flex flex-col justify-between sm:col-span-2 md:col-span-1">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span>
                      {fly?.DepartureDateTime
                        ? new Date(fly?.DepartureDateTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )
                        : "N/A"}
                    </span>
                    <span>
                      {fly?.ArrivalDateTime
                        ? new Date(fly?.ArrivalDateTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center flex-col space-y-2">
                    <span className="text-xs sm:text-sm">
                      {flight?.stoppage == 0
                        ? "Non-stop"
                        : flight?.stoppage == 1
                        ? "1 Stop"
                        : `${flight.stoppage} Stops`}
                    </span>
                    <Image src={arrowRight} alt="Flight Path Arrow" />
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span>{fly?.DepartureAirportLocationCode || "N/A"}</span>
                    <span>{fly?.ArrivalAirportLocationCode || "N/A"}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Fare Information */}
            <div className="flex flex-col justify-between items-end">
              <div className="text-right space-y-1 sm:space-y-2">
                <p className="text-black text-xl sm:text-2xl font-bold">
                  ${fare.TotalFare || "N/A"}
                </p>
                {/* {fare.BaseFare && (
                  <p className="text-xs sm:text-sm text-black ">
                    ${fare.BaseFare} / Person
                  </p>
                )} */}
              </div>
              <button
                onClick={() => handleRevalidateFlight(flight?.flight_id)}
                disabled={isLoading}
                className={`bg-purple-600 hover:bg-purple-800 text-white py-1  w-[120px] sm:py-2 sm:px-6 rounded-lg flex items-center justify-center space-x-2 mt-0 md:mt-3 mb-5 cursor-pointer`}
              >
                {flight?.flight_id == flightId && isLoading ? (
                  <Oval
                    visible={true}
                    height="25"
                    width="20"
                    secondaryColor="#fff"
                    color="#fff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <>
                    <span>Select</span>
                    <Image src={right} alt="Right Arrow" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Expandable Details Section */}
          <div className="border-t sm:pt-4 flex flex-col gap-3  text-xs sm:text-sm ">
            {/* Flight Details */}
            <div className="mb-3 sm:mb-0">
              <button
                className="text-blue-600"
                onClick={() => toggleDetails(index)}
              >
                Flight Details {openDetailsIndex === index ? "▲" : "▼"}
              </button>
              {openDetailsIndex === index && (
                // <div className="mt-2 border p-3 rounded-lg bg-gray-50 space-y-1 sm:space-y-2">
                //   <p>
                //     <strong>Flight Number:</strong>{" "}
                //     {segment?.OperatingFlightNumber || "N/A"}
                //   </p>
                //   <p>
                //     <strong>Cabin Class:</strong>{" "}
                //     {segment?.CabinClassCode || "N/A"}
                //   </p>
                //   <p>
                //     <strong>Baggage Info:</strong>{" "}
                //     {segment?.CheckinBaggage?.[0]?.Value || "N/A"} Checked,{" "}
                //     {segment?.CabinBaggage?.[0]?.Value || "N/A"} Carry-on
                //   </p>
                //   <p>
                //     <strong>Equipment:</strong> {segment?.Equipment || "N/A"}
                //   </p>
                // </div>

                <div className="p-6 bg-gray-50">
                  {flight?.segments.map((fly, index) => (
                    <div key={fly.flight_no} className="mb-8 last:mb-0">
                      <div className="flex flex-col gap-6">
                        {/* Flight Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Plane className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold">
                              Flight {fly.flight_no}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>
                              Duration: {formatDuration(fly.JourneyDuration)}
                            </span>
                          </div>
                        </div>

                        {/* Flight Route */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Departure */}
                          <div>
                            <p className="text-gray-600 mb-1">Departure</p>
                            <h3 className="font-bold text-lg">
                              {fly.departure_city} (
                              {fly.DepartureAirportLocationCode})
                            </h3>
                            <p className="text-sm text-gray-600">
                              {fly.departure_airport}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Calendar className="w-4 h-4 text-gray-600" />
                              <div>
                                <p className="font-medium">
                                  {formatDateTime(fly.DepartureDateTime).time}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {formatDateTime(fly.DepartureDateTime).date}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Flight Info */}
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-full h-0.5 bg-gray-300 relative">
                              {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-600" /> */}
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                                <Plane className="w-5 h-5 text-blue-600" />
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              {fly.Equipment} • {fly.CabinClassCode}
                            </p>
                          </div>

                          {/* Arrival */}
                          <div>
                            <p className="text-gray-600 mb-1">Arrival</p>
                            <h3 className="font-bold text-lg">
                              {fly.arrival_city} (
                              {fly.ArrivalAirportLocationCode})
                            </h3>
                            <p className="text-sm text-gray-600">
                              {fly.arrival_airport}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Calendar className="w-4 h-4 text-gray-600" />
                              <div>
                                <p className="font-medium">
                                  {formatDateTime(fly.ArrivalDateTime).time}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {formatDateTime(fly.ArrivalDateTime).date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Baggage Information */}
                        <div className="bg-white p-4 rounded-lg border">
                          <div className="flex items-center gap-2 mb-3">
                            <Luggage className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold">
                              Baggage Information
                            </h4>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">
                                Check-in Baggage
                              </p>
                              <p className="font-medium">
                                {fly.CheckinBaggage[0].Value}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Cabin Baggage
                              </p>
                              <p className="font-medium">
                                {fly.CabinBaggage[0].Value}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Divider between flights */}
                      {index < flight?.segments.length - 1 && (
                        <div className="my-8 border-t border-dashed border-gray-300" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Refund Information */}
            <div>
              <button
                className="text-blue-600"
                onClick={() => toggleRefundable(index)}
              >
                Partially Refundable {openRefundableIndex === index ? "▲" : "▼"}
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
    </section>
  );
}
