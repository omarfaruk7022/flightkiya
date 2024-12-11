export const fetchData = async (
  endpoint,
  method = "GET",
  payload = null,
  token = null
) => {
  const NEXT_API_URL =
    process.env.NEXT_API_URL || "https://flightkiya.cosmelic.com/api/";
  const url = `${NEXT_API_URL}${endpoint}`;

  console.log(token);
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "An error occurred during the fetch operation"
    );
  }

  return response.json();
};
