const electron = require('electron');
const os = require('os');
const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');

const { app, BrowserWindow, dialog, ipcMain } = electron;

if (!app || !BrowserWindow || !dialog || !ipcMain) {
  throw new Error(
    'Electron APIs are unavailable. The app was started in Node mode instead of Electron. ' +
    'Clear ELECTRON_RUN_AS_NODE and launch with "npm start".'
  );
}

const runtimeRoot = path.join(os.tmpdir(), 'pc-spec-poster-desktop');
const runtimePaths = {
  userData: path.join(runtimeRoot, 'userData'),
  sessionData: path.join(runtimeRoot, 'sessionData'),
  crashDumps: path.join(runtimeRoot, 'crashDumps'),
  logs: path.join(runtimeRoot, 'logs'),
};

Object.values(runtimePaths).forEach((dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
});

app.setPath('userData', runtimePaths.userData);
app.setPath('sessionData', runtimePaths.sessionData);
app.setPath('crashDumps', runtimePaths.crashDumps);
app.setAppLogsPath(runtimePaths.logs);

function createWindow() {
  const win = new BrowserWindow({
    width: 1366,
    height: 860,
    fullscreen: true,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: '#f5f7fb',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('save-image', async (_event, { base64Data, extension, defaultFileName }) => {
  if (typeof base64Data !== 'string' || !base64Data) {
    return { saved: false, error: 'Invalid image payload.' };
  }

  const normalizedExtension = extension === 'jpg' ? 'jpg' : 'png';
  const filters = normalizedExtension === 'jpg'
    ? [{ name: 'JPEG Image', extensions: ['jpg', 'jpeg'] }]
    : [{ name: 'PNG Image', extensions: ['png'] }];

  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Save generated poster',
    defaultPath: defaultFileName,
    filters,
  });

  if (canceled || !filePath) {
    return { saved: false };
  }

  const mimePrefix = normalizedExtension === 'jpg' ? 'jpeg' : 'png';
  const prefixPattern = new RegExp(`^data:image\\/${mimePrefix};base64,`);
  const cleaned = base64Data.replace(prefixPattern, '');

  if (!cleaned) {
    return { saved: false, error: 'Image data is empty.' };
  }

  try {
    await fsp.writeFile(filePath, cleaned, 'base64');
    return { saved: true, filePath };
  } catch {
    return { saved: false, error: 'Failed to save file.' };
  }
});
