declare global {
  interface Window {
    electron: Electron;
  }
}

export const { electron } = window;
