# Lastfm Collage

A React & Electron app that creates a collage with the cover art of your favourite albums in lastfm

## Getting started

Clone the repository locally:

``` bash
git clone https://github.com/bonavida/lastfm-collage.git
```

## Requirements:

- NodeJS 12.x.x
- npm 6.x.x

## Install dependencies:

``` bash
cd lastfm-collage
npm install
```

## Development

To run the app in dev mode with hot-reloader, run in two separate consoles:

To run the frontend
``` bash
npm start
```

and to run electron

``` bash
npm run electron
```

## Build the app

```bash
npm run build
```

The built files are placed in `/build` at the root directory.

If you want to run electron with the built files, run the following command:

```bash
npm run electron:local
```

## App packaging and distribution

To package the app, depending on the desired platform, use the following commands:

``` bash
npm run dist:win     // Windows
npm run dist:linux   // Linux
npm run dist:osx     // Mac
npm run dist:all     // All platforms
```

The package files are placed in `/dist`.

## Preload script
This file, placed at `electron/preload.js`, is needed to expose the electron API inside the React app. It lets your UI communicate with the native electron APIs.

### Electron API Usage
Inside the React app we have access to the native electron APIs trough `window.electron`. In the example below we use the electron module `ipcRenderer`. As you can see, we have added some extra code just to be sure that this won't throw an error if the app is deployed in the web browser and not in electron.

```
const { ipcRenderer }: Electron.Remote = window.electron || {};
// ...
ipcRenderer && ipcRenderer.send('message');  // This will only run in electron, not browser
```
