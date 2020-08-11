const electron = require('electron');
const { app, BrowserWindow } = require('electron');

// 当前Electron 2.0 会在DevTools报一个安全的Warning，连tutorial也有，没什么太大影响，暂时用下面这个配置禁用
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';


const createWindow = () => {
    let win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL('https://juejin.im/');

    // open develop tools
    win.webContents.openDevTools();

    
    win.on('closed', () => {
        // 取消引用 window 对象， 如果app支持多窗口
        // 通常会把多个 window 对象存放在一个数组里面
        // 于此同时， 删除对应的元素
        win = null;
    })
}

// Electron 会在初始化后准备
// 浏览器创建窗口时，ready
// 部分API在 ready 事件触发后才能使用
app.on('ready', createWindow);

// 当全部窗口关闭时推出
app.on('window-all-closed', () => {
    // 在 macOS 上， 除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用以及其菜单栏会保持激活
    // 打包系统 darwin 、 win32 、 linux
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    // 在 macOS 上，当单击 dock 图标并且没有其他窗口打开的时候
    // 通常在应用程序中重新创建一个窗口
    if (win === null) {
        createWindow()
    }
})

// 显示最近文件
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
