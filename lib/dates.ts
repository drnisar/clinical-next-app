const PKT_OFFSET_MS = 5 * 60 * 60 * 1000; // Pakistan: UTC+5, no DST

/**
 * Start of today in Pakistan as a UTC instant, so "today" means the clinic's
 * day whether the code runs on a UTC server or in a browser.
 */
export const startOfTodayPKT = (now: number = Date.now()) => {
  const pkt = new Date(now + PKT_OFFSET_MS);
  return new Date(
    Date.UTC(pkt.getUTCFullYear(), pkt.getUTCMonth(), pkt.getUTCDate()) -
      PKT_OFFSET_MS,
  );
};

/**
 * Today in Pakistan as a half-open range [start, end) for database queries:
 * `{ gte: start, lt: end }`. Server time zone (UTC on Vercel) doesn't matter.
 */
export const todayRangePKT = (now: number = Date.now()) => {
  const start = startOfTodayPKT(now);
  return { start, end: new Date(start.getTime() + 24 * 60 * 60 * 1000) };
};

/**
 * The Pakistan calendar day of an instant, as "YYYY-MM-DD". Appointments are
 * stored as UTC midnight of the booked date, which is 05:00 that same day in
 * Pakistan, so this gives back the date that was booked.
 */
export const ymdPKT = (date: Date | string | number) =>
  new Date(new Date(date).getTime() + PKT_OFFSET_MS).toISOString().slice(0, 10);

/** Move a "YYYY-MM-DD" date by n days (pure calendar arithmetic, no time zone). */
export const addDaysYMD = (ymd: string, n: number) => {
  const d = new Date(`${ymd}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

/** Day of the week of a "YYYY-MM-DD" date: 0 = Sunday … 6 = Saturday. */
export const weekdayYMD = (ymd: string) =>
  new Date(`${ymd}T00:00:00Z`).getUTCDay();
