const {app, BrowserWindow, Notification, ipcMain,dialog} = require('electron')

let win
app.on('ready', () => {
    win = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('./index.html')

    handleIPC()
})

function handleIPC() {
    ipcMain.handle('work-notification', async function () {
        let res = await new Promise((resolve, reject) => {
            dialog.showMessageBox({
                type:'info',
                title: '提示',
                buttons:['ok','cancel']
            }).then(index=>{
                if(index.response == 0){
                    resolve('rest')
                }else if(index.response == 1){
                    resolve('work')
                }
            })
            // let notification = new Notification({
            //     title: '任务结束',
            //     body: '是否开始休息',
            //     actions: [{text: '开始休息', type: 'button'}],
            //     closeButtonText: '继续工作'
            // })
            // notification.show()
            // notification.on('action', () => {
            //     resolve('rest')
            // })
            // notification.on('close', () => {
            //     resolve('work')
            // })
        })
        return res
    })
}