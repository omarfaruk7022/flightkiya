import flightStore from "@/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import { Calendar, Plane } from "lucide-react";
import { fetchData } from "@/utils/fetcher";
import { format } from "date-fns";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function BookingCard({
  from,
  to,
  date,
  status,
  id,
  flight,
  allBookingsRefetch,
  allCanceledBookingsRefetch,
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const { token } = flightStore();
  const [isCopied, setIsCopied] = useState(false);
  const [formData, setFormData] = useState({
    booking_id: flight?.id,
    request_type: "REFUND",
    reason: "",
    remarks: "",
  });
  const handleActionClick = (item) => {
    setModalData(item);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    console.log("clicked");
    try {
      const endpoint = `b2c/user/cancel-booking-req`;
      const payload = formData;

      await fetchData(endpoint, "POST", payload, token);

      toast.success("Request updated successfully!");
      setShowModal(false);

      // Reset the form data
      setFormData({
        booking_id: null,
        request_type: "REFUND",
        reason: "",
        remarks: "",
      });

      // Optionally refetch the bookings to update the list
      allBookingsRefetch();
      allCanceledBookingsRefetch();
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("An error occurred while updating the request.", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Update Request
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Request type
                </label>
                <select
                  name="request_type"
                  value={formData.request_type}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                >
                  <option value="REFUND">REFUND</option>
                  <option value="VOID">VOID</option>
                  <option value="REISSUE">REISSUE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Reason
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  rows="3"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Card>
        <div
          className="flex items-center gap-4 p-4 cursor-pointer"
          onClick={() => router.push(`tripDetails/${id}`)}
        >
          <Plane className="h-8 w-8 text-blue-500" />
          <div className="flex-1">
            <div className="text-lg font-semibold">
              {from} to {to}
            </div>
            <div className="flex items-center gap-2">
              <span>{flight?.orderNumber}</span>
              <CopyToClipboard
                text={flight?.orderNumber}
                onCopy={(e) => {
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
                }}
              >
                <button
                  onClick={(e) => e.stopPropagation()}
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    isCopied
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </CopyToClipboard>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>
                {date ? format(new Date(date), "dd MMM yyyy, hh:mm a") : "N/A"}
              </span>
              <div
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  status === "BOOKED"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-orange-500"
                }`}
              >
                {status}
              </div>
            </div>
          </div>
          {flight?.ticketStatus !== "CANCEL_PENDING" && (
            <button
              className={`rounded-lg px-4 py-1 text-sm font-semibold bg-green-100 text-green-800`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering row click
                handleActionClick(flight);
              }}
            >
              Refund / Reissue
            </button>
          )}
        </div>
      </Card>
    </>
  );
}
