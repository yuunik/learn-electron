console.log('Hello, world!', process.versions)

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
    version: process.versions
})