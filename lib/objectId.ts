/** True for a 24-character hex MongoDB ObjectId, the format of every model ID. */
export const isObjectId = (value: unknown): value is string =>
  typeof value === "string" && /^[a-f\d]{24}$/i.test(value);
