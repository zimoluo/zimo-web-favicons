# zimo-web-favicons

`zimo-web-favicons` is a CLI tool to generate and arrange Zimo Web's favicons from theme config JSON files. It supports generating single favicons and arranging multiple favicons into a grid.

## Features

- Generate a single favicon from a theme config JSON file.
- Arrange multiple favicons into a grid.
- Optionally generate PNG output.
- Customize the scale and background color for the grid.

## Requirements

- [Bun](https://bun.sh) installed on your system.

## Installation

You can install the tool globally using npm:

```sh
npm install -g zimo-web-favicons
```

## Usage

```sh
zimo-web-favicons [options]
```

### Options

- `-g`, `--generate` Generate a single favicon.
- `-a`, `--arrange` Arrange multiple favicons into a grid.
- `-o`, `--output` `<outputPath>` Specify the output path.
- `-p`, `--png` Generate PNG instead of SVG (for arrange command).
- `-s`, `--scale` `<number>` Scale factor for the PNG output.
- `-b`, `--background` `<hex>` Background color in hex format.
- `-h`, `--help` Show help information.
- `-v`, `--version` Show the current version.

### Examples

- Generate a Single Favicon

```sh
zimo-web-favicons -g input.json -o output.svg
```

- Arrange Multiple Favicons into a Grid

```sh
zimo-web-favicons -a input1.json input2.json input3.json -o output.svg
```

- Generate PNG Output with Scale and Background Color

```
zimo-web-favicons -a input1.json input2.json -o output.png -p -s 2 -b #ff00ff88
```

## Development

### Build

The app can alternatively be built to an executable. Bun is required either way.

```
npm run build
```

The built executable is located in the `./out/zimo-web-favicons-build` file.
