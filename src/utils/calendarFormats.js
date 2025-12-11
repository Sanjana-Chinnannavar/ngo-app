import { parse, parseISO } from "date-fns";

export const parseEventDate = (dateStr, timeStr) => {
  return parseISO(`${dateStr}T${timeStr}`);
};
