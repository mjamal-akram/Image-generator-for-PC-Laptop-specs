const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopApi', {
  saveImage: (payload) => ipcRenderer.invoke('save-image', payload),
  pickFolder: () => ipcRenderer.invoke('pick-folder'),
  syncBrandFolders: (payload) => ipcRenderer.invoke('sync-brand-folders', payload),
  saveImageToBrandFolder: (payload) => ipcRenderer.invoke('save-image-to-brand-folder', payload),
});
