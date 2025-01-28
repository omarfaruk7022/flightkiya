import { toast } from "react-toastify";

export const fetchData = async (
  endpoint,
  method = "GET",
  payload = null,
  token = null
) => {
  const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const url = `${NEXT_API_URL}${endpoint}`;

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // Determine if the payload is FormData or JSON
  const isFormData = payload instanceof FormData;

  const options = {
    method,
    headers: isFormData
      ? headers
      : { "Content-Type": "application/json", ...headers },
    ...(payload && {
      body: isFormData ? payload : JSON.stringify(payload),
    }),
  };

  const response = await fetch(url, options);

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
        "An error occurred during the fetch operation"
    );
  }

  return response.json();
};
