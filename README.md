# Jam_iw Software

Jam_iw Software is an Electron desktop poster builder for creating product posters in two modes:
- `PC/Laptop`
- `Charger`

The app provides a live canvas preview, drag-and-resize editing, bilingual UI (`EN/FR`), theme switch, and export to image.

## System Flow

## 1. App Startup
1. Electron starts from `main.js`.
2. `BrowserWindow` loads `index.html`.
3. `preload.js` exposes secure IPC (`desktopApi.saveImage`) to renderer.
4. `renderer.js` initializes state, binds events, renders controls, and draws initial poster.

## 2. Top-Level UI Flow
1. User selects generator tab:
- `PC/Laptop` poster flow
- `Charger` poster flow
2. User selects language (`US` or `FR`):
- UI labels update
- poster labels update
- currency defaults switch (`USD`/`EUR`)
3. User selects UI theme (`light`/`dark`) and design theme (`Modern/Minimal/Bold`).

## 3. Poster Editing Flow

### Canvas and Elements
- Live poster is drawn on HTML canvas.
- Most elements are draggable using layout offsets.
- Uploaded images are layer-based, selectable, draggable, and resizable.
- Logo supports upload/remove, selection, and resize handles.
- Optional section toggles control visibility of groups.

### PC/Laptop Generator
Main editable areas:
- Title top and bottom text
- OS badge
- Guarantee badge
- Logo badge
- Device image area (single/multiple uploaded layers)
- Right-side spec badges (processor, CPU speed, screen, battery, storage, RAM)
- Specifications table card
- Brand text
- Price badge

### Charger Generator
Main editable areas:
- Charger title
- Guarantee badge
- Logo badge
- Charger image area (uploaded layers)
- Right-side badges (company, type, voltage, ampere, power, condition)
- Compatibility card (multi-model, one per line)
- Price badge

## 4. Interaction Flow

### Selection and Removal
- `Ctrl + A`: toggles select-all overlay for removable elements.
- Each selected element shows an `X` button for removal.
- Clicking the canvas/background exits select-all mode.

### Undo
- `Ctrl + Z`: restores the last removal snapshot.
- Undo includes visibility, layout offsets, image layers, selected image ids, logo state, and custom text layers.

### Text Tool
- Press `T` to toggle text mode.
- Click canvas to create a text layer.
- Inline editor supports text input + bold/italic/underline.
- Tick applies text; cross removes active text layer.
- Double-click an existing text to edit it.
- Text layers are draggable when not in insert/edit action.

## 5. Export Flow
1. Click `Generate PNG` or `Generate JPG`.
2. Renderer exports canvas image data.
3. `desktopApi.saveImage` sends payload to main process.
4. Main process shows save dialog and writes file via `fs/promises`.

## 6. Portable Distribution Flow
1. Build portable executable with:
```bash
npm run build:portable
```
2. Output is generated in `release/`.
3. A transfer package can contain:
- `Jam_iw Software.exe`
- `run.bat`
- `README.txt`
4. End user unzips package and runs `run.bat`.

## Project Structure
- `main.js`: Electron main process, app lifecycle, save dialog/file writing
- `preload.js`: secure bridge between renderer and main process
- `renderer.js`: state, i18n, controls, drawing logic, interactions, export trigger
- `index.html`: app layout and panels
- `styles.css`: light/dark UI styling and component styles
- `assets/`: image/icon assets used by poster rendering

## Setup and Run

## Requirements
- Node.js LTS
- npm

## Commands
```bash
npm install
npm start
```

After cloning from GitHub, always run:
```bash
npm install
```
This installs all required packages from `package.json` (since `node_modules` is intentionally not pushed).

## Build Portable
```bash
npm run build:portable
```

## Notes
- The app is optimized for poster editing on a fixed square canvas workflow.
- Language mode affects labels, section text, and price currency defaults.
- Canvas interactions are shared across both generator tabs for consistent behavior.
