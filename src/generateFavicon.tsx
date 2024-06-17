import { renderToStaticMarkup } from "react-dom/server";
import ConfigFavicon from "../lib/ConfigFavicon";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import optimizeSvg from "./optimizeSVG";

export default async function generateFavicon(
  input: string,
  output: string,
  silent: boolean = false,
  generatePng: boolean = false,
  scale: number = 1.2,
  optimize: boolean = true
) {
  try {
    const configFile = await fs.readFile(input, "utf8");
    const themeConfig = JSON.parse(configFile);

    const svgString = renderToStaticMarkup(
      <ConfigFavicon customThemeConfig={themeConfig} />
    );

    const outputPath = path.extname(output)
      ? output.replace(path.extname(output), generatePng ? ".png" : ".svg")
      : `${output}.${generatePng ? "png" : "svg"}`;

    if (!generatePng) {
      await fs.writeFile(outputPath, svgString);

      if (optimize) {
        optimizeSvg(outputPath);
      }

      if (!silent) {
        console.log(`Favicon SVG generated and saved to ${outputPath}`);
      }
      return;
    }

    const svgBuffer = Buffer.from(svgString);
    await sharp(svgBuffer)
      .resize({ width: Math.round(1060.54 * scale) })
      .png()
      .toFile(outputPath);

    console.log(`Favicon PNG generated and saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error generating favicon: ${(error as any).message}`);
  }
}
