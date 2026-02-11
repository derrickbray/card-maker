# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Card Maker Thing - A browser-based tool for creating customizable sports trading cards and labels. Supports team colors from MLB, NFL, NBA, NHL, MLS, and EPL.

## Development

This is a vanilla JavaScript project with no build system or package manager. To develop:

1. Open `index.html` directly in a browser
2. For SCSS changes, compile with: `sass --watch scss/main.scss css/style.css`

VS Code Chrome debugger is pre-configured in `.vscode/launch.json`.

## Architecture

### Core Files

- **js/main.js** - Application entry point and DOM manipulation. Initializes the card editor, handles template loading/saving, gallery management, and print functionality.
- **js/settings.js** - Contains four key objects:
  - `settings` - Element ID arrays for borders (b1-b10), text (t1-t10), and icons (i1-i10)
  - `GetMe` - Extracts current card state and team color data
  - `Convert` - Utilities for RGB/HEX conversion, transform matrix parsing, and color inversion
  - `Create` - Generates HTML for border, text, and icon form controls
  - `Templates` - Pre-built card template definitions
- **js/teamColors.js** - Team color data for 6 sports leagues (exported as `teamsJSON` array)

### Card Structure

Each card has 12 customizable elements of each type:
- **Borders (b1-b12)** - Rectangular shapes with color, size, position, rotation, border-radius
- **Text (t1-t12)** - Text elements with font size, color, background, bold, position
- **Icons (i1-i12)** - Font Awesome icons with size, color, position, rotation

### Key Functions in main.js

- `init()` - Builds the form UI from settings and populates template dropdown
- `addCardToGallery()` / `removeLastCard()` - Manage print gallery (max 38 cards)
- `setTemplate()` / `setTheValues()` - Load template CSS values to card and form
- `createTemplateJSON()` - Exports current card state (logs to console)
- `printGallery()` - Opens print window with gallery contents
- `adjust*()` functions - Update individual card element properties

### Card Sizes

- Label: 80.5mm x 24mm
- Card: 72.5mm x 102mm

## Dependencies

All libraries are committed to the repo:
- jQuery (js/jQuery.js)
- Font Awesome 5.3.1 (js/fontawesome/)
