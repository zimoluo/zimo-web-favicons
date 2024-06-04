#!/usr/bin/env bun

import { parseArgs } from "util";
import { promises as fs } from "fs";
import path from "path";
import arrangeFaviconGrid from "./arrangeFaviconGrid";
import generateFavicon from "./generateFavicon";

const { values: args, positionals } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    generate: { type: "boolean", short: "g" },
    arrange: { type: "boolean", short: "a" },
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

if (args.help) {
  console.log(`
    Usage: zimo-web-favicons [options]

    Options:
      -g, --generate <inputPath>             Generate a single favicon
      -a, --arrange <inputPaths...>          Arrange multiple favicons into a grid
      -o, --output <outputPath>              Specify the output path
      -p, --png                              Generate PNG instead of SVG (for arrange command)
      -s, --scale <number>                   Scale factor for the PNG output
      -b, --background <hex>                 Background color in hex format
      -h, --help                             Show help information
      -v, --version                          Show the current version
  `);
  process.exit(0);
}

if (args.version) {
  console.log("zimo-web-favicons version 1.0.1");
  process.exit(0);
}

async function main() {
  if (args.generate) {
    const [inputPath] = positionals as string[];
    const outputPath = args.output;
    if (!inputPath || !outputPath) {
      console.error(
        "Error: generate command requires <inputPath> and --output <outputPath>"
      );
      process.exit(1);
    }
    await generateFavicon(inputPath, outputPath);
  } else if (args.arrange) {
    const inputPaths = positionals;
    const outputPath = args.output;
    const generatePng = args.png;
    const scale =
      typeof args.scale === "undefined" ? undefined : parseFloat(args.scale);
    const background =
      typeof args.background === "undefined"
        ? undefined
        : args.background.startsWith("#")
        ? args.background
        : `#${args.background}`;

    if (background && !hexColorRegex.test(background)) {
      console.error("Error: Invalid hex color format");
      process.exit(1);
    }

    if (inputPaths.length === 0 || !outputPath) {
      console.error(
        "Error: arrange command requires <inputPaths...> and --output <outputPath>"
      );
      process.exit(1);
    }

    const svgPaths = [];
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
    console.error("Error: No valid command provided");
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});