import arrangeFaviconGrid from "./src/arrangeFaviconGrid";
import generateFavicon from "./src/generateFavicon";

const themesList: string[] = [
  "about",
  "home",
  "photos",
  "blog",
  "projects",
  "bubbles",
  "vitreous",
  "scintillating",
  "autumnal",
  "cherry",
  "marina",
  "mori",
  "plainDark",
  "midnight",
  "glitter",
  "stars",
  "halloween",
  "christmas",
  "birthday",
  "gold",
  "grass",
  "rainbow",
  "sky",
  "storm",
  "pixelland",
  "verdant",
  "lollipop",
  "oasis",
  "springField",
  "defaultEditor",
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
