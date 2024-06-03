export interface ThemeDataConfig {
  palette: RawColorPaletteData;
  favicon: FaviconConfig;
  siteThemeColor: HexColor;
}

export interface RawColorPaletteData {
  primary: ColorTriplet;
  saturated: ColorTriplet;
  middle: ColorTriplet;
  soft: ColorTriplet;
  pastel: ColorTriplet;
  light: ColorTriplet;
}

type ColorTriplet = [number, number, number];

export type AccentColors =
  | "primary"
  | "saturated"
  | "middle"
  | "soft"
  | "pastel"
  | "light"
  | "site";

type FaviconMode = "outline" | "separate" | "overall";

type CustomFaviconKey = "penumbra";

export interface FaviconGradientStop {
  color: HexColor;
  offset: number; // [0.0, 1.0]
}

export interface FaviconGradientStopsConfig {
  stops: FaviconGradientStop[];
  angle?: number;
}

export type FaviconGradientConfig =
  | [
      FaviconGradientStopsConfig,
      FaviconGradientStopsConfig,
      FaviconGradientStopsConfig
    ]
  | [FaviconGradientStopsConfig];

export interface FaviconConfig {
  mode: FaviconMode;
  outline?: AccentColors | HexColor;
  customKey?: CustomFaviconKey;
  gradient?: FaviconGradientConfig;
}

export type HexColor = `#${string}`;
