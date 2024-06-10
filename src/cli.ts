#!/usr/bin/env node

import { parseArgs } from "util";
import { promises as fs } from "fs";
import path from "path";
import arrangeFaviconGrid from "./arrangeFaviconGrid";
import generateFavicon from "./generateFavicon";

async function getVersion(): Promise<string> {
  const packageJson = await fs.readFile(
    path.resolve(__dirname, "../package.json"),
    "utf8"
  );
  const packageData = JSON.parse(packageJson);
  return packageData.version;
}

const { values: args, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    output: { type: "string", short: "o" },
    png: { type: "boolean", short: "p" },
    scale: { type: "string", short: "s" },
    background: { type: "string", short: "b" },
    help: { type: "boolean", short: "h" },
    version: { type: "boolean", short: "v" },
  },
  allowPositionals: true,
});

const hexColorRegex = /^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

const helpText = `
Usage: zimo-web-favicons <command> [options]

Commands:
  generate <inputPath>         Generate a single favicon
  arrange <inputPaths...>      Arrange multiple favicons into a grid

Options:
  -o, --output <outputPath>    Specify the output path
  -p, --png                    Generate PNG instead of SVG (for arrange command)
  -s, --scale <number>         Scale factor for the PNG output
  -b, --background <hex>       Background color in hex format (for arrange command)
  -h, --help                   Show help information
  -v, --version                Show the current version
`;

async function main() {
  if (args.help) {
    console.log(helpText);
    process.exit(0);
  }

  if (args.version) {
    const version = await getVersion();
    console.log(`zimo-web-favicons version ${version}`);
    process.exit(0);
  }

  const command = positionals[0];

  if (command === "generate") {
    const [_, inputPath] = positionals;
    const outputPath = args.output;
    if (!inputPath) {
      console.error("Error: generate command requires <inputPath>");
      process.exit(1);
    }
    await generateFavicon(inputPath, outputPath ?? "generated_image");
  } else if (command === "arrange") {
    const inputPaths = positionals.slice(1);
    const outputPath = args.output ?? "arranged_image";
    const generatePng = args.png || false;
    const scale = args.scale ? parseFloat(args.scale) : undefined;
    const background = args.background
      ? (args.background.startsWith("#")
          ? args.background
          : `#${args.background}`
        ).toLowerCase()
      : undefined;

    if (background && !hexColorRegex.test(background)) {
      console.error("Error: Invalid hex color format");
      process.exit(1);
    }

    if (inputPaths.length === 0) {
      console.error("Error: arrange command requires <inputPaths...>");
      process.exit(1);
    }

    const svgPaths: string[] = [];
    for (const inputPath of inputPaths) {
      if (path.extname(inputPath) === ".json") {
        const tempSvgPath = path.join(
          path.dirname(inputPath),
          `_temp_${path.basename(inputPath, ".json")}.svg`
        );
        await generateFavicon(inputPath, tempSvgPath, true);
        svgPaths.push(tempSvgPath);
      } else {
        svgPaths.push(inputPath);
      }
    }

    try {
      await arrangeFaviconGrid(
        svgPaths,
        outputPath,
        generatePng,
        scale,
        background
      );
    } catch (e) {
      console.error("Error arranging the favicon grid:", e);
    } finally {
      const uniqueSvgPaths = [...new Set(svgPaths)];
      for (const svgPath of uniqueSvgPaths) {
        if (path.extname(svgPath) === ".svg" && !inputPaths.includes(svgPath)) {
          await fs.unlink(svgPath);
        }
      }
    }
  } else {
    console.log(helpText);
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
