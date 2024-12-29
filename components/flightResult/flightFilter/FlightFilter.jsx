"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import filter from "@/public/icons/filter.svg";
import down from "@/public/icons/down-arrow.svg";
import { TbClockFilled } from "react-icons/tb";
import { Checkbox } from "@/components/ui/checkbox";
import { Sun, Moon, X } from "lucide-react";
import { useRouter } from "next/navigation";
export default function FlightFilter({
  filter,
  setSelectedStops,
  departureTime,
  setDepartureTime,
  selectedStops,
  setIsPartiallyRefundable,
  isPartiallyRefundable,
  setAirlinesFilter,
}) {
  const [flightType, setFlightType] = useState();
  const router = useRouter();
  // const [selectedStops, setSelectedStops] = useState([]);
  const [isOpenFIlter, setIsOpenFilter] = useState(false);
  const departTimes = [
    { label: "00-06", icon: Moon, id: "time-00-06" },
    { label: "06-12", icon: Sun, id: "time-06-12" },
    { label: "12-18", icon: Sun, id: "time-12-18" },
    { label: "18-00", icon: Moon, id: "time-18-00" },
  ];

  const layoverTimes = ["0h - 5h", "5h - 10h", "10h - 15h", "15h+"];

  const [time, setTime] = useState(1800); // 30 minutes in seconds
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Cleanup on unmount
    } else {
      setShowModal(true); // Show the modal when time reaches 0
    }
  }, [time]);

  const handleRedirect = () => {
    setShowModal(false); // Close the modal
    router.push("/"); // Redirect to home page
  };

  // Format time as MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleAirlineChange = (airlineId) => {
    setAirlinesFilter((prev) => {
      if (prev.includes(airlineId)) {
        return prev.filter((id) => id !== airlineId);
      } else {
        return [...prev, airlineId];
      }
    });
  };

  const handleDepartureTimeChange = (timeId) => {
    setDepartureTime((prev) => {
      if (prev.includes(timeId)) {
        return prev.filter((id) => id !== timeId);
      } else {
        return [...prev, timeId];
      }
    });
  };

  const handleCheckboxChange = () => {
    setIsPartiallyRefundable((prevState) => !prevState);
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-orange-500/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.1)] w-full max-w-md mx-4">
            <div className="flex flex-col items-center">
              {/* Icon Container */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold mt-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Time is Up!
              </h2>

              {/* Message */}
              <p className="text-gray-600 dark:text-gray-300 mt-4 text-center">
                Your search session has expired. Please try searching again.
              </p>

              {/* Button */}
              <button
                onClick={handleRedirect}
                className="mt-8 flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 hover:opacity-90 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Return Home
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="py-5 mt-36">
        <div className=" bg-white">
          <div
            className="grid grid-cols-1  md:grid-cols-2 rounded-lg "
            onClick={() => setIsOpenFilter(!isOpenFIlter)}
          >
            <div className="p-3 flex items-center flex-wrap gap-10">
              <div className="flex items-center gap-2">
                <Image src={filter}></Image>
                <span className="text-[var(--text-primary)] text-[12px] font-semibold">
                  Filters
                </span>
              </div>
              <div className=" flex items-center  gap-2">
                <span className="text-[var(--text-primary)] text-[12px] font-semibold">
                  Stops
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold">
                  Partially Refundable
                </span>
              </div>
            </div>

            <div className="p-4 flex items-center justify-evenly gap-10 flex-wrap">
              <div className="flex items-center gap-2 ">
                <span className="text-[12px]">Layover Time</span>
                <Image src={down}></Image>
              </div>
              <div className="flex items-center gap-2 ">
                <span className="text-[12px]">Depart Time</span>
                <Image src={down}></Image>
              </div>{" "}
              <div className="flex items-center gap-2 ">
                <span className="text-[12px]">Airlines</span>
                <Image src={down}></Image>
              </div>
              <div className="flex items-center gap-2 ">
                <span className="text-[12px]">More Filters</span>
                <Image src={down}></Image>
              </div>
            </div>
          </div>
          {isOpenFIlter && (
            <div className="max-w-screen-xl mx-auto p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                    onClick={() => setIsOpenFilter(!isOpenFIlter)}
                  >
                    Close
                  </button>
                  <button
                    className="px-4 py-2 text-blue-600 hover:text-blue-700"
                    onClick={() => {
                      setSelectedStops([]);
                      setIsPartiallyRefundable(false);
                      setAirlinesFilter([]);
                    }}
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stops Section */}
                <div className="space-y-4">
                  <h2 className="font-semibold bg-gray-100 p-2">Stops</h2>
                  <div className="flex gap-2">
                    {filter?.stops.map((stop) => (
                      <button
                        key={stop}
                        onClick={() => {
                          if (selectedStops.includes(stop)) {
                            setSelectedStops(
                              selectedStops.filter((s) => s !== stop)
                            );
                          } else {
                            setSelectedStops([...selectedStops, stop]);
                          }
                        }}
                        className={`px-4 py-2 rounded-md border ${
                          selectedStops.includes(stop)
                            ? "bg-blue-50 border-blue-600 text-blue-600"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {stop}
                      </button>
                    ))}
                  </div>

                  {/* Fare Type */}
                  {/* <div className="space-y-2">
                    <h2 className="font-semibold">Fare Type:</h2>
                    <div className="flex items-center gap-2">
                      <Checkbox id="partially-refundable" />
                      <label htmlFor="partially-refundable">
                        Partially Refundable
                      </label>
                    </div>
                  </div> */}

                  {/* Price Range */}
                  {/* <div className="space-y-4">
              <h2 className="font-semibold">Price Range</h2>
              <Slider
                defaultValue={[6950]}
                max={11950}
                min={6950}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>BDT {priceRange[0]}</span>
                <span>BDT 11,950</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Min</span>
                <span>Max</span>
              </div>
            </div> */}
                </div>

                {/* Schedule Section */}
                <div className="space-y-4">
                  <h2 className="font-semibold  bg-gray-100  p-2">Fare Type</h2>

                  <div className="space-y-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="partially-refundable"
                          // checked={isPartiallyRefundable}
                          onClick={handleCheckboxChange}
                        />
                        <label
                          htmlFor="partially-refundable"
                          className="cursor-pointer"
                        >
                          Partially Refundable
                        </label>
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-2">
                      {departTimes.map(({ label, icon: Icon, id }) => (
                        <button
                          key={id}
                          onClick={() => handleDepartureTimeChange(id)}
                          className={`flex items-center gap-2 px-4 py-2 border rounded-md ${
                            departureTime?.includes(id)
                              ? "bg-blue-50 border-blue-600 text-blue-600"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div> */}
                  </div>

                  {/* <div className="space-y-2">
                    <h3 className="text-sm text-gray-600">Layover Time</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {layoverTimes.map((time) => (
                        <button
                          key={time}
                          className="px-4 py-2 border rounded-md hover:bg-gray-50"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div> */}
                </div>

                {/* Airlines Section */}
                <div className="space-y-4">
                  <h2 className="font-semibold bg-gray-100 p-2">Airlines</h2>
                  <div className="space-y-2 max-h-[300px] overflow-y-scroll hide-scrollbar">
                    {filter?.airlines.map((airline) => (
                      <div key={airline} className="flex items-center gap-2">
                        <Checkbox
                          id={airline?.value.toLowerCase().replace(/\s+/g, "-")}
                          onCheckedChange={() =>
                            handleAirlineChange(
                              airline?.value.toLowerCase().replace(/\s+/g, "-")
                            )
                          }
                        />
                        <label
                          htmlFor={airline?.value
                            .toLowerCase()
                            .replace(/\s+/g, "-")}
                        >
                          {airline?.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-10 ">
          <div className="col-span-1 md:col-span-8 grid  grid-cols-1 md:grid-cols-3  my-3">
            <div
              className="bg-[var(--primary-btn)] p-5 rounded-s-[15px] cursor-pointer"
              onClick={() => setFlightType("cheapest")}
            >
              <h2 className="text-[24px] text-white font-bold">Cheapest</h2>
              <span className="text-[11px] text-white">
                Showing the cheapest flights in ascending order
              </span>
            </div>
            <div
              className="bg-white p-5  cursor-pointer"
              onClick={() => setFlightType("earliest")}
            >
              <h2 className="text-[24px] text-black font-bold">Earliest</h2>
              <span className="text-[11px] text-black">
                Click to see the Earliest flights in ascending order
              </span>
            </div>{" "}
            <div
              className="bg-[#63F67B57] p-5 rounded-e-[15px] cursor-pointer"
              onClick={() => setFlightType("fastest")}
            >
              <h2 className="text-[24px] text-black font-bold">Fastest</h2>
              <span className="text-[11px] text-black">
                Click to see the fastest flights in ascending order
              </span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 w-full">
            <div className=" p-5 mt-3 bg-white m-2 rounded-[15px]">
              <div className="bg-[#C4D6D9] flex-col w-full rounded-[7px] flex items-center">
                {/* Replace with Image component if you have a clock icon */}
                <div className="flex gap-2 text-sky-700 items-center">
                  {" "}
                  <TbClockFilled className="w-[35px] h-[35px] text-sky-800" />
                  <h2 className="text-[28px] font-semibold text-sky-800">
                    {formatTime(time)}
                  </h2>
                </div>

                <div className=" ml-10 text-[14px] text-slate-600 flex justify-end gap-3 items-center">
                  <p>Min</p>
                  <p>Sec</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
