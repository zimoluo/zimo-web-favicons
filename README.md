# zimo-web-favicons

`zimo-web-favicons` is a CLI tool to generate and arrange Zimo Web's favicons from theme config JSON files. It supports generating single favicons and arranging multiple favicons into a grid.

## Features

- Generate a single favicon from a theme config JSON file.
- Arrange multiple favicons into a grid.
- Optionally generate PNG output.
- Customize the scale and background color for the grid.

## Requirements

- Node and npm installed on your system.

## Installation

You can install the tool globally using npm:

```sh
npm install -g zimo-web-favicons
```

## Usage

```sh
zimo-web-favicons [command] [options]
```

### Commands

- `generate` Generate a single favicon.
- `arrange` Arrange multiple favicons into a grid.

### Options

- `-o`, `--output` `<outputPath>` Specify the output path. Defaults to `generated_image` or `arranged_image`.
- `-p`, `--png` Generate PNG instead of SVG (for arrange command). Defaults to `false`.
- `-s`, `--scale` `<number>` Scale factor for the PNG output.
- `-b`, `--background` `<hex>` Background color in hex format.
- `-h`, `--help` Show help information.
- `-v`, `--version` Show the current version.

### Examples

- Generate a Single Favicon

```sh
zimo-web-favicons generate input.json -o output.svg
```

- Arrange Multiple Favicons into a Grid

```sh
zimo-web-favicons arrange input1.json input2.json input3.json -o output.svg
```

- Generate PNG Output with Scale and Background Color

```sh
zimo-web-favicons arrange input1.json input2.json -o output.png -p -s 2 -b #ff00ff88
```
