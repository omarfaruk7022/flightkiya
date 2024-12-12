"use client";
import React, { useEffect, useState } from "react";
import flight from "@/public/icons/flight.png";
import hotel from "@/public/icons/hotel.png";
import tour from "@/public/icons/tour.png";
import visa from "@/public/icons/visa.png";
import Image from "next/image";
import Navbar from "../common/navbar/Navbar";
// import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";
import search from "@/public/icons/search.svg";
import "react-datepicker/dist/react-datepicker.css";
import RequestNow from "../home/requestNow/RequestNow";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/fetcher";
import flightStore from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  Car,
  Hotel,
  Plane,
  FlipHorizontalIcon as SwapHorizontal,
} from "lucide-react";

const airportsData = require("../../airports.json");
const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: 0,
    border: "none", // Remove all borders from the control
    boxShadow: "none", // Remove any box shadow
    fontSize: "13px",
    minHeight: "10px",
    width: "90%",
    "&:hover": {
      border: "none", // Remove border on hover
    },
  }),
  valueContainer: (provided) => ({
    ...provided,

    padding: 0,
    // Remove padding around the selected value
  }),
  menu: (provided) => ({
    ...provided,
    border: "none", // Remove all borders from the menu
    boxShadow: "none",
    // Remove any box shadow from the menu
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0, // Remove padding from menu list
    border: "none", // Remove all borders from the menu list
    fontSize: "12px",
  }),
  placeholder: (provided) => ({
    ...provided,
    marginLeft: 0, // Remove left margin from the placeholder
    paddingLeft: 0, // Remove left padding from the placeholder
  }),
  dropdownIndicator: () => ({
    display: "none", // Completely hide the dropdown indicator
  }),
  indicatorSeparator: () => ({
    display: "none", // Remove the vertical separator line
  }),
};

const animatedComponents = makeAnimated();
const FlightSearch = () => {
  const router = useRouter();
  const [categoryTab, setCategoryTab] = useState("flight");
  const [flyFrom, setFlyFrom] = useState("");
  const [flyFromPlaceholder, setFlyFromPlaceholder] = useState({
    label: "Dhaka, Bangladesh (DAC)",
    value: "DAC",
  });
  const [flyTo, setFlyTo] = useState("");
  const [flyToPlaceholder, setFlyToPlaceholder] = useState({
    label: "New York, USA (JFK)",
    value: "JFK",
  });

  const [wayTabs, setWayTabs] = useState("oneway");
  const today = new Date().toISOString().split("T")[0];
  const [departureDate, setDepartureDate] = useState(today);
  const [arrivalDate, setArrivalDate] = useState(new Date() + 1);
  const [returnDate, setReturnDate] = useState(today);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childAges, setChildAges] = useState([]); // Default ages for children
  const [flightClass, setFlightClass] = useState("Economy");
  const [searchQueryArrival, setSearchQueryArrival] = useState("JFK");
  const [searchQueryDestination, setSearchQueryDestination] = useState("DAC");
  const [isOpenDestination, setIsOpenDestination] = useState(false);
  const [isOpenArrival, setIsOpenArrival] = useState(false);
  const handleIncrement = (setter, value) => setter(value + 1);
  const handleDecrement = (setter, value) => value > 0 && setter(value - 1);
  const [tripType, setTripType] = useState("OneWay"); // Default trip type is OneWay
  const [passengerType, setPassengerType] = useState("ADT");

  const {
    setPassengerInformation,
    setSelectedFlight,
    setFlightResults,
    setTravelersInfo,
    setBookingId,
  } = flightStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [originAirport, setOriginAirport] = useState({
    label: "Hazrat shahjalal Intl",
    code: "DAC",
    value: "Dhaka, Bangladesh",
  });
  const [destinationAirport, setDestinationAirport] = useState({
    label: "New York, USA (JFK)",
    code: "JFK",
    value: "New York, USA",
  });

  const [cities, setCities] = useState([
    {
      id: 1,
      searchQueryDestination: "",
      searchQueryArrival: "",
      departureDate: null,
      isOpenOrigin: false,
      isOpenDestination: false,
    },
  ]);

  const transformedData = cities.map((item) => ({
    DepartureDateTime: item.departureDate,
    OriginLocationCode: item.searchQueryDestination,
    DestinationLocationCode: item.searchQueryArrival,
  }));
  const [travelersData, setTravelersData] = useState();
  let originDestinations = [];

  const validDepartureDate = new Date(departureDate);
  const validReturnDate = new Date(returnDate);
  const departureDateTime =
    validDepartureDate instanceof Date && !isNaN(validDepartureDate)
      ? `${validDepartureDate.toISOString().split("T")[0]}T00:00:00`
      : "";
  const returnDateTime =
    validReturnDate instanceof Date && !isNaN(validReturnDate)
      ? `${validReturnDate.toISOString().split("T")[0]}T00:00:00`
      : "";
  if (tripType === "OneWay") {
    originDestinations.push({
      DepartureDateTime: departureDateTime,
      OriginLocationCode: searchQueryDestination,
      DestinationLocationCode: searchQueryArrival,
    });
  }

  // Handle Return trip type
  if (tripType === "Return") {
    originDestinations.push(
      {
        DepartureDateTime: departureDateTime,
        OriginLocationCode: searchQueryDestination,
        DestinationLocationCode: searchQueryArrival,
      },
      {
        DepartureDateTime: returnDateTime,
        OriginLocationCode: searchQueryArrival,
        DestinationLocationCode: searchQueryDestination,
      }
    );
  }

  useEffect(() => {
    const travelerData = generateTravelerData();
    setTravelersData(travelerData);
  }, []);

  const generateTravelerData = () => {
    const passengerTypes = [];

    // Add Adults to the passengerTypes array
    if (adults > 0) {
      passengerTypes.push({
        Code: "ADT",
        Quantity: adults,
      });
    }

    // Add Children to the passengerTypes array
    if (children > 0) {
      passengerTypes.push({
        Code: "CHD",
        Quantity: children,
        // ChildAges: childAges, // Include child ages
      });
    }

    // Add Infants to the passengerTypes array
    if (infants > 0) {
      passengerTypes.push({
        Code: "INF",
        Quantity: infants,
      });
    }

    return passengerTypes;
  };

  const handleDoneClick = () => {
    const travelerData = generateTravelerData();
    setTravelersData(travelerData);
    setTravelerInputShow(!travelerInputShow);
  };

  const fetchFlightData = async () => {
    setLoading(true);
    setError("");

    if (!departureDate) {
      toast.error("Please select a departure date.");
      setError("Departure date is required.");
      setLoading(false);
      return;
    }

    if (!searchQueryDestination) {
      toast.error("Please select a departure location.");
      setError("Departure location is required.");
      setLoading(false);
      return;
    }

    if (!searchQueryArrival) {
      toast.error("Please select a destination location.");
      setError("Destination location is required.");
      setLoading(false);
      return;
    }

    if (travelerInputShow) {
      toast.error("Please complete the traveler input.");
      setError("Traveler input is required.");
      setLoading(false);
      return;
    }

    if (tripType === "Return" && !returnDate) {
      toast.error("Please select a return date.");
      setError("Return date is required for return trips.");
      setLoading(false);
      return;
    }

    if (tripType == "OpenJaw") {
      if (transformedData.length < 2) {
        toast.error("You must select at least 2 cities.");
        setError("City selection is too few.");
        setLoading(false);
        return;
      }
      const invalidTransformedData = transformedData.find(
        (item) =>
          !item.DepartureDateTime ||
          !item.OriginLocationCode ||
          !item.DestinationLocationCode
      );

      if (invalidTransformedData) {
        toast.error("One or more city data entries are invalid.");
        setError("Please ensure all city data entries are filled correctly.");
        setLoading(false);
        return;
      }
    }

    const queryString = new URLSearchParams({
      originDestinations:
        tripType == "OpenJaw"
          ? JSON.stringify(transformedData)
          : JSON.stringify(originDestinations),
      tripType,
      travelersData: JSON.stringify(travelersData),
      pricingSourceType: "Public",
      requestOptions: "Fifty",
    }).toString();
    setFlightResults([]);
    setSelectedFlight({});
    setTravelersInfo([]);
    setBookingId(null);
    setPassengerInformation(travelersData);
    router.push(`/flights?${queryString}`);
  };

  const handleChildrenIncrement = () => {
    setChildren(children + 1);
    setChildAges([...childAges, 2]);
  };

  const handleChildrenDecrement = () => {
    if (children > 0) {
      setChildren(children - 1);
      setChildAges(childAges.slice(0, -1));
    }
  };
  const [travelerInputShow, setTravelerInputShow] = useState(false);

  const filteredAirportsArrival = airportsData.filter(
    (airport) =>
      (airport.name.toLowerCase().includes(searchQueryArrival.toLowerCase()) ||
        airport.value
          .toLowerCase()
          .includes(searchQueryArrival.toLowerCase())) &&
      airport.name.toLowerCase() !== searchQueryDestination.toLowerCase() &&
      airport.value.toLowerCase() !== searchQueryDestination.toLowerCase()
  );

  const filteredAirportsDestination = airportsData.filter(
    (airport) =>
      (airport.name
        .toLowerCase()
        .includes(searchQueryDestination.toLowerCase()) ||
        airport.value
          .toLowerCase()
          .includes(searchQueryDestination.toLowerCase())) &&
      airport.name.toLowerCase() !== searchQueryArrival.toLowerCase() &&
      airport.value.toLowerCase() !== searchQueryArrival.toLowerCase()
  );

  const filteredAirportsArrivalMulti = cities.map((city) =>
    airportsData.filter(
      (airport) =>
        (airport.name
          .toLowerCase()
          .includes(city.searchQueryArrival.toLowerCase()) ||
          airport.value
            .toLowerCase()
            .includes(city.searchQueryArrival.toLowerCase())) &&
        airport.value !== city.searchQueryDestination
    )
  );

  const filteredAirportsDestinationMulti = cities.map((city) =>
    airportsData.filter(
      (airport) =>
        (airport.name
          .toLowerCase()
          .includes(city.searchQueryDestination.toLowerCase()) ||
          airport.value
            .toLowerCase()
            .includes(city.searchQueryDestination.toLowerCase())) &&
        airport.value !== city.searchQueryArrival
    )
  );

  const handleAddCity = () => {
    setCities([
      ...cities,
      {
        id: cities.length + 1,
        searchQueryDestination: "",
        searchQueryArrival: "",
        departureDate: null,
      },
    ]);
  };
  const handleDeleteCity = () => {
    if (cities.length > 1) {
      setCities(cities.slice(0, -1));
    }
  };

  const updateCityData = (id, field, value) => {
    setCities((prevCities) =>
      prevCities.map((city) =>
        city.id === id ? { ...city, [field]: value } : city
      )
    );
  };

  const toggleField = (id, field) => {
    setCities((prevCities) =>
      prevCities.map((city) =>
        city.id === id ? { ...city, [field]: !city[field] } : city
      )
    );
  };

  return (
    <section className="bg-[url('/images/banner-1.jpeg')] bg-cover w-full  ">
      <div className=" w-full container mx-auto ">
        <div className="">
          <Navbar />
        </div>

        <div className="px-5 md:px-20   pt-36 pb-32">
          <div className="relative bg-white p-6  container shadow-xl h-fit md:h-[84px] rounded-[10px] w-full md:w-[551px] mx-auto bottom-[-25px]">
            <div className="flex items-center justify-between px-2 md:px-14 flex-wrap">
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  categoryTab == "flight"
                    ? "border-b-4 border-[var(--tertiary)] py-2 "
                    : ""
                }`}
                onClick={() => setCategoryTab("flight")}
              >
                <Image src={flight} alt="" className="w-[22px] h-[22px]" />
                <span className="text-[var(--secondary)] text-[16px] font-semibold">
                  Flight
                </span>
              </div>
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  categoryTab == "hotel"
                    ? "border-b-4 border-[var(--tertiary)] py-2 "
                    : ""
                }`}
                onClick={() => setCategoryTab("hotel")}
              >
                <Image src={hotel} alt="" className="w-[22px] h-[22px]" />
                <span className="text-[var(--secondary)] text-[16px] font-semibold">
                  Hotel
                </span>
              </div>{" "}
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  categoryTab == "tour"
                    ? "border-b-4 border-[var(--tertiary)] py-2 "
                    : ""
                }`}
                onClick={() => setCategoryTab("tour")}
              >
                <Image src={tour} alt="" className="w-[22px] h-[22px]" />
                <span className="text-[var(--secondary)] text-[16px] font-semibold">
                  Tour
                </span>
              </div>{" "}
              <div
                className={`flex items-center gap-2 cursor-pointer ${
                  categoryTab == "visa"
                    ? "border-b-4 border-[var(--tertiary)] py-2"
                    : ""
                }`}
                onClick={() => setCategoryTab("visa")}
              >
                <Image src={visa} alt="" className="w-[22px] h-[22px]" />
                <span className="text-[var(--secondary)] text-[16px] font-semibold">
                  Visa
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white w-full shadow-lg   h-fit rounded-[10px]  pt-16 px-2 md:px-14 pb-10">
            {/* Way tabs */}
            <div className="flex items-center flex-wrap justify-center  gap-5">
              <div className="  flex justify-center  gap-5 ">
                <div className="bg-[#d7cbe9] rounded-full flex items-center gap-1 md:gap-4  p-3">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        defaultChecked
                        type="radio"
                        className="h-5 w-5 cursor-pointer"
                        name="route"
                        value="OneWay"
                        onChange={(e) => setTripType(e.target.value)}
                      />
                      <span className="text-[var(--primary)] text-[12px] md:text-[15px] font-bold">
                        One way
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        checked={tripType == "Return"}
                        type="radio"
                        className="h-5  w-5 cursor-pointer"
                        name="route"
                        value="Return"
                        onChange={(e) => setTripType(e.target.value)}
                      />
                      <span className="text-[var(--primary)] text-[12px] md:text-[15px] font-bold">
                        Round trip
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        checked={tripType == "OpenJaw"}
                        type="radio"
                        className="h-5  w-5 cursor-pointer"
                        name="route"
                        value="OpenJaw"
                        onChange={(e) => setTripType(e.target.value)}
                      />

                      <span className="text-[var(--primary)] text-[12px] md:text-[15px] font-bold ">
                        Multi city
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  className="bg-[#d7cbe9] rounded-full flex items-center gap-4  p-3"
                  onClick={() => handleDoneClick()}
                >
                  <label className="w-full cursor-pointer">
                    <div className="flex items-center gap-2 ">
                      {/* <span className="text-[var(--gray)] text-[10px] font-semibold block ">
                        Traveler, class
                      </span> */}
                      <span className="text-[15px] font-semibold block  border-r-2 border-black pr-2">
                        {adults + children + infants > 1 ? (
                          <>{adults + children + infants + " " + "Travelers"}</>
                        ) : (
                          <>{adults + children + infants + " " + "Traveler"}</>
                        )}
                      </span>
                      <span className="text-[15px] font-semibold">
                        {flightClass}
                      </span>
                    </div>
                  </label>
                </div>
                <div>
                  {travelerInputShow && (
                    <div
                      className="absolute end-0 z-10 mt-2  rounded-md border border-gray-100 bg-white shadow-lg"
                      role="menu"
                    >
                      <div className="w-full p-4 bg-white rounded-lg shadow-md">
                        {/* Adults */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">Adults</h3>
                            <p className="text-sm text-gray-500">
                              12 years and above
                            </p>
                          </div>
                          <div className="flex items-center">
                            <button
                              onClick={() => handleDecrement(setAdults, adults)}
                              className="text-lg font-semibold px-2"
                            >
                              −
                            </button>
                            <span className="mx-2">{adults}</span>
                            <button
                              onClick={() => handleIncrement(setAdults, adults)}
                              className="text-lg font-semibold px-2"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">Children</h3>
                            <p className="text-sm text-gray-500">2–11 years</p>
                          </div>
                          <div className="flex items-center">
                            <button
                              onClick={handleChildrenDecrement}
                              className="text-lg font-semibold px-2"
                            >
                              −
                            </button>
                            <span className="mx-2">{children}</span>
                            <button
                              onClick={handleChildrenIncrement}
                              className="text-lg font-semibold px-2"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children Ages */}
                        {/* {children > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold">Child Ages</h4>
                              <div className="flex space-x-2 mt-2">
                                {childAges.map((age, index) => (
                                  <select
                                    key={index}
                                    value={age}
                                    onChange={(e) => {
                                      const newAges = [...childAges];
                                      newAges[index] = Number(e.target.value);
                                      setChildAges(newAges);
                                    }}
                                    className="border rounded px-2 py-1"
                                  >
                                    {[...Array(12).keys()].map((i) => (
                                      <option key={i} value={i + 1}>
                                        {i + 1}
                                      </option>
                                    ))}
                                  </select>
                                ))}
                              </div>
                            </div>
                          )} */}

                        {/* Infants */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">Infant</h3>
                            <p className="text-sm text-gray-500">
                              Below 2 years
                            </p>
                          </div>
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                handleDecrement(setInfants, infants)
                              }
                              className="text-lg font-semibold px-2"
                            >
                              −
                            </button>
                            <span className="mx-2">{infants}</span>
                            <button
                              onClick={() =>
                                handleIncrement(setInfants, infants)
                              }
                              className="text-lg font-semibold px-2"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Class Selection */}
                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Class</h3>
                          <div className="flex items-center space-x-4">
                            <div>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="flightClass"
                                  value="Economy"
                                  checked={flightClass === "Economy"}
                                  onChange={() => setFlightClass("Economy")}
                                  className="mr-2"
                                />
                                Economy
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="flightClass"
                                  value="Business"
                                  checked={flightClass === "Business"}
                                  onChange={() => setFlightClass("Business")}
                                  className="mr-2"
                                />
                                Business
                              </label>
                            </div>
                            <div>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="flightClass"
                                  value="First"
                                  checked={flightClass === "First"}
                                  onChange={() => setFlightClass("First")}
                                  className="mr-2"
                                />
                                First
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="flightClass"
                                  value="Premium Economy"
                                  checked={flightClass === "Premium Economy"}
                                  onChange={() =>
                                    setFlightClass("Premium Economy")
                                  }
                                  className="mr-2"
                                />
                                Premium
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Done Button */}
                        <button
                          className="w-full bg-[var(--primary-btn)] text-white font-semibold py-2 rounded"
                          onClick={() => handleDoneClick()}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* inputs section */}
            <div>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-7 items-center gap-2 w-full">
                {tripType == "OneWay" || tripType == "Return" ? (
                  <>
                    <div className="flex items-center col-span-1  md:col-span-4 w-full">
                      <div className="relative w-full">
                        <div className="border-2 border-[#BEA8A8] pt-2 ps-5 w-full rounded-l-md  h-[69px]">
                          <label
                            className="w-full cursor-pointer"
                            onClick={() =>
                              setIsOpenDestination(!isOpenDestination)
                            }
                          >
                            <input
                              value={searchQueryDestination}
                              type="text"
                              onChange={(e) =>
                                setSearchQueryDestination(e.target.value)
                              }
                              placeholder="From ?"
                              className="w-full focus:outline-none bg-transparent "
                            />
                            <div className="block">
                              <span className="text-[8px] md:text-[15px] font-semibold ">
                                {originAirport?.label} {originAirport?.value}
                              </span>
                            </div>
                          </label>
                        </div>
                        {isOpenDestination ? (
                          <div className="w-full mx-auto bg-white rounded-xl shadow-md   absolute top-20  max-h-[600px] z-10 overflow-y-auto">
                            <div className="p-8 ">
                              <ul className="space-y-4">
                                {filteredAirportsDestination.map(
                                  (destination, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center space-x-4 cursor-pointer"
                                      onClick={() => {
                                        setSearchQueryDestination(
                                          destination.value
                                        );
                                        setIsOpenDestination(false);
                                        setOriginAirport({
                                          label: destination.label,
                                          value: destination.value,
                                          code: destination.name,
                                        });
                                      }}
                                    >
                                      <div className="flex-grow">
                                        <p className="font-semibold">
                                          {destination.name},{" "}
                                          {destination.value}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {destination.label}
                                        </p>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="relative w-full ">
                        <div className="border-2  border-l-0 border-[#BEA8A8] pt-2 ps-5 rounded-r-md  h-[69px]">
                          <label
                            className="w-full cursor-pointer"
                            onClick={() => setIsOpenArrival(!isOpenArrival)}
                          >
                            <input
                              value={searchQueryArrival}
                              type="text"
                              onChange={(e) =>
                                setSearchQueryArrival(e.target.value)
                              }
                              placeholder="To ?"
                              className="w-full focus:outline-none  bg-transparent"
                            />
                            <div className="block">
                              <span className="text-[8px] md:text-[15px] font-semibold">
                                {destinationAirport?.label}{" "}
                                {destinationAirport?.value}
                              </span>
                            </div>
                          </label>
                        </div>
                        {isOpenArrival ? (
                          <div className=" mx-auto bg-white rounded-xl shadow-md  absolute top-20  max-h-[600px] z-10 overflow-y-auto">
                            <div className="p-8 ">
                              <ul className="space-y-4">
                                {filteredAirportsArrival.map(
                                  (arrival, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center space-x-4 cursor-pointer"
                                      onClick={() => {
                                        setSearchQueryArrival(arrival.value);
                                        setIsOpenArrival(false);
                                        setDestinationAirport({
                                          code: arrival.name,
                                          value: arrival.value,
                                          label: arrival.label,
                                        });
                                      }}
                                    >
                                      <div className="flex-grow">
                                        <p className="font-semibold">
                                          {arrival.name}, {arrival.value}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          {arrival.label}
                                        </p>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div
                      className={`border-2 border-[#BEA8A8] pt-2 ps-5 rounded-md col-span-2 
                      h-[69px] flex `}
                    >
                      <label className="w-full cursor-pointer">
                        <div className="block">
                          <span className="text-[var(--gray)] text-[15px] font-semibold block ">
                            Journey Date
                          </span>
                        </div>

                        <DatePicker
                          minDate={new Date()}
                          selected={departureDate}
                          className="custom-datepicker-input bg-transparent"
                          calendarClassName="custom-datepicker-calendar"
                          onChange={(date) => setDepartureDate(date)}
                        />
                      </label>
                      {tripType == "Return" && (
                        <label className="w-full cursor-pointer border-s-2 ps-2 ">
                          <div className="block">
                            <span className="text-[var(--gray)] text-[15px] font-semibold block ">
                              Return Date
                            </span>
                          </div>

                          {/* Conditionally render the DayPicker */}
                          <DatePicker
                            minDate={departureDate}
                            selected={returnDate}
                            className="custom-datepicker-input bg-transparent"
                            calendarClassName="custom-datepicker-calendar"
                            onChange={(date) => setReturnDate(date)}
                          />
                        </label>
                      )}
                    </div>

                    <div className="col-span-1">
                      {tripType == "OneWay" || tripType == "Return" ? (
                        <div>
                          <button
                            onClick={fetchFlightData}
                            className="bg-[var(--primary-btn)] text-white h-[69px] w-full rounded-xl"
                          >
                            {/* <Image
                            src={search}
                            alt="Search"
                            className="mx-auto w-[50px] p-3"
                          /> */}
                            Search flights
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {cities?.map((city, index) => (
                      <>
                        <div
                          key={city.id}
                          className="flex items-center col-span-2  md:col-span-4 w-full"
                        >
                          <div className="relative w-full">
                            <div className="border-2 border-[#BEA8A8] pt-2 ps-5 w-full rounded-l-md  h-[69px]">
                              <label
                                className="w-full cursor-pointer"
                                onClick={() =>
                                  toggleField(city.id, "isOpenOrigin")
                                }
                              >
                                <input
                                  value={city.searchQueryDestination}
                                  type="text"
                                  onChange={(e) =>
                                    updateCityData(
                                      city.id,
                                      "searchQueryDestination",
                                      e.target.value
                                    )
                                  }
                                  placeholder="From ?"
                                  className="w-full focus:outline-none bg-transparent "
                                />
                                <div className="block">
                                  <span className="text-[8px] md:text-[15px] font-semibold ">
                                    {city.originAirport?.label}{" "}
                                    {city.originAirport?.value}
                                  </span>
                                </div>
                              </label>
                            </div>
                            {city?.isOpenOrigin ? (
                              <div className="w-full mx-auto bg-white rounded-xl shadow-md   absolute top-20  max-h-[600px] z-10 overflow-y-auto">
                                <div className="p-8 ">
                                  <ul className="space-y-4">
                                    {filteredAirportsDestinationMulti[
                                      city.id - 1
                                    ]?.map((destination, index) => (
                                      <li
                                        key={destination?.id}
                                        className="flex items-center space-x-4 cursor-pointer"
                                        onClick={() => {
                                          toggleField(city.id, "isOpenOrigin"),
                                            // Update airport details for the current city
                                            updateCityData(
                                              city.id,
                                              "searchQueryDestination",
                                              destination.value
                                            );
                                          setIsOpenDestination(false);
                                          updateCityData(
                                            city.id,
                                            "originAirport",
                                            {
                                              label: destination.label,
                                              value: destination.value,
                                              code: destination.name,
                                            }
                                          );
                                        }}
                                      >
                                        <div className="flex-grow">
                                          <p className="font-semibold">
                                            {destination.name},{" "}
                                            {destination.value}
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {destination.label}
                                          </p>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="relative w-full ">
                            <div className="border-2  border-l-0 border-[#BEA8A8] pt-2 ps-5 rounded-r-md  h-[69px]">
                              <label
                                className="w-full cursor-pointer"
                                onClick={() =>
                                  toggleField(city.id, "isOpenDestination")
                                }
                              >
                                <input
                                  value={city.searchQueryArrival}
                                  type="text"
                                  onChange={(e) =>
                                    updateCityData(
                                      city.id,
                                      "searchQueryArrival",
                                      e.target.value
                                    )
                                  }
                                  placeholder="To ?"
                                  className="w-full focus:outline-none  bg-transparent"
                                />
                                <div className="block">
                                  <span className="text-[8px] md:text-[15px] font-semibold">
                                    {city.destinationAirport?.label}{" "}
                                    {city.destinationAirport?.value}
                                  </span>
                                </div>
                              </label>
                            </div>
                            {city?.isOpenDestination ? (
                              <div className=" mx-auto bg-white rounded-xl shadow-md  absolute top-20  max-h-[600px] z-10 overflow-y-auto">
                                <div className="p-8 ">
                                  <ul className="space-y-4">
                                    {filteredAirportsArrivalMulti[
                                      city.id - 1
                                    ].map((arrival, index) => (
                                      <li
                                        key={arrival?.id}
                                        className="flex items-center space-x-4 cursor-pointer"
                                        onClick={() => {
                                          toggleField(
                                            city.id,
                                            "isOpenDestination"
                                          ),
                                            updateCityData(
                                              city.id,
                                              "searchQueryArrival",
                                              arrival.value
                                            );
                                          setIsOpenArrival(false);
                                          updateCityData(
                                            city.id,
                                            "destinationAirport",
                                            {
                                              code: arrival.name,
                                              value: arrival.value,
                                              label: arrival.label,
                                            }
                                          );
                                        }}
                                      >
                                        <div className="flex-grow">
                                          <p className="font-semibold">
                                            {arrival.name}, {arrival.value}
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {arrival.label}
                                          </p>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div
                          className={`border-2 border-[#BEA8A8] pt-2 ps-5 rounded-md col-span-2 
                      h-[69px] flex `}
                        >
                          <label className="w-full cursor-pointer">
                            <div className="block">
                              <span className="text-[var(--gray)] text-[15px] font-semibold block ">
                                Journey Date
                              </span>
                            </div>

                            <DatePicker
                              minDate={new Date()}
                              selected={city.departureDate}
                              className="custom-datepicker-input bg-transparent"
                              calendarClassName="custom-datepicker-calendar"
                              onChange={(date) =>
                                updateCityData(city.id, "departureDate", date)
                              }
                            />
                          </label>
                        </div>

                        {index !== 0 && index !== 1 && (
                          <div class="flex items-center border border-gray-300 rounded-md w-full  h-[69px] overflow-hidden ">
                            <button
                              class="border-l border-gray-300 p-2 flex items-center justify-center text-gray-400 hover:text-gray-600  w-full  h-full "
                              onClick={handleDeleteCity}
                            >
                              <span className="bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-6 w-6 text-white font-bold"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </span>
                            </button>
                          </div>
                        )}
                      </>
                    ))}

                    <div class="flex items-center border border-gray-300 rounded-md w-full  h-[69px] overflow-hidden ">
                      <button
                        class="px-4 py-2 text-gray-600 text-[15px]  text-center"
                        onClick={handleAddCity}
                        disabled={cities.length > 3}
                      >
                        Add Another City
                      </button>
                    </div>
                  </>
                )}
                {tripType == "OpenJaw" && (
                  <div>
                    <button
                      onClick={fetchFlightData}
                      className="bg-[var(--primary-btn)] text-white py-5 px-3 w-full rounded-xl"
                    >
                      {/* <Image
                        src={search}
                        alt="Search"
                        className="mx-auto w-[50px] p-3"
                      /> */}
                      Search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlightSearch;
