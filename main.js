const {app} = require('electron')
const path = require('path')
const url = require('url')

const {createWindow} = require('./window.js')

let mainWindow

exports.getMainWindow = function() {
    return mainWindow
}


function start() {

    mainWindow = createWindow()

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', () => { mainWindow = null })

    mainWindow.webContents.on('did-finish-load', () => {
        // DEBUG ONLY        
        mainWindow.webContents.send('printText', 'foobar')
        game = require('./game.js')
        game.loadGame('testgame')
        game.initGame()
    })
}


app.on('ready', start)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        start()
    }
})

require('./menu.js')
