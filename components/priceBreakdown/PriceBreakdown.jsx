import React from "react";

export default function PriceBreakdown({ fareBreakdown }) {
  if (!fareBreakdown) {
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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="py-2">Base Fare</td>
            <td className="py-2 text-right">
              {fareBreakdown.EquiFare?.Amount}{" "}
              {fareBreakdown.EquiFare?.CurrencyCode}
            </td>
          </tr>
          <tr>
            <td className="py-2">Taxes & Fees</td>
            <td className="py-2py-2 text-right">
              {fareBreakdown.Tax?.Amount} {fareBreakdown.Tax?.CurrencyCode}
            </td>
          </tr>
          <tr className="font-semibold">
            <td className="py-2">Total</td>
            <td className="py-2 text-right">
              {fareBreakdown.TotalFare?.Amount}{" "}
              {fareBreakdown.TotalFare?.CurrencyCode}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Baggage Information</h4>
        <ul className="list-disc list-inside">
          {fareBreakdown.BaggageInfo?.map((baggage, index) => (
            <li key={index}>{baggage}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
