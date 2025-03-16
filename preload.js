console.log('Hello, world!', process.versions)

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    version: process.versions,
    saveFile: (data) => {
        ipcRenderer.send('file-save', data)
    }
})