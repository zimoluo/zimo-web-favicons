import { renderToStaticMarkup } from "react-dom/server";
import ConfigFavicon from "../lib/ConfigFavicon";
import path from "path";

export default async function generateFavicon(
  input: string,
  output: string,
  silent: boolean = false
) {
  const configFile = Bun.file(input);
  const themeConfig = JSON.parse(await configFile.text());

  const svgString = renderToStaticMarkup(
    <ConfigFavicon customThemeConfig={themeConfig} />
  );

  const outputPath = path.extname(output)
    ? output.replace(path.extname(output), ".svg")
    : `${output}.svg`;

  const fileSize = await Bun.write(outputPath, svgString);

  if (!silent) {
    console.log(`Favicon generated and saved to ${outputPath}.`);
  }
}
