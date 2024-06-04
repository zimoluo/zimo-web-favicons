import path from "path";
import sharp from "sharp";

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

  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${backgroundWidth} ${backgroundHeight}">\n`;

  svgContent += `<rect x="0" y="0" width="${backgroundWidth}" height="${backgroundHeight}" fill="${backgroundColor}" />`;

  const promises = svgPaths.map(async (svgFilePath, index) => {
    if (!(await Bun.file(svgFilePath).exists())) {
      return "";
    }

    const svgData = await Bun.file(svgFilePath).text();

    const x = gapSize + (index % gridSize) * (cellSize + gapSize);
    const y = gapSize + Math.floor(index / gridSize) * (cellSize + gapSize);
    return `<g transform="translate(${x}, ${y})">\n${stripSVGTag(
      svgData
    )}\n</g>\n`;
  });

  const results = await Promise.all(promises);

  svgContent += results.join("");

  svgContent += "</svg>";

  const outputPath = path.extname(output)
    ? output.replace(path.extname(output), generatePng ? ".png" : ".svg")
    : `${output}.${generatePng ? "png" : "svg"}`;

  if (!generatePng) {
    await Bun.write(outputPath, svgContent);
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
