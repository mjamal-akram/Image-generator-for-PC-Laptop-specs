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

function sanitizePathSegment(value, fallback = 'Brand') {
  const cleaned = String(value || '')
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '_')
    .replace(/[. ]+$/g, '')
    .trim();
  return cleaned || fallback;
}

async function writeBase64ImageToPath(filePath, base64Data, extension) {
  const normalizedExtension = extension === 'jpg' ? 'jpg' : 'png';
  const mimePrefix = normalizedExtension === 'jpg' ? 'jpeg' : 'png';
  const prefixPattern = new RegExp(`^data:image\\/${mimePrefix};base64,`);
  const cleaned = String(base64Data || '').replace(prefixPattern, '');

  if (!cleaned) {
    return { saved: false, error: 'Image data is empty.' };
  }

  try {
    await fsp.writeFile(filePath, cleaned, 'base64');
    return { saved: true, filePath };
  } catch {
    return { saved: false, error: 'Failed to save file.' };
  }
}

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

  return writeBase64ImageToPath(filePath, base64Data, normalizedExtension);
});

ipcMain.handle('pick-folder', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'Choose export folder',
    properties: ['openDirectory', 'createDirectory'],
  });

  if (canceled || !Array.isArray(filePaths) || !filePaths[0]) {
    return { canceled: true };
  }

  return {
    canceled: false,
    folderPath: filePaths[0],
  };
});

ipcMain.handle('sync-brand-folders', async (_event, payload) => {
  const { baseFolderPath, brandNames } = payload || {};

  if (!baseFolderPath || typeof baseFolderPath !== 'string') {
    return { ok: false, error: 'Invalid export folder.' };
  }

  try {
    await fsp.mkdir(baseFolderPath, { recursive: true });
  } catch {
    return { ok: false, error: 'Failed to create export folder.' };
  }

  const uniqueFolderNames = new Set();
  const createdFolders = [];

  (Array.isArray(brandNames) ? brandNames : []).forEach((brandName) => {
    const safeFolderName = sanitizePathSegment(brandName, 'General');
    if (!safeFolderName || uniqueFolderNames.has(safeFolderName)) {
      return;
    }
    uniqueFolderNames.add(safeFolderName);
    createdFolders.push(path.join(baseFolderPath, safeFolderName));
  });

  try {
    await Promise.all(
      createdFolders.map((folderPath) => fsp.mkdir(folderPath, { recursive: true }))
    );
    return {
      ok: true,
      createdFolders,
    };
  } catch {
    return { ok: false, error: 'Failed to create one or more brand folders.' };
  }
});

ipcMain.handle('save-image-to-brand-folder', async (_event, payload) => {
  const {
    base64Data,
    extension,
    baseFolderPath,
    brandName,
    fileName,
  } = payload || {};

  if (typeof base64Data !== 'string' || !base64Data) {
    return { saved: false, error: 'Invalid image payload.' };
  }

  if (!baseFolderPath || typeof baseFolderPath !== 'string') {
    return { saved: false, error: 'Invalid export folder.' };
  }

  const normalizedExtension = extension === 'jpg' ? 'jpg' : 'png';
  const safeBrandFolder = sanitizePathSegment(brandName, 'General');
  const safeFileNameBase = sanitizePathSegment(
    path.parse(String(fileName || `poster.${normalizedExtension}`)).name,
    'poster'
  );
  const brandFolderPath = path.join(baseFolderPath, safeBrandFolder);

  try {
    await fsp.mkdir(brandFolderPath, { recursive: true });
  } catch {
    return { saved: false, error: 'Failed to create brand folder.' };
  }

  let candidatePath = path.join(brandFolderPath, `${safeFileNameBase}.${normalizedExtension}`);
  let suffix = 2;

  while (fs.existsSync(candidatePath)) {
    candidatePath = path.join(brandFolderPath, `${safeFileNameBase}-${suffix}.${normalizedExtension}`);
    suffix += 1;
  }

  const result = await writeBase64ImageToPath(candidatePath, base64Data, normalizedExtension);
  if (!result.saved) {
    return result;
  }

  return {
    saved: true,
    filePath: result.filePath,
    brandFolderPath,
  };
});
