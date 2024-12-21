import { format } from "date-fns";

export const getFormattedDate = (isoDate) => {
  const date = new Date(isoDate);

  if (isNaN(date)) {
    return "Invalid date"; // You can return a fallback string or handle the error as needed
  }

  return format(date, "MMMM dd, yyyy hh:mm:ss a");
};
