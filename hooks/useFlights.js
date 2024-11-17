// useFlights.js
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const useFlights = (params, shouldFetch) => {
  const { data, error, isValidating, mutate } = useSWR(
    shouldFetch ? ["/b2c/search", params] : null,
    ([url, data]) => fetcher(url, data),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    flightResults: data?.results || [],
    status: data?.status,
    sessionId: data?.sessionId || null,
    fetchLoading: isValidating,
    fetchError: error,
    mutate,
  };
};

export default useFlights;
