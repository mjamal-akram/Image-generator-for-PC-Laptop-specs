const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopApi', {
  saveImage: (payload) => ipcRenderer.invoke('save-image', payload),
});
