'use client'
import { useParams } from "next/navigation";

export default function CancelledPage() {
  const { bookingId } = useParams();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-500 to-gray-700">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Booking Cancelled
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your booking has been cancelled.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-xl font-semibold text-yellow-700">
            Booking ID: <span className="text-yellow-900">{bookingId}</span>
          </p>
        </div>
        <p className="text-lg text-gray-600 mb-6">
          If this was a mistake, please contact our support team to help you.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition duration-300"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
