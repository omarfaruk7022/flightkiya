"use client";
import React, { useEffect, useState } from "react";
import {
  FaPlane,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCreditCard,
  FaPrint,
  FaDownload,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "@/components/common/navbar/Navbar";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { fetchData } from "@/utils/fetcher";

const FlightInvoice = () => {
  const [formattedDate, setFormattedDate] = useState("");
  const { bookingId } = useParams();
  const [token, setToken] = useState();
  const router = useRouter();
  useEffect(() => {
    setFormattedDate(new Date().toLocaleDateString());
  }, []);

  useEffect(() => {
    const authToken = Cookies.get("auth-token");
    setToken(authToken);
  }, []);

  const handlePrint = () => {
    // const printContent = document.getElementById("flight-invoice");
    // const windowContent = document.body.innerHTML;
    // if (printContent) {
    //   document.body.innerHTML = printContent.innerHTML;
    //   window.print();
    //   document.body.innerHTML = windowContent;
    // }
    toast.warn("Upcoming");
  };
  const handleDownload = async () => {
    // const invoice = document.getElementById("flight-invoice");
    // if (invoice) {
    //   const canvas = await html2canvas(invoice);
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF();
    //   const imgProps = pdf.getImageProperties(imgData);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    //   pdf.save("flight-invoice.pdf");
    // }
    toast.warn("Upcoming");
  };

  const {
    data: ticketData,
    error: ticketDataError,
    isLoading: ticketDataLoading,
    refetch: ticketDataRefetch,
  } = useQuery({
    queryKey: ["payment-success", bookingId],
    queryFn: () =>
      fetchData(`payment/success/${bookingId}`, "POST", null, token),
    enabled: true,
  });

  useEffect(() => {
    if (ticketData?.success == true) {
      toast.success(ticketData?.message);
    } else {
      toast.error(ticketData?.error?.message);
    }
  }, [ticketData]);

  return (
    <>
      <Navbar />
      {ticketDataLoading ? (
        <div className="h-screen">
          <img
            src="https://zupimages.net/up/19/34/4820.gif"
            class="plane-img"
          />
          <p>Please your ticket is processing...</p>
        </div>
      ) : (
        <div
          id="flight-invoice"
          className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden print-content my-5"
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
                <h2 className="text-xl font-semibold">SkyHigh Airlines</h2>
                <p className="text-gray-600">Your trusted flight partner</p>
              </div>
              <FaPlane className="text-4xl text-blue-600" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Passenger Details
                </h3>
                <div className="space-y-1">
                  <p className="flex items-center">
                    <FaUser className="mr-2 text-blue-600" />
                    {ticketData?.data?.full_name}
                  </p>
                  <p>Passenger ID: PASS-98765</p>
                  <p>Email: john.doe@example.com</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Booking Information
                </h3>
                <div className="space-y-1">
                  <p>Booking Reference: {ticketData?.data?.orderNumber}</p>
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-600" /> Booking
                    Date: 2023-06-15
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Flight Details</h3>
              <div className="grid md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
                <div>
                  <p className="font-semibold">Departure</p>
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-blue-600" /> New York
                    (JFK)
                  </p>
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-600" /> 2023-07-01
                  </p>
                  <p className="flex items-center">
                    <FaClock className="mr-2 text-blue-600" /> 10:00 AM
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Arrival</p>
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-blue-600" /> London
                    (LHR)
                  </p>
                  <p className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-600" /> 2023-07-01
                  </p>
                  <p className="flex items-center">
                    <FaClock className="mr-2 text-blue-600" /> 10:00 PM
                  </p>
                </div>
              </div>
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
                    <td className="p-2 text-right">$120.00</td>
                  </tr>
                  <tr className="font-semibold">
                    <td className="p-2">Total</td>
                    <td className="p-2 text-right">$920.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Payment Information
              </h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="flex items-center">
                  <FaCreditCard className="mr-2 text-blue-600" /> Payment
                  Method: Visa ****1234
                </p>
                <p>Payment Date:{ticketData?.data?.paymentAt}</p>
                <p className="font-semibold">Amount Paid: $920.00</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 p-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p>
                Thank you for choosing SkyHigh Airlines. We wish you a pleasant
                journey!
              </p>
              <p>
                For any queries, please contact our customer support at
                support@flightkiya.com
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrint}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
                aria-label="Print invoice"
              >
                <FaPrint className="mr-2" /> Print
              </button>
              <button
                onClick={handleDownload}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
                aria-label="Download invoice as PDF"
              >
                <FaDownload className="mr-2" /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightInvoice;
