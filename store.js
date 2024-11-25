// store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
const flightStore = create(
  persist(
    (set) => ({
      searchData: null,
      legDescription: null,
      token: null,
      flightId: null,
      sessionId: null,
      flightResults: null,
      selectedFlight: {},
      passengerInformation: [],
      bookingId: null,
      travelersInfo: [],
      setBookingId: (id) => set({ bookingId: id }),
      setTravelersInfo: (info) => set({ travelersInfo: info }),
      setPassengerInformation: (info) => set({ passengerInformation: info }),
      setSelectedFlight: (flight) => set({ selectedFlight: flight }),
      setSearchData: (data) => set({ searchData: data }),
      setLegDescription: (description) => set({ legDescription: description }),
      setToken: (token) => set({ token }),
      setFlightId: (id) => set({ flightId: id }),
      setSessionId: (id) => set({ sessionId: id }),
      setFlightResults: (flight) => set({ flightResults: flight }),
    }),
    {
      name: "flight-store",
      partialize: (state) => ({
        searchData: state.searchData,
        legDescription: state.legDescription,
        token: state.token,
        flightId: state.flightId,
        sessionId: state.sessionId,
        flightResults: state.flightResults,
        // OriginDestinationInformation: state.OriginDestinationInformation,
        // LegDescription: state.LegDescription,
        bookingId: state.bookingId,
        selectedFlight: state.selectedFlight,
        // savedFlights: state.savedFlights,
        // token: state.token,
        travelersInfo: state.travelersInfo,
        // contactInformation: state.contactInformation,
        passengerInformation: state.passengerInformation,
      }),
    } // Name of the store in localStorage
  )
);

export default flightStore;
