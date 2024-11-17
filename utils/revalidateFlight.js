export const revalidateFlight = async (flight_id) => {
  const NEXT_API_URL =
    process.env.NEXT_API_URL || "https://fk-api.adbiyas.com/api/";
  const response = await fetch(`${NEXT_API_URL}b2c/revalidated/${flight_id}`);
  if (!response.ok) {
    throw new Error("Failed to revalidate the flight");
  }
  const flightData = await response.json();
  if (!flightData) {
    throw new Error("Flight data unavailable");
  }
  return flightData;
};
