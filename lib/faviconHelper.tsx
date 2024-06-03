import { type ReactNode } from "react";
import type { FaviconGradientStop } from "./interface";

export const generateStopNodes = (
  stops: FaviconGradientStop[]
): ReactNode[] => {
  const sortedStops = [...stops].sort((a, b) => a.offset - b.offset);

  const stopNodes = sortedStops.map((stop, index) => (
    <stop key={index} offset={stop.offset} stopColor={stop.color} />
  ));

  return stopNodes;
};

export const emptyFaviconStops: FaviconGradientStop[] = [
  {
    color: "#ffffff",
    offset: 0,
  },
  {
    color: "#ffffff",
    offset: 100,
  },
];
