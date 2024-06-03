import generateFavicon from "./src/generateFavicon";

const themesList: string[] = ["gold", "photos", "about", "blog", "oasis"];

themesList.map(async (theme, _) => {
  await generateFavicon(theme);
});
