import path from "path";
import sharp from "sharp";

const cellSize = 1060.54;
const gapSize = cellSize / 2.4;

function stripSVGTag(svgContent: string): string {
  return svgContent.replace(/<svg[^>]*>|<\/svg>/g, "");
}

export default async function arrangeFaviconGrid(themesList: string[]) {
  const gridSize = Math.ceil(Math.sqrt(themesList.length));
  const verticalGridMaximum = Math.ceil(themesList.length / gridSize);

  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${
    gridSize * (cellSize + gapSize) + gapSize
  } ${verticalGridMaximum * (cellSize + gapSize) + gapSize}">\n`;

  const promises = themesList.map(async (theme, index) => {
    const svgFilePath = path.join("./out", `${theme}.svg`);
    if (await Bun.file(svgFilePath).exists()) {
      const svgData = await Bun.file(svgFilePath).text();
      const x = gapSize + (index % gridSize) * (cellSize + gapSize);
      const y = gapSize + Math.floor(index / gridSize) * (cellSize + gapSize);
      return `<g transform="translate(${x}, ${y})">\n${stripSVGTag(
        svgData
      )}\n</g>\n`;
    }
    return "";
  });

  const results = await Promise.all(promises);
  svgContent += results.join("");

  svgContent += "</svg>";

  const outputFilePath = path.join("./out", "grid.svg");
  await Bun.write(outputFilePath, svgContent);

  console.log(`Grid SVG created at ${outputFilePath}`);

  const svgBuffer = Buffer.from(svgContent);
  const pngOutputPath = path.join("./out", "grid.png");
  await sharp(svgBuffer)
    .resize({ width: Math.round(gridSize * (cellSize + gapSize) * 0.4) })
    .png()
    .toFile(pngOutputPath);

  console.log(`Grid PNG created at ${pngOutputPath}`);
}
