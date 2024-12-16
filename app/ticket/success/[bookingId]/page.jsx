"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { fetchData } from "@/utils/fetcher";
import { getFormattedDate } from "@/hooks/DateTimeFormatter";
import { useReactToPrint } from "react-to-print";
import Invoice from "@/components/flightInvoice/Invoice";

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

  // const componentRef = useRef(null);

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: "Invoice", // Optional: Sets the document title
  //   onAfterPrint: () => console.log("Print success!"), // Optional: Callback after printing
  // });
  // const handlePrint = () => {
  //   const printContent = document.getElementById("flight-invoice");
  //   const windowContent = document.body.innerHTML;
  //   if (printContent) {
  //     document.body.innerHTML = printContent.innerHTML;
  //     window.print();
  //     document.body.innerHTML = windowContent;
  //   }
  // };

  const handleDownload = async () => {
    const invoice = document.getElementById("flight-invoice");
    if (invoice) {
      const canvas = await html2canvas(invoice);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("flight-invoice.pdf");
    }
  };

  const mutation = useMutation({
    mutationFn: () =>
      fetchData(`payment/success-mail/${bookingId}`, "POST", null, token),
    onSuccess: (data) => {
      console.log("Mutation successful", data);
      toast.success(data?.message);
    },
    onError: (error) => {
      console.error("Mutation failed", error);
      toast.error(error?.message);
    },
  });

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
      mutation.mutate();
    } else {
      toast.error(ticketData?.error?.message);
    }
  }, [ticketData]);

  return (
    <>
      <Navbar />
      {ticketDataLoading ? (
        <div className="h-screen flex justify-center items-center w-full ">
          <div>
            <img
              src="https://zupimages.net/up/19/34/4820.gif"
              alt="Processing"
              className="plane-img"
            />
            <p>Please wait, your ticket is processing...</p>
          </div>
        </div>
      ) : (
        <div className="pt-20">
          <Invoice ticketData={ticketData} id="flight-invoice" />
        </div>
      )}

      {/* Always render the div with the ref */}

      {!ticketDataLoading && (
        <div className="max-w-3xl mx-auto">
          <div className="flex space-x-2 justify-end mb-4">
            {/* <button
              onClick={handlePrint}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
              aria-label="Print invoice"
            >
              <FaPrint className="mr-2" /> Print
            </button> */}
            <button
              onClick={handleDownload}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
              aria-label="Download invoice as PDF"
            >
              <FaDownload className="mr-2" /> Download
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightInvoice;
