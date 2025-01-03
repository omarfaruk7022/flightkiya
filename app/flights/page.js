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
import { toast } from "react-toastify";

export default function page({ searchParams }) {
  const router = useRouter();
  const [error, setError] = useState("");
  // const { setFlightResults } = flightStore();
  const [flightResults, setFlightResults] = useState();
  const [selectedStops, setSelectedStops] = useState([]);
  const [departureTime, setDepartureTime] = useState([]);
  const [airlinesFilter, setAirlinesFilter] = useState([]);
  const [isPartiallyRefundable, setIsPartiallyRefundable] = useState(false);
  const [filters, setFilters] = useState({
    isCheapest: false,
    isFastest: false,
    isEarliest: false,
  });

  const toggleFilter = (key) => {
    setFilters({
      isCheapest: false,
      isFastest: false,
      isEarliest: false,
      [key]: true, // Only the toggled filter is true
    });
  };

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

  // const {
  //   data: allFlights,
  //   error: allFlightsError,
  //   isLoading: allFlightsLoading = true,
  //   refetch: allFlightsRefetch,
  // } = useQuery({
  //   queryKey: ["flights", payload],
  //   queryFn: () => fetchData(`b2c/search?filter=true`, "POST", payload),
  //   enabled: false,
  // });
  const queryString = `airlines=${airlinesFilter
    .join(",")
    .toUpperCase()}&stops=${selectedStops.join(
    ","
  )}&refundable=${isPartiallyRefundable}&cheapest=${
    filters.isCheapest
  }&fastest=${filters.isFastest}&earliest=${filters.isEarliest}`;

  const {
    data: allFlights,
    error: allFlightsError,
    isLoading: allFlightsLoading = true,
    refetch: allFlightsRefetch,
  } = useQuery({
    queryKey: ["flights", payload],
    queryFn: () =>
      fetchData(`b2c/search?filter=true&${queryString}`, "POST", payload),
    enabled: false,
  });

  useEffect(() => {
    allFlightsRefetch();
  }, [airlinesFilter, selectedStops, isPartiallyRefundable, filters]);

  useEffect(() => {
    if (allFlights?.success) {
      const { results } = allFlights;
      setFlightResults(results);
    } else {
      setError(allFlights?.error?.message);
      toast.error(allFlights?.error?.message);
      toast.error(allFlightsError?.error?.message);
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
        <div className="pb-20">
          <SearchResultSkeleton />
        </div>
      ) : (
        <div className="bg-[#F0F0F4] ">
          <div className=" max-w-7xl md:max-w-5xl min-h-screen mx-auto">
            <FlightFilter
              filters={filters}
              toggleFilter={toggleFilter}
              departureTIme={departureTime}
              setAirlinesFilter={setAirlinesFilter}
              setSelectedStops={setSelectedStops}
              isPartiallyRefundable={isPartiallyRefundable}
              setIsPartiallyRefundable={setIsPartiallyRefundable}
              selectedStops={selectedStops}
              setDepartureTime={setDepartureTime}
              filter={allFlights?.filter}
            />
            {allFlights?.success ? (
              <>
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
                      <div className="flex items-center space-x-4 w-full">
                        <div className="p-2 bg-yellow-400 rounded-full">
                          <FaFacebookMessenger className="text-white text-xl" />
                        </div>
                        <span className="text-blue-900 font-semibold w-full break-all">
                          m.me/adbiyastour.com
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
        </div>
      )}
    </div>
  );
}
