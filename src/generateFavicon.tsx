import { renderToStaticMarkup } from "react-dom/server";
import ConfigFavicon from "../lib/ConfigFavicon";
import path from "path";
import fs from "fs/promises";

export default async function generateFavicon(
  input: string,
  output: string,
  silent: boolean = false
) {
  try {
    const configFile = await fs.readFile(input, "utf8");
    const themeConfig = JSON.parse(configFile);

    const svgString = renderToStaticMarkup(
      <ConfigFavicon customThemeConfig={themeConfig} />
    );

    const outputPath = path.extname(output)
      ? output.replace(path.extname(output), ".svg")
      : `${output}.svg`;

    await fs.writeFile(outputPath, svgString);

    if (!silent) {
      console.log(`Favicon generated and saved to ${outputPath}.`);
    }
  } catch (error) {
    console.error(`Error generating favicon: ${(error as any).message}`);
  }
}
