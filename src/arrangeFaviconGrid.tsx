import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import optimizeSvg from "./optimizeSVG";

const cellSize = 1060.54;
const gapSize = cellSize / 2.4;

function stripSVGTag(svgContent: string): string {
  return svgContent.replace(/<svg[^>]*>|<\/svg>/g, "");
}

export default async function arrangeFaviconGrid(
  svgPaths: string[],
  output: string,
  generatePng: boolean = false,
  scale: number = 0.4,
  backgroundColor: string = "#b4b4b4"
) {
  const gridSize = Math.ceil(Math.sqrt(svgPaths.length));
  const verticalGridMaximum = Math.ceil(svgPaths.length / gridSize);

  const backgroundWidth = gridSize * (cellSize + gapSize) + gapSize;
  const backgroundHeight = verticalGridMaximum * (cellSize + gapSize) + gapSize;

  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${backgroundWidth.toFixed(
    3
  )} ${backgroundHeight.toFixed(3)}">\n`;

  svgContent += `<rect x="0" y="0" width="${backgroundWidth.toFixed(
    3
  )}" height="${backgroundHeight.toFixed(3)}" fill="${backgroundColor}" />`;

  const promises = svgPaths.map(async (svgFilePath, index) => {
    try {
      await fs.access(svgFilePath);
    } catch {
      return "";
    }

    const svgData = await fs.readFile(svgFilePath, "utf8");

    const x = gapSize + (index % gridSize) * (cellSize + gapSize);
    const y = gapSize + Math.floor(index / gridSize) * (cellSize + gapSize);
    return `<g transform="translate(${x.toFixed(3)}, ${y.toFixed(
      3
    )})">\n${stripSVGTag(svgData)}\n</g>\n`;
  });

  const results = await Promise.all(promises);

  svgContent += results.join("");

  svgContent += "</svg>";

  const outputPath = path.extname(output)
    ? output.replace(path.extname(output), generatePng ? ".png" : ".svg")
    : `${output}.${generatePng ? "png" : "svg"}`;

  if (!generatePng) {
    await fs.writeFile(outputPath, svgContent, "utf8");
    optimizeSvg(outputPath);
    console.log(`Grid SVG created at ${outputPath}`);
    return;
  }

  const svgBuffer = Buffer.from(svgContent);
  await sharp(svgBuffer)
    .resize({ width: Math.round(gridSize * (cellSize + gapSize) * scale) })
    .png()
    .toFile(outputPath);

  console.log(`Grid PNG created at ${outputPath}`);
}
