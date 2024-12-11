"use client";

import React from "react";
import TripHeader from "../tripHeader/TripHeader";
import FlightDetails from "../flightDetails/FlightDetails";
import PassengerData from "../passengerData/PassengerData";
import PriceBreakdown from "../priceBreakdown/PriceBreakdown";
import { fetchData } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

const tripData = {
  success: true,
  message: "Trip details",
  data: {
    BookingCreatedOn: "2024-11-27T17:05:49",
    MFRef: "MF28905224",
    TripType: "OneWay",
    BookingStatus: "Booked",
    Origin: "BOM",
    Destination: "JFK",
    FareType: "Public",
    ClientUTCOffset: 0,
    TransactionDetails: {},
    BookingNotes: [],
    TicketingTimeLimit: "2024-11-27T20:05:49.61",
    BookingMode: 0,
    ReroutingAllowed: "NO",
    SpoilageFee: 0,
    DepAirportUTC: 0,
    IsRetainSegment: false,
    FlightId: 0,
    IsVetted: false,
    itineraries: [
      {
        ItemRPH: 1,
        DepartureDateTime: "2024-11-30T17:00:00",
        ArrivalDateTime: "2024-11-30T19:10:00",
        StopQuantity: 0,
        FlightNumber: "9207",
        ResBookDesigCode: "O",
        JourneyDuration: "130",
        AirlinePNR: "SHZSKX",
        NumberInParty: 1,
        DepartureAirportLocationCode: "BOM",
        DepartureTerminal: "",
        ArrivalAirportLocationCode: "DEL",
        ArrivalTerminal: "",
        OperatingAirlineCode: "6E",
        AirEquipmentType: "321",
        MarketingAirlineCode: "AA",
        Baggage: "1PC",
        FlightStatus: "HK",
        IsReturn: false,
        CabinClass: "Y",
        FareFamily: "MAINFL",
      },
      {
        ItemRPH: 2,
        DepartureDateTime: "2024-11-30T23:55:00",
        ArrivalDateTime: "2024-12-01T06:20:00",
        StopQuantity: 0,
        FlightNumber: "293",
        ResBookDesigCode: "O",
        JourneyDuration: "1015",
        AirlinePNR: "SHZSKX",
        NumberInParty: 1,
        DepartureAirportLocationCode: "DEL",
        DepartureTerminal: "",
        ArrivalAirportLocationCode: "JFK",
        ArrivalTerminal: "",
        OperatingAirlineCode: "AA",
        AirEquipmentType: "789",
        MarketingAirlineCode: "AA",
        Baggage: "1PC",
        FlightStatus: "HK",
        IsReturn: false,
        CabinClass: "Y",
        FareFamily: "MAINFL",
      },
    ],
    passengerInfos: [
      {
        Gender: "M",
        DateOfBirth: "2001-11-26T00:00:00",
        EmailAddress: "omarfaruk22@gmail.com",
        PhoneNumber: "89464894864",
        PassportExpiresOn: "2025-04-05T00:00:00",
        PassportNationality: "Bangladesh",
        PassengerNationality: "Bangladesh",
        PostCode: "1200",
        PassportIssuanceCountry: "Bangladesh",
        PassengerType: "ADT",
        PaxName: {
          PassengerTitle: "MR",
          PassengerFirstName: "MD OMAR",
          PassengerLastName: "FARUK",
        },
        PassportNumber: "9849848945",
        NationalID: "BD",
        NameNumber: 442080,
      },
    ],
    fareBreakdowns: [
      {
        passengerType: "ADT",
        passengerQuantity: 1,
        EquiFare: { Amount: "134.48", CurrencyCode: "USD", DecimalPlaces: 2 },
        Tax: { Amount: "329.29", CurrencyCode: "USD", DecimalPlaces: 2 },
        TotalFare: { Amount: "463.77", CurrencyCode: "USD", DecimalPlaces: 2 },
        AirportTaxBreakUp:
          "YQI 0.08,YRF 1.01,SG1 0.24,OO 0.10,OP 0.07,YR 253.22,IN 2.63,K3 18.86,P2 14.24,US 22.31,XA 3.73,XY 7.04,YC 7.24",
        BaggageInfo: ["1PC", "1PC"],
        CabinBaggageInfo: ["SB", "SB"],
        IsPenaltyDetailsAvailable: true,
        AirRefundCharges: {
          IsRefundableBeforeDeparture: "Yes",
          IsRefundableAfterDeparture: "Yes",
          RefundCharges: [
            {
              ChargesBeforeDeparture: [
                { HoursBeforeDeparture: 24, Charges: 0 },
              ],
              ChargesAfterDeparture: 0,
              PassengerType: "ADT",
              AdminCharges: 0,
              GST: 0,
              OtherTaxesK3: 0,
              Currency: "USD",
              YR_Tax: 0,
              YQ_Tax: 0,
            },
          ],
        },
        AirExchangeCharges: {
          IsExchangeableBeforeDeparture: "Yes",
          IsExchangeableAfterDeparture: "Yes",
          ExchangeCharges: [
            {
              ChargeBeforeDeparture: 0,
              ChargesAfterDeparture: 0,
              PassengerType: "ADT",
              AdminCharges: 0,
              Currency: "USD",
            },
          ],
        },
        AirVoidCharges: {
          IsVoidable: "Yes",
          PassengerType: "ADT",
          AdminCharges: 0,
          Currency: "USD",
          VoidingFee: 0,
          GST: 0,
        },
      },
    ],
  },
};

export default function TripDetailsPage({ id }) {
  const {
    data: flightData,
    error: flightDataError,
    isLoading: flightDataLoading = true,
    refetch: flightDataRefetch,
  } = useQuery({
    queryKey: ["details"],
    queryFn: () => fetchData(`b2c/trip-details/${id}`, "GET"),
    enabled: true,
  });

  if (flightDataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }
  const { data } = flightData;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <TripHeader
          bookingRef={data.MFRef}
          bookingStatus={data.BookingStatus}
          tripType={data.TripType}
          origin={data.Origin}
          destination={data.Destination}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Flight Details</h2>
            {data.itineraries.map((itinerary, index) => (
              <FlightDetails key={index} flight={itinerary} />
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Passenger Information
            </h2>
            {data.passengerInfos.map((passenger, index) => (
              <PassengerData key={index} passenger={passenger} />
            ))}

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Price Breakdown
            </h2>
            <PriceBreakdown fareBreakdown={data.fareBreakdowns[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}
