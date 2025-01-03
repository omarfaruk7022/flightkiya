import flightStore from "@/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import { Calendar, Plane } from "lucide-react";
import { fetchData } from "@/utils/fetcher";
import { format } from "date-fns";
export default function CanceledCard({ allCanceledBookingsRefetch, flight }) {

  return (
    <>
      <Card>
        <div className="flex flex-col gap-4 p-4">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold text-gray-800">
                Order Number: {flight?.orderNumber}
              </div>
            </div>

            <div
              className={`rounded-lg px-4 py-1 text-sm font-semibold bg-orange-100 text-orange-800`}
            >
              {flight?.request_type.toUpperCase()}
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-2">
            <div className="text-sm text-gray-500">
              <strong> Created At:</strong>{" "}
              {flight?.created_at
                ? format(new Date(flight.created_at), "dd MMM yyyy, hh:mm a")
                : "N/A"}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Request Status:</strong>

              <span
                className={`px-2 py-1 rounded text-sm font-semibold ${
                  flight?.status === "pending"
                    ? "bg-orange-100 text-orange-800"
                    : flight?.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : flight?.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {flight?.status?.toUpperCase()}
              </span>
            </div>
            <div className="text-sm text-gray-700">
              <strong>Reason:</strong> {flight?.reason}
            </div>
            {flight?.remarks && (
              <div className="text-sm text-gray-700">
                <strong>Remarks:</strong> {flight?.remarks}
              </div>
            )}
          </div>

          {/* Admin Comments */}
          {flight?.admin_comments ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-700">
                <strong>Admin Comments:</strong> {flight?.admin_comments}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-500">
              No comments from admin.
            </div>
          )}

          {/* Additional Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-700">
              <strong>Booking Status:</strong> {flight?.bookingStatus}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Payment Status:</strong> {flight?.paymentStatus}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Ticket Status:</strong> {flight?.ticketStatus}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
