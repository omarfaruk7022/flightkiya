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
                    src={fly?.airline_image ? fly?.airline_image : airline}
                    alt="airline logo"
                    width={40}
                    height={40}
                    priority
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover"
                  />
                  <span className="text-xs sm:text-sm font-medium">
                    {fly?.airline_name || "Unknown Airline"}
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
                      {fly?.totalStops === 0
                        ? "Non-stop"
                        : fly?.totalStops == 1
                        ? "1 Stop"
                        : `${fly.totalStops} Stops`}
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
                    {segment?.CheckinBaggage?.[0]?.Value || "N/A"} Checked,{" "}
                    {segment?.CabinBaggage?.[0]?.Value || "N/A"} Carry-on
                  </p>
                  <p>
                    <strong>Equipment:</strong> {segment?.Equipment || "N/A"}
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
