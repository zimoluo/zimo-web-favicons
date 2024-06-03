import { renderToStaticMarkup } from "react-dom/server";
import ConfigFavicon from "../lib/ConfigFavicon";
import path from "path";

const DESTINATION_PATH = "./out";

export default async function generateFavicon(theme: string) {
  const configFilePath = path.join("./lib/themes", `${theme}.json`);

  const configFile = Bun.file(configFilePath);
  const themeConfig = JSON.parse(await configFile.text());

  const svgString = renderToStaticMarkup(
    <ConfigFavicon customThemeConfig={themeConfig} />
  );

  const svgFilePath = path.join(DESTINATION_PATH, `${theme}.svg`);

  const fileSize = await Bun.write(svgFilePath, svgString);

  console.log(
    `Favicon generated and saved to ${svgFilePath}. Total ${fileSize} bytes written.`
  );
}
