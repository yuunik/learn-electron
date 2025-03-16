console.log('Hello, world!', process.versions)

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    version: process.versions,
    // 保存文件
    saveFile: (data) => {
        ipcRenderer.send('file-save', data)
    },
    // 读取文件
    readFile: () => ipcRenderer.invoke('file-read')
})