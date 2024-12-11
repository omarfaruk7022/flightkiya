import { getFormattedDate } from "@/hooks/DateTimeFormatter";
import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaCreditCard,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

export default function Invoice({ ticketData, id }) {
  return (
    <div
      id={id}
      className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden  my-5"
    >
      <div className="bg-[#1e20a0] text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Flight Invoice</h1>
        <div className="text-right">
          <p className="font-semibold">PNR #: {ticketData?.data?.pnrId}</p>
          {/* <p>
              Date: {ticketData?.data?.}
            </p> */}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h2 className="text-xl font-semibold">Adbiyas tour</h2>
            <p className="text-gray-600">Your trusted flight partner</p>
          </div>
          <div
            className={`rounded-md px-3 py-2 text-[15px] font-semibold ${
              ticketData?.data?.ticketStatus === "BOOKED"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-orange-500"
            }`}
          >
            {ticketData?.data?.ticketStatus}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Passenger Details</h3>
            <div className="space-y-1">
              <p className="flex items-center">
                <FaUser className="mr-2 text-blue-600" />
                {ticketData?.data?.full_name}
              </p>
              <p>Passenger ID: PASS-98765</p>
              <p>Email: {ticketData?.data?.Email}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Booking Information</h3>
            <div className="space-y-1">
              <p>Booking Reference: {ticketData?.data?.orderNumber}</p>
              <p className="flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" /> Booking Date:
                2023-06-15
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Flight Details</h3>

          {ticketData?.data?.itineraries?.map((flight) => (
            <div className="grid md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
              <div>
                <p className="font-semibold">Departure</p>
                <p className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-600" />{" "}
                  {flight?.DepartureAirportLocationCode}
                </p>
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" />{" "}
                  {getFormattedDate(flight?.DepartureDateTime)}
                </p>
                {/* <p className="flex items-center">
                  <FaClock className="mr-2 text-blue-600" /> 10:00 AM
                </p> */}
              </div>
              <div>
                <p className="font-semibold">Arrival</p>
                <p className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-600" />{" "}
                  {flight?.ArrivalAirportLocationCode}
                </p>
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" />{" "}
                  {getFormattedDate(flight?.ArrivalDateTime)}
                </p>
                {/* <p className="flex items-center">
                  <FaClock className="mr-2 text-blue-600" /> 10:00 PM
                </p> */}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Price Breakdown</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Description</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Base Fare</td>
                <td className="p-2 text-right">
                  ${ticketData?.data?.baseFare}
                </td>
              </tr>
              <tr>
                <td className="p-2">Taxes & Fees</td>
                <td className="p-2 text-right">
                  {" "}
                  $
                  {ticketData?.data?.taxAndCharge == null
                    ? 0
                    : ticketData?.data?.taxAndCharge}
                </td>
              </tr>
              <tr className="font-semibold">
                <td className="p-2">Total</td>
                <td className="p-2 text-right">
                  ${ticketData?.data?.netTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="flex items-center">
              <FaCreditCard className="mr-2 text-blue-600" /> Payment Method:
              Visa ****1234
            </p>
            <p>Payment Date:{getFormattedDate(ticketData?.data?.paymentAt)}</p>
            <p className="font-semibold">Amount Paid: $920.00</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <p>
            Thank you for choosing Adbiyas tour. We wish you a pleasant journey!
          </p>
          <p>
            For any queries, please contact our customer support at
            support@flightkiya.com
          </p>
        </div>
      </div>
    </div>
  );
}
