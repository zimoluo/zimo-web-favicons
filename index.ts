import arrangeFaviconGrid from "./src/arrangeFaviconGrid";
import generateFavicon from "./src/generateFavicon";

const themesList: string[] = [
  "about",
  "home",
  "photos",
  "blog",
  "bubbles",
  "vitreous",
  "scintillating",
  "midnight",
  "stars",
  "halloween",
  "christmas",
  "birthday",
  "gold",
  "grass",
  "sky",
  "storm",
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
