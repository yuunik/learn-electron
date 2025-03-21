const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs');

const getMyData = (_, data) => {
    fs.writeFileSync(path.resolve(__dirname, './data.txt'),data)
}

const readFile = () => {
    return fs.readFileSync(path.resolve(__dirname, './data.txt'), { encoding: 'utf-8'}).toString();
}

// 控制窗口完善行为
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.resolve(__dirname, './preload.js')
        }
    })
    // 订阅消息
    ipcMain.on('file-save', getMyData)
    // 发布小心
    ipcMain.handle('file-read', readFile)
    // 加载页面
    win.loadFile(path.join(__dirname, './pages/home/index.html'))
}

// 应用挂载
app.on('ready', () => {
    console.log('App is ready')
    createWindow()
    app.on('activate', () => {
        // On macOS, it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    // On macOS, it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})