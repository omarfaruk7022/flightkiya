export const fetchAirports = async (searchTerm) => {
  const NEXT_API_URL =
    process.env.NEXT_PUBLIC_API_URL ;
  const response = await fetch(
    `${NEXT_API_URL}common/airports?size=25&search=${searchTerm}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch airport suggestions");
  }
  const data = await response.json();
  if (data.success) {
    return data.data; 
  } else {
    throw new Error("No airport data found");
  }
};
