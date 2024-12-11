import React from "react";
import { FaUser, FaPassport, FaEnvelope, FaPhone } from "react-icons/fa";
import { format, parseISO } from "date-fns";

export default function PassengerData({ passenger }) {
  if (!passenger) {
    return (
      <div
        className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
        role="alert"
      >
        <p>Flight information is not available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center mb-2">
        <FaUser className="mr-2 text-blue-600" />
        <h3 className="text-lg font-semibold">
          {passenger.PaxName?.PassengerTitle}{" "}
          {passenger.PaxName?.PassengerFirstName}{" "}
          {passenger.PaxName?.PassengerLastName}
        </h3>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        Date of Birth:{" "}
        {passenger?.DateOfBirth
          ? format(parseISO(passenger?.DateOfBirth), "MMMM d, yyyy")
          : null}
      </p>
      <div className="flex items-center mb-2">
        <FaPassport className="mr-2 text-blue-600" />
        <span className="text-sm">
          {passenger.PassportNumber} (Expires:{" "}
          {passenger.PassportExpiresOn
            ? format(parseISO(passenger.PassportExpiresOn), "MMMM d, yyyy")
            : null}
          )
        </span>
      </div>
      <div className="flex items-center mb-2">
        <FaEnvelope className="mr-2 text-blue-600" />
        <span className="text-sm">{passenger.EmailAddress}</span>
      </div>
      <div className="flex items-center">
        <FaPhone className="mr-2 text-blue-600" />
        <span className="text-sm">{passenger.PhoneNumber}</span>
      </div>
    </div>
  );
}
