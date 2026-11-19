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
