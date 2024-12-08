import { app, BrowserWindow, ipcMain } from 'electron'

import { fileURLToPath } from 'node:url'
import path from 'node:path'



const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
    width: 1200,
    height: 680,
    minWidth: 948,
    minHeight: 560,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
  // on minimize
  win.on('maximize', () => {
    if (win)
      win.webContents.send('window-state-changed', true);
  });

  win.on('unmaximize', () => {
    if (win)
      win.webContents.send('window-state-changed', false);
  });

  win.on('restore', () => {
    if (win)
      win.webContents.send('window-state-changed', false);
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
// open new window
ipcMain.handle('open-new-window', async (_, appPath: string) => {
  const win2 = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: 1200,
    height: 680,
    minWidth: 948,
    minHeight: 560,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  });
  // http://localhost:5173/#/new
  // console.log(appPath);
  // console.log('Final URL:', VITE_DEV_SERVER_URL ? `${VITE_DEV_SERVER_URL}#/${appPath}` : `index.html#/${appPath}`);

  if (VITE_DEV_SERVER_URL) {
    // Development mode
    win2.loadURL(`${VITE_DEV_SERVER_URL}#/${appPath}`);
  } else {
    // Production mode
    const url = path.join(RENDERER_DIST, 'index.html');
    win2.loadFile(url, { hash: `#/${appPath}` });
  }
});
// controls
ipcMain.on("app/minimize", (e) => {
  const currentWindow = BrowserWindow.fromWebContents(e.sender);
  if (currentWindow) {
    currentWindow.minimize();
  }
});

ipcMain.on("app/maximize", (e) => {
  const currentWindow = BrowserWindow.fromWebContents(e.sender);
  if (currentWindow) {
    currentWindow.maximize();
  }
});

ipcMain.on("app/restore", (e) => {
  const currentWindow = BrowserWindow.fromWebContents(e.sender);

  if (currentWindow) {
    currentWindow.restore();
  }
});

ipcMain.on("app/close", (e) => {
  const currentWindow = BrowserWindow.fromWebContents(e.sender);

  if (currentWindow) {
    currentWindow.close();
  }
});
