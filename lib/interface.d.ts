interface ThemeDataConfig {
  palette: RawColorPaletteData;
  favicon: FaviconConfig;
  siteThemeColor: HexColor;
}

interface RawColorPaletteData {
  primary: ColorTriplet;
  saturated: ColorTriplet;
  middle: ColorTriplet;
  soft: ColorTriplet;
  pastel: ColorTriplet;
  light: ColorTriplet;
  page: ColorGradient[];
}

interface LinearGradientData {
  angle: number; // [0, 359]
}

interface LinearGradientOrientationData {
  linearGradientKeyword?: boolean;
  linearHorizontalOrientation?: LinearGradientHorizontal;
  linearVerticalOrientation?: LinearGradientVertical;
}

interface RadialGradientData {
  posX: number; // in percentage
  posY: number;
  sizeX: number;
  sizeY: number;
}

type LinearGradientHorizontal = "left" | "right";

type LinearGradientVertical = "top" | "bottom";

interface GradientStop {
  color: ColorTriplet;
  opacity: number; // [0.0, 1.0]
  isWidgetOpacity?: boolean;
  at: number; // in percentage
}

type ColorGradient = {
  type: "linear-gradient" | "radial-gradient";
  stops?: GradientStop[];
  disabled?: boolean;
} & (
  | LinearGradientData
  | (RadialGradientData & Partial<CircleRadialGradientAdditionalData>)
);

type ColorTriplet = [number, number, number];

type AccentColors =
  | "primary"
  | "saturated"
  | "middle"
  | "soft"
  | "pastel"
  | "light"
  | "site";

type FaviconMode = "outline" | "separate" | "overall" | "backdrop";

interface FaviconGradientStop {
  color: HexColor;
  offset: number; // [0.0, 1.0]
}

interface FaviconGradientStopsConfig {
  stops: FaviconGradientStop[];
  angle?: number;
}

interface CircleRadialGradientAdditionalData {
  isCircle?: boolean;
  sizeKeyword?: RadialGradientSizeKeyword;
}

type RadialGradientSizeKeyword =
  | "closest-side"
  | "closest-corner"
  | "farthest-side"
  | "farthest-corner";

type FaviconGradientConfig =
  | [
      FaviconGradientStopsConfig,
      FaviconGradientStopsConfig,
      FaviconGradientStopsConfig
    ]
  | [FaviconGradientStopsConfig];

interface FaviconConfig {
  mode: FaviconMode;
  outline?: AccentColors | HexColor;
  gradient?: FaviconGradientConfig;
  backdropGradient?: ColorGradient[];
}

type HexColor = `#${string}`;
