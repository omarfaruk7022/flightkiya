"use client";
import Navbar from "@/components/common/navbar/Navbar";
import FlightCard from "@/components/flightResult/flightCard/FlightCard";
import FlightFilter from "@/components/flightResult/flightFilter/FlightFilter";
import SearchResultSkeleton from "@/components/skeletons/SearchResultSkeleton";

import { fetchData } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFacebookMessenger, FaPhoneAlt } from "react-icons/fa";

export default function page({ searchParams }) {
  const router = useRouter();
  const [error, setError] = useState("");
  // const { setFlightResults } = flightStore();
  const [flightResults, setFlightResults] = useState();
  const {
    originDestinations = "[]",
    tripType = "",
    travelersData = "[]",
    pricingSourceType = "Public",
    requestOptions = "Fifty",
  } = searchParams;

  let parsedOriginDestinations;
  try {
    parsedOriginDestinations = JSON.parse(originDestinations);
  } catch (error) {
    console.error("Error parsing originDestinations:", error);
    parsedOriginDestinations = [];
  }

  let passengerTypeQuantities;
  try {
    passengerTypeQuantities = JSON.parse(travelersData);
  } catch (error) {
    console.error("Error parsing originDestinations:", error);
    passengerTypeQuantities = [];
  }

  const payload = {
    OriginDestinationInformations: parsedOriginDestinations,
    TravelPreferences: {
      AirTripType: tripType,
    },
    PassengerTypeQuantities: passengerTypeQuantities,
    PricingSourceType: pricingSourceType,
    RequestOptions: requestOptions,
  };

  const {
    data: allFlights,
    error: allFlightsError,
    isLoading: allFlightsLoading = true,
    refetch: allFlightsRefetch,
  } = useQuery({
    queryKey: ["flights", payload],
    queryFn: () => fetchData("b2c/search", "POST", payload),
    enabled: false,
  });

  useEffect(() => {
    if (allFlights?.success) {
      const { results } = allFlights;
      setFlightResults(results);
    } else {
      setError(allFlights?.error?.message);
    }
  }, [allFlights, allFlightsError]);

  useEffect(() => {
    if (originDestinations) {
      allFlightsRefetch();
    }
  }, [originDestinations]);

  return (
    <div>
      <Navbar />
      {allFlightsLoading ? (
        <SearchResultSkeleton />
      ) : (
        <div className="bg-[#F0F4F4] px-5 md:px-48 min-h-screen">
          {allFlights?.success ? (
            <>
              <FlightFilter />
              <div className="grid  grid-cols-1 md:grid-cols-9 gap-5">
                <div className="col-span-7 flex flex-col gap-5">
                  {flightResults?.length > 0
                    ? flightResults?.map((flight, index) => (
                        <FlightCard flight={flight} key={index} />
                      ))
                    : ""}
                </div>
                <div className="w-full lg:h-[300px] md:h-[300px] bg-white rounded-lg shadow-md overflow-hidden col-span-2">
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
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center w-full h-full min-h-screen">
                <h2 className="text-center text-red-500 text-2xl">{error}</h2>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
