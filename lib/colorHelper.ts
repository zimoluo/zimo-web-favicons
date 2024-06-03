import colorConvert from "color-convert";
import type { HexColor } from "./interface";

export function hexToOpacity(hex: string): number {
  const isValidHex = /^[0-9A-Fa-f]{2}$/.test(hex);
  if (!isValidHex) {
    return 0;
  }

  const decimal = parseInt(hex, 16);

  const number = decimal / 255;

  const roundedNumber = Math.round(number * 100) / 100;

  return roundedNumber;
}

export function hexToRgba(hex: HexColor): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  const isValidHex = /^#?[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(hex);
  if (!isValidHex) {
    return { r: 255, g: 255, b: 255, a: 0 };
  }

  const trimmedColor = hex.startsWith("#") ? hex.slice(1) : hex;
  const [r, g, b] = colorConvert.hex.rgb(trimmedColor.slice(0, 6));
  const opacity =
    trimmedColor.length === 8 ? hexToOpacity(trimmedColor.slice(6)) : 1;

  return { r, g, b, a: opacity };
}
