const esbuild = require("esbuild");
const { dependencies } = require("./package.json");

const external = Object.keys(dependencies);

esbuild
  .build({
    entryPoints: ["./src/cli.ts"],
    outdir: "dist",
    bundle: true,
    minify: true,
    sourcemap: false,
    platform: "node",
    target: "es2017",
    external,
    format: "cjs",
  })
  .then(() => {
    console.log("Build and minification complete");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
