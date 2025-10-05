import { DateTime } from "luxon";
/**
 * Formats a date into a specified string format. Handles invalid or null inputs gracefully.
 * @param date The date to format (string, Date, null, or undefined).
 * @param format The Luxon format string.
 * @returns The formatted date string or an empty string if the input is invalid.
 */
export const formatDate = (date: string | Date | null | undefined, format = "dd/LL/yyyy"): string => {
  if (!date) return "";

  let dt: DateTime;

  if (typeof date === 'string') {
    // First, try parsing as ISO, which is a common standard for APIs.
    dt = DateTime.fromISO(date);
    // If that fails, try parsing as a SQL datetime format as a fallback.
    if (!dt.isValid) {
      dt = DateTime.fromSQL(date);
    }
  } else {
    dt = DateTime.fromJSDate(date);
  }

  return dt.isValid ? dt.toFormat(format) : "";
};

/**
 * Formats the time part of a date.
 * @param date The date to format.
 * @returns The formatted time string (HH:mm:ss) or an empty string.
 */
export const formatTime = (date: string | Date | null | undefined): string => {
  return formatDate(date, "HH:mm:ss");
};

/**
 * Formats a date as DD-MM-YYYY.
 * @param date The date to format.
 * @returns The formatted date string or an empty string.
 */
export const formatDateAsDMY = (date: Date | string | null | undefined): string => {
  return formatDate(date, "dd-LL-yyyy");
};

/**
 * Formats a date as DD Month YYYY (e.g., 24 Sep 2023).
 * @param date The date to format.
 * @returns The formatted date string or an empty string.
 */
export const formatDateAsDDMonthYY = (date: Date | string | null | undefined): string => {
  return formatDate(date, "dd LLL yyyy");
};

/**
 * Formats the time part of a date as HH:mm.
 * @param date The date to format.
 * @returns The formatted time string or an empty string.
 */
export const formatHourAsHM = (date: Date | string | null | undefined): string => {
  return formatDate(date, "HH:mm");
};

/**
 * Formats a date as a numeric string (YYYYMMDDHHmm) for sorting or unique IDs.
 * @param date The date to format.
 * @returns The formatted numeric string or an empty string.
 */
export const formatDateAsNumber = (date: Date | string | null | undefined): string => {
  return formatDate(date, "yyyyLLddHHmm");
};