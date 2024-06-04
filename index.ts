import arrangeFaviconGrid from "./src/arrangeFaviconGrid";
import generateFavicon from "./src/generateFavicon";

const themesList: string[] = [
  "glitter",
  "mori",
  "cubistic",
  "marina",
  "springField",
  "rainbow",
];

async function generateFavicons(themes: string[]) {
  for (const theme of themes) {
    await generateFavicon(theme);
  }
}

await (async () => {
  await generateFavicons(themesList);
  await arrangeFaviconGrid(themesList);
})();
