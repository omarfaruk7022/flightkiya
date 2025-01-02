import { toast } from "react-toastify";

export const getFareRules = async (flight_id) => {
  const NEXT_API_URL =
    process.env.NEXT_API_URL || "https://flightkiya.cosmelic.com/api/";
  const response = await fetch(`${NEXT_API_URL}b2c/fare-rules/${flight_id}`);
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.error?.message;

    const errorM = errorData?.error;

    const errorG = errorData?.message;
    // Show the error in a toast

    if (errorMessage) {
      toast.error(errorMessage);
    } else if (errorM) {
      toast.error(errorM);
    } else {
      toast.error(errorG);
    }

    throw new Error(
      errorMessage ||
        errorM ||
        errorG ||
        "An error occurred during the revalidation"
    );
  }
  const flightData = await response.json();
  if (!flightData) {
    throw new Error("Flight data unavailable");
  }
  return flightData;
};
