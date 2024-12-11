import { format } from "date-fns";

export const getFormattedDate = (isoDate) => {
  return format(new Date(isoDate), "MMMM dd, yyyy hh:mm:ss a");
};
