import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

// extend dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export const getDate = (date: Date, format: string): string => {
  const d = dayjs.utc(date, "z").tz("Africa/Lagos").format(format);
  return d;
};
