import Link from "next/link";

export default function FailedPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-orange-400">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Booking Failed
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          There was an issue with processing your booking.
        </p>
        {/* <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-xl font-semibold text-red-700">
            Booking ID: <span className="text-red-900"></span>
          </p>
        </div> */}
        <p className="text-lg text-gray-600 mb-6">
          Please try again later or contact customer support for assistance.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
