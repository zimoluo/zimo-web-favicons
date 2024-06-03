import crypto from "crypto";

/**
 * Generates a hashed and encoded string representation of an object using SHA-256 algorithm.
 * @param {any} obj - The object to be hashed and encoded.
 * @param {number} [length=12] - The desired length of the encoded hash. Defaults to 12.
 * @returns {string} The hashed and encoded string representation of the object.
 */
export function hashAndEncode(obj: any, length: number = 12): string {
  const jsonString = JSON.stringify(obj);

  const hash = crypto.createHash("sha256").update(jsonString).digest("base64");

  const encodedHash = hash.replace(/[+/=]/g, "");

  const trimmedHash = encodedHash.substring(
    0,
    Math.min(length, encodedHash.length)
  );

  return trimmedHash;
}

/**
 * Clamps a value within a specified range.
 * @param {number} value - The value to be clamped.
 * @param {number} min - The minimum boundary of the range.
 * @param {number} max - The maximum boundary of the range.
 * @returns {number} The clamped value.
 */
export function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
