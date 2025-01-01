// pages/paybill.js
"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import stripe from "@/public/images/stripe.png";
import Flightkiya from "@/public/icons/logoFlight.jpg";
import flightStore from "@/store";
import { fetchData } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import giphy from "@/public/images/giphy.webp";
import Cookies from "js-cookie";

function PayBill() {
  const [timeLeft, setTimeLeft] = useState(18 * 60); // 18 minutes in seconds
  const router = useRouter();
  const [token, setToken] = useState();
  const { selectedFlight, bookingId } = flightStore();
  useEffect(() => {
    const authToken = Cookies.get("auth-token");
    setToken(authToken);
  }, [router]);
  // Countdown timer logic
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Cleanup on unmount
    } else {
      setShowModal(true); // Show the modal when time reaches 0
    }
  }, [timeLeft]);

  const handleRedirect = () => {
    setShowModal(false); // Close the modal
    router.push("/"); // Redirect to home page
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const {
    data: paymentData,
    error: paymentDataError,
    isLoading: paymentDataLoading,
    refetch: paymentDataRefetch,
  } = useQuery({
    queryKey: ["create-payment-intent", bookingId],
    queryFn: () =>
      fetchData(
        `payment/create-payment-intent/${bookingId}`,
        "POST",
        null,
        token
      ),
    enabled: false,
  });
  const handlePayment = () => {
    paymentDataRefetch();
  };

  useEffect(() => {
    if (paymentData?.success == true) {
      router.push(paymentData?.url);
    }
  }, [paymentData]);

  return (
    <>
      {paymentDataLoading ? (
        <div className="h-screen">
          <img
            src="https://zupimages.net/up/19/34/4820.gif"
            class="plane-img"
          />
        </div>
      ) : (
        <>
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
                    Your payment session has expired. Please try searching
                    again.
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
          <div className="min-h-screen  p-4 flex flex-col-reverse md:flex-row gap-5 md:gap-2">
            {/* Sidebar */}
            <aside className="w-full  md:w-1/4 bg-white h-fit p-4 rounded-md shadow-md space-y-4">
              <div className="space-y-2 h-full">
                {["Stripe"].map((method, index) => (
                  <button
                    key={index}
                    className={`w-full bg-slate-200 p-3 rounded-lg py-2 text-left ${
                      method === "Stripe"
                        ? "text-red-500 font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </aside>

            {/* Payment Details */}
            <main className="flex-1  w-full max-h-[650px] bg-white p-8 rounded-md shadow-md space-y-8">
              <h2 className="text-[18px] md:text-xl mb-0  md:mb-28 text-center font-semibold text-gray-800">
                You will be directed to the Stripe platform where you can
                complete your purchase.
              </h2>
              <div className="flex items-center justify-center flex-col md:flex-row flex-wrap space-x-2">
                <Image
                  src={Flightkiya}
                  alt="FlightKiya Logo"
                  width={200}
                  height={70}
                />
                <span className="text-xl hidden md:block">→</span>
                <span className="text-xl block md:hidden">+</span>
                <Image src={stripe} alt="Stripe logo" width={180} height={70} />
              </div>
              <p className=" text-gray-600 text-center ml-10 mr-10">
                By continuing to pay, I understand and agree with the{" "}
                <a href="#" className="text-blue-500 underline">
                  privacy policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 underline">
                  terms of service
                </a>{" "}
                of Flightkiya
              </p>
              <button
                onClick={handlePayment}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-md"
              >
                Proceed to Payment
              </button>
              <p className="text-gray-700 text-center">
                You Pay:{" "}
                <span className="font-bold text-lg">
                  {" "}
                  {(
                    Number(selectedFlight?.TotalFare?.Amount) +
                    Number(selectedFlight?.TotalTax?.Amount)
                  ).toFixed(2)}{" "}
                  {selectedFlight?.TotalFare?.CurrencyCode}
                </span>
              </p>
            </main>

            {/* Fare Summary & Timer */}
            <section className="w-full md:w-1/4 max-h-[650px] bg-white p-4 rounded-md shadow-md">
              <div className="bg-blue-100 p-4 rounded-md mb-4">
                <p className="text-gray-800 text-center">
                  Booking confirmed. Complete payment before timeout.
                </p>
                <div className="text-2xl text-center font-semibold text-blue-600">
                  {String(minutes).padStart(2, "0")} :{" "}
                  {String(seconds).padStart(2, "0")}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Fare Summary
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Base Fare</span>
                    <span>
                      {" "}
                      {selectedFlight?.TotalFare?.Amount}{" "}
                      {selectedFlight?.TotalFare?.CurrencyCode}{" "}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tax</span>
                    <span>
                      {" "}
                      {selectedFlight?.TotalTax?.Amount}{" "}
                      {selectedFlight?.TotalFare?.CurrencyCode}{" "}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sub-Total</span>
                    <span>
                      {(
                        Number(selectedFlight?.TotalFare?.Amount) +
                        Number(selectedFlight?.TotalTax?.Amount)
                      ).toFixed(2)}{" "}
                      {selectedFlight?.TotalFare?.CurrencyCode}
                    </span>
                  </li>
                  {/* <li className="flex justify-between text-green-500">
              <span>Hot Deals</span>
              <span>- BDT 351</span>
            </li>
            <li className="flex justify-between">
              <span>Convenience Charge</span>
              <span>BDT 119</span>
            </li> */}
                </ul>
                <div className="flex justify-between font-bold text-lg text-gray-800 mt-4">
                  <span>Total</span>
                  <span>
                    {" "}
                    {(
                      Number(selectedFlight?.TotalFare?.Amount) +
                      Number(selectedFlight?.TotalTax?.Amount)
                    ).toFixed(2)}{" "}
                    {selectedFlight?.TotalFare?.CurrencyCode}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default PayBill;
